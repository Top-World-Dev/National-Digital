<template>

<div class="v-search">
    <div class="search-form">
      <div class="search-row">
        <input type="text" name="search" placeholder="Search" class="search-input" v-model="searchValue" @keyup="search($event.target.value)" @keyup.enter="loadResults">
        <a role="button" class="search-clear" tabindex="0" @click="searchValue = ''" ></a>
      </div>
      <div class="search-results" v-if="searchResults.length > 0">
        <div class="search-result" v-for="result in searchResults" @click="findResult(result)">
          <p><strong>{{ result.title }}</strong></p>
          <p >{{ result.address }}</p>
        </div>
      </div>
    </div>
    <l-map
      v-if="showMap"
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng.sync="marker.position"
        @click="goToMarker(marker.position)"
      >
        <l-tooltip :content="marker.tooltip" />
      </l-marker>
    </l-map>
  </div>

</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";

import { Icon } from 'leaflet';

// icons are missing
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "ryd.de.one",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  async created() {
    this.loading = true;
    const response = await fetch('./de.ryd.one-places.json');
    const data = await response.json();
    this.locations = data.map(location => {
      return {
        position: { lat: location.lat, lng: location.lng },
        tooltip: location.description,
        title: location.title,
        address: location.address
      }
    });
    // only load markers that are in view
    this.markers = this.locations.filter(point => this.$refs.map.mapObject.getBounds().contains(point.position))
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      zoom: 13,
      center: latLng(52.520008, 13.404954),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      locations: [],
      markers: [],
      searchValue: '',
      searchResults: []
    };
  },
  methods: {
    search(value) {
      if(value.length > 2) {
        this.searchResults = this.locations.filter(item => item.tooltip.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.address.toLowerCase().indexOf(value.toLowerCase()) != -1)
      }
    },
    findResult(result) {
      this.searchResults = [];
      this.markers = [];
      this.markers.push(result);
      this.$refs.map.mapObject.flyTo(latLng(result.position.lat, result.position.lng),14, { animate: true, duration: 0.5});
    },
    loadResults() {
      this.markers = [];
      this.searchResults.forEach(result => this.markers.push(result));
      this.searchResults = [];
      this.$refs.map.mapObject.fitBounds(this.markers.map(m => [m.position.lat, m.position.lng]))
    },
    goToMarker(marker) {
      this.$refs.map.mapObject.flyTo(latLng(marker.lat, marker.lng), 14, { animate: true, duration: 0.5});
    }
  }
};
</script>

<style lang="scss">
.search-results {
  background-color: white;
}

.search-result {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    p {
      margin-left:12px;
      
    }


}
.search-form {
  position: absolute;
  top: 3rem;
  z-index: 999;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 30vw;
}
.search-row {
  position: relative;
}
.search-input {
  width: 100%;
}
.search-clear {
  position: absolute;
  right: 1rem;
  top: 0.2rem;
  width: 15px;
  height: 15px;
  opacity: 0.8;
}
.search-clear:hover {
  opacity: 1;
}
.search-clear:before, .search-clear:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 16px;
  width: 2px;
  background-color: #333;
}
.search-clear:before {
  transform: rotate(45deg);
}
.search-clear:after {
  transform: rotate(-45deg);
}

</style>
