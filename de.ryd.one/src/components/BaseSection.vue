<template>
  <section>
    // option 1:
    <div class="xy-section section-alpha">
        <div class="section-container">
            // section ID
            // background image + drop-down select options 
            // code: style="linear-gradient(to ##TOP/RIGHT/BOTTOM/LEFT##, rgba(##COLOR SELECT##, ##TRANSPARENCY##), rgba(##COLOR SELECT##, ##TRANSPARENCY##)), url('## IMG SELECT ##');
            // choice of nested blocks
        </div>
    </div>
    // option 2:
    <div class="xy-section section-beta">
        <div class="section-column">
            <div class="section-container"> (option: no container)
                // section ID
                FOR EACH COLUMN:
                  // background image + drop-down select options
                  // optional no container
                  // choice of nested blocks
            </div>
        </div>
        <div class="section-column">
            <div class="section-container">
              //
            </div>
        </div>
    </div>
    // option 3:
    <div class="xy-section section-gamma">
        <div class="section-column">
            <div class="section-container">
                // section ID
                // background image + drop-down select options
                // optional no container
                FOR EACH COLUMN:
                  // choice of nested blocks
            </div>
        </div>
        <div class="section-column">
            <div class="section-container">
                // 
            </div>
        </div>
        <div class="section-column">
            <div class="section-container">
                // 
            </div>
        </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss" scoped>
.xy-section {
  >div:nth-of-type(1) {
    background-color: red;
  }
  >div:nth-of-type(2) {
    background-color: blue;
  }
  >div:nth-of-type(3) {
    background-color: green;
  }
}
</style>