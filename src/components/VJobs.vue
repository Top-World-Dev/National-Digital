<template>
  <div class="v-jobs">
    <section class="jobs-filter">
      <h6 v-for="item in blok.column"><span v-if="item.id == 'office'">{{ item.name }}</span></h6>
      <div class="job-filter-office" v-for="office in offices">
        <input type="checkbox" :id="office" :value="office" v-model="filteredOffices" />
        <label :for="office">{{ office }}</label>
      </div>
      <div class="job-filter-recruitingCategory" v-for="recruitingCategory in categories">
        <input type="checkbox" :id="recruitingCategory" :value="recruitingCategory" v-model="filteredCategories" />
        <label :for="recruitingCategory">{{ recruitingCategory }}</label>
      </div>
      <div class="job-filter-schedule" v-for="schedule in schedules">
        <input type="checkbox" :id="schedule" :value="schedule" v-model="filteredSchedules" />
        <label :for="schedule">{{ schedule }}</label>
      </div>
    </section>

    <table class="jobs-table" v-if="rows.length > 0">
      <thead>
        <tr>
          <th v-for="col in columns"  @click="sortTable(col)" :class="{'active': sortColumn == col}">
              <span >{{ headings[col] }}</span>
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="col in columns">
            <span v-if="col == 'name'"><a :href="`https://thinxnet-jobs.personio.de/job/${row.id}`">{{ row[col] }}</a></span>
            <span v-else>{{ row[col] }}</span>
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
        filteredOffices: [],
        filteredCategories: [],
        filteredSchedules: [],
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
              id: item.id,
              name: item.name,
              office: item.office,
              recruitingCategory: item.recruitingCategory,
              schedule: item.schedule
            }
          })
          // build initial table 
          this.rows = this.jobs;
      }) 
    },
    methods: {
      filterJobs() {
        let jobIds = this.jobs.map(item => item.id);

        let offices = (this.filteredOffices.length == 0) ? jobIds : this.jobs.filter(item => this.filteredOffices.includes(item.office)).map(item => item.id);

        let categories = (this.filteredCategories.length == 0) ? jobIds : this.jobs.filter(item => this.filteredCategories.includes(item.recruitingCategory)).map(item => item.id);

        let schedules = (this.filteredSchedules.length == 0) ? jobIds : this.jobs.filter(item => this.filteredSchedules.includes(item.schedule)).map(item => item.id);

        let filteredIds = jobIds.filter(element => categories.includes(element) && schedules.includes(element) && offices.includes(element));

        this.rows = this.jobs.filter(item => filteredIds.includes(item.id));  
      },
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
      headings() {
        let headings = {
          'id' : 'id',
          'name': '',
          'office': '',
          'recruitingCategory' : '',
          'schedule' : ''
        }
        this.blok.column.forEach((item) => {
          headings[item.id] = item.name;
        })  
        return headings;      
      },
      columns() {
        return Object.keys(this.rows[0])
      },
      offices() {
        return [...new Set(this.jobs.map(item => item.office))];
      },
      categories() {
        return [...new Set(this.jobs.map(item => item.recruitingCategory))]; 
      },
      schedules() {
        return [...new Set(this.jobs.map(item => item.schedule))]; 
      }
    },
    watch: {
      filteredOffices: {
        deep: true,
        handler(item, value) {
          this.filterJobs()
        }
      },
       filteredCategories: {
        deep: true,
        handler(item) {
          this.filterJobs()
        }
      },
      filteredSchedules: {
        deep: true,
        handler(item) {
          this.filterJobs()
        }
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


