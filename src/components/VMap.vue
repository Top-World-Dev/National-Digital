<template>
  <div>
    <ClientOnly>
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
      </l-map>  
     </ClientOnly>
  </div>
</template>
<script>
  let Vue2Leaflet = {};
  let latLng,icon; 
  import 'leaflet/dist/leaflet.css';

  if (process.isClient) {
    Vue2Leaflet = require("vue2-leaflet");



      icon = require('leaflet').Icon
    delete icon.Default.prototype._getIconUrl;
    icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
    latLng =  require('leaflet').latLng
    }
  export default {
    components: {
      // mapping components
      'l-map': Vue2Leaflet.LMap,
      'l-tile-layer': Vue2Leaflet.LTileLayer,
      'l-marker': Vue2Leaflet.LMarker
    },
    data() {
      return {
        loading: false,
        zoom: 6,
        scroll: false,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        mapOptions: {
          zoomSnap: 0.5,
          scrollWheelZoom: false
        },
        showMap: true,
        locations: [],
        markers: [],
        visibleMarkers: [],
        searchValue: '',
        searchResults: [],
      };
    },
    computed: {
      center() {
        if (process.isClient) {
          return latLng(52.520008, 13.404954)
        }
      }
    }
  }
</script>