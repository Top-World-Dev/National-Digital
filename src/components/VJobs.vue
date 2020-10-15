<template>
  <div class="v-jobs">
    <!-- needs to pull through en/de data based on language (look at this last if needed) -->
    <section class="jobs-filter">
      <ul class="job-filter-location">
        <li>{ job locations }</li>
      </ul>
      <ul class="job-filter-category">
        <li>{ job categories }</li>
      </ul>
      <ul class="job-filter-type">
        <li>{ job types }</li>
      </ul>
    </section>

    <table class="jobs-table">
      <th> <!-- will define these terms in Storyblok -->
        <td>Position</td>
        <td>Location</td> <!-- sortable -->
        <td>Expertise</td> <!-- sortable -->
        <td>Type</td> <!-- sortable -->
      </th>

      <!-- for each -->
      <tr>
        <td>
          <div class="jobs-table-title"><a href="#link-to-personio">Job title</a></div>
          <div>Job description</div>
        </td>
        <td>
          <div class="jobs-table-location">Location</div>
        </td>
        <td>
          <div class="jobs-table-category">Area of expertise</div>
        </td>
        <td>
          <div class="jobs-table-type">Job Type</div>
        </td>
      </tr>
      <!-- end for each -->
    </table>

  </div>
</template>
<script>
  export default {
    props: ['blok'],
    data() {
      return {
        height: '0px',
        jobData: [],
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
      .then(positions => this.jobData = positions['workzag-jobs'].position) 
    },
    methods: {
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


