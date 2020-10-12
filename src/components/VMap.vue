<template>

<div style="height: 500px; width: 100%">

    <div class="search-form">
      <div class="search-row">
        <input type="search" name="search" placeholder="Search" class="search-input" @keyup="search($event.target.value)">
        <a role="button" class="search-clear search-is-hidden" tabindex="0"></a>
      </div>
    </div>
    <l-map
      v-if="showMap"
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
        v-for="location in locations"
        :key="location.id"
        :lat-lng.sync="location.position"
        @click="alert(location)"
      >
        <l-tooltip :content="location.tooltip" />
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
      locations: [],
    };
  },
  methods: {
    search(value) {
      if(value.length > 2) {
        console.log(this.locations.filter(item => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.tooltip.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.address.toLowerCase().indexOf(value.toLowerCase()) != -1));
      }
     
    }
  }
};
</script>

<style>

</style>
