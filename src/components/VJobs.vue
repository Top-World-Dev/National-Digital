<template>
  <div class="v-jobs">
    <!-- needs to pull through en/de data based on language (look at this last if needed) -->
    <section class="jobs-filter">
      <ul class="job-filter-location" v-for="location in locations">
        <li @click>{{ locations }}</li>
      </ul>
      <ul class="job-filter-category">
        <li>{ job categories }</li>
      </ul>
      <ul class="job-filter-type">
        <li>{ job types }</li>
      </ul>
    </section>

    <table class="jobs-table" v-if="rows.length > 0">
      <thead>
        <tr> <!-- will define these terms in Storyblok -->
          <th v-for="col in columns"  @click="sortTable(col)" :class="{'active': sortColumn == col}">
              <span v-if="col != 'position'">{{ col }}</span>
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="col in columns">
            <span v-if="col == 'title'" v-html="row[col]"></span>
            <span v-else-if=" col != 'position'">{{ row[col] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: ['blok'],
    data() {
      return {
        height: '0px',
        jobs: [],
        rows: [],
        sortColumn: '',
        ascending: false,
      }
    },
    destroyed() {
      window.removeEventListener('resize', (event) => {
      });
    },
    mounted() {
      const getJobData = async() => {
        const response = await fetch('https://thinxnet-jobs.personio.de/xml');
        const data = await response.text();
        return new DOMParser().parseFromString(data, 'text/xml');
      }

      getJobData()
      .then(xml => this.xmlToJson(xml))
      .then(positions => positions['workzag-jobs'].position)
      .then(jobs => {
          this.jobs = jobs.map(item => {
            return {
              position: item.name,
              title: `<a href="https://thinxnet-jobs.personio.de/job/${item.id}">${item.name}</a>`,
              location: item.office,
              category: item.recruitingCategory,
              type: item.schedule
            }
          })
          // build initial table 
          this.rows = this.jobs;
      }) 
    },
    methods: {
      sortTable(col) {
        if(this.sortColumn == col) {
          this.ascending = !this.ascending;
        } 
        else {
          this.ascending = true;
          this.sortColumn = col;
        }

        let ascending = this.ascending;

        this.rows.sort((a, b) => {
          if (a[col] > b[col]) {
            return ascending ? 1 : -1
          } else if (a[col] < b[col]) {
            return ascending ? -1 : 1
          }
          
          return 0;
        })
      },
      xmlToJson(xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          // text
          obj = xml.nodeValue;
        }

        // do children
        // If all text nodes inside, get concatenated text from them.
        var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
          return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
          obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
            return text + node.nodeValue;
          }, "");
        } else if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = this.xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(this.xmlToJson(item));
            }
          }
        }
        return obj;
      }
    },
    computed: {
      columns() {
        return Object.keys(this.rows[0])
      },
      locations() {
        return [...new Set(this.jobs.map(item => item.location))];
      },
      categories() {
        return [...new Set(this.jobs.map(item => item.category))]; 
      },
      types() {
        return [...new Set(this.jobs.map(item => item.type))]; 
      }

    }
  }
</script>
<style lang="scss">
@import '~/assets/styles.scss';
.v-jobs {
  border: none;
  width: 100%;
}
</style>  


