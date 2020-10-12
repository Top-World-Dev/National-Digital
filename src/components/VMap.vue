<template>

<div style="height: 500px; width: 100%">
  
    <div style="height: 200px overflow: auto;">
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px; width: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng.sync="marker.position"
        @click="alert(marker)"
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
    this.markers = data.map(location => {
      return {
        position: { lat: location.lat, lng: location.lng },
        tooltip: location.description
      }
    });
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
      currentZoom: 11.5,
      currentCenter: latLng(52.520008, 13.404954),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      markers: []
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>

<style>

</style>
