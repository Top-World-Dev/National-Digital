<template>
  <div class="v-map">
    <div class="map-search">
      <div class="map-search-form">
        <div class="map-search-row">
          <input type="text" name="search" placeholder="Search" autocomplete="off" class="map-search-input" aria-label="search" v-model="searchValue" @keyup="search($event.target.value)" @keyup.enter="loadResults">
          <a v-if="searchValue.length > 0" role="button" class="map-search-clear" tabindex="0" @click="clear" ></a>
          <span class="map-search-icon"  v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.931 28.932" width="14" height="14"><path fill="#787c87" d="M28.344 25.518l-6.114-6.115a12.177 12.177 0 002.303-7.137c0-3.275-1.275-6.355-3.594-8.672A12.183 12.183 0 0012.266 0a12.176 12.176 0 00-8.673 3.594 12.183 12.183 0 00-3.592 8.672c0 3.276 1.275 6.356 3.592 8.674a12.187 12.187 0 008.673 3.594c2.599 0 5.067-.813 7.136-2.303l6.114 6.115c.392.391.902.586 1.414.586a2 2 0 001.414-3.414zM6.422 18.111c-1.562-1.562-2.421-3.639-2.421-5.846s.859-4.282 2.421-5.844c1.561-1.562 3.636-2.422 5.844-2.422s4.284.86 5.845 2.422c1.562 1.562 2.422 3.638 2.422 5.845s-.859 4.283-2.422 5.846c-1.562 1.562-3.636 2.42-5.845 2.42s-4.285-.86-5.844-2.421z"/></svg>
          </span>
        </div>
        <div class="map-search-results" v-if="searchResults.length > 0">
          <div class="map-search-result" v-for="result in searchResults" @click="findResult(result)">
            <p><strong>{{ result.brand }}</strong> {{ result.address }}</p>
          </div>
        </div>
      </div>
      <ClientOnly>
      <l-map
        v-if="showMap"
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 500px; width: 100%"
        @click="enableZoom"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :lat-lng.sync="marker.position"
          :icon="getIcon(marker)"
          @click="goToMarker(marker)"
        >          
          <l-popup :content="marker.popup" />
          
        </l-marker>
      </l-map>
    </ClientOnly>
    </div>
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
      'l-marker': Vue2Leaflet.LMarker,
      'l-popup': Vue2Leaflet.LPopup,
      'l-icon': Vue2Leaflet.LIcon,
    },
    async mounted() {
      this.loading = true;
      const response = await fetch('/de.ryd.one-places.json');
      const data = await response.json();
      this.locations = data.map(location => {
        return {
          position: { lat: location.lat, lng: location.lon },
          brand: location.brand,
          address: `${location.street} ${location.houseNumber}, ${location.zip} ${location.city}`,
          zip: location.zip,
          city: location.city,
          street: location.street,
          popup: `
          <div class="map-popup">
            <div class="map-popup-wrapper">
              <h2 class="map-popup-brand">${ location.brand }</h2>
              <p class="map-popup-address">${location.street} ${location.houseNumber}, ${location.zip} ${location.city}</p>
            </div>
          </div>
          `
        }
      });
      // only load markers that are in view
      this.markers = this.locations.filter(point => this.$refs.map.mapObject.getBounds().contains(point.position))
      this.loading = false;

      // add markers when zooming
      this.$refs.map.mapObject.on('zoomend', (e) => this.addMarkers() ) 
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
    methods: {
      addMarkers() {
        this.markers = (this.searchValue.length == 0) ? this.locations.filter(point => this.$refs.map.mapObject.getBounds().contains(point.position)) : this.markers.filter(point => this.$refs.map.mapObject.getBounds().contains(point.position));
      },
      clear() {
        this.searchValue = '';
        this.searchResults = [];
      },
      enableZoom() {
        this.$refs.map.mapObject.scrollWheelZoom.enable();
      },
      findResult(result) {
        this.searchResults = [];
        this.markers = [];
        this.markers.push(result);
        this.$refs.map.mapObject.flyTo(latLng(result.position.lat, result.position.lng),14, { animate: true, duration: 0.5});
      },
      getIcon(marker) {
        let imageName = (marker.brand) ? marker.brand.replace(/\s+/g, '-').toLowerCase() : 'default';
        let imagePath = '';

        try {
          imagePath = require(`!!assets-loader!@media/map-markers/poi_${imageName}.png`).src
        } catch(err) {
          imagePath = require(`!!assets-loader!@media/map-markers/poi_default.png`).src
        }
        let icon = new L.icon({
          iconUrl: imagePath,
          shadowUrl: require(`!!assets-loader!@media/map-markers/marker-shadow.png`).src,
          iconSize: [ 16, 18],
          iconAnchor: [8, 18],
          popupAnchor: [0, -14],
          shadowSize: [12, 20],
          shadowAnchor: [7, 20]
        })
        return icon;
      },
      goToMarker(marker) {
        this.$refs.map.mapObject.flyTo(latLng(marker.position.lat, marker.position.lng), 14, { animate: true, duration: 0.5});
      },
      loadResults() {
        if(this.searchValue.length == 0) {
          return false
        }
        this.markers = [];
        this.searchResults.forEach(result => this.markers.push(result));
        this.searchResults = [];
        this.$refs.map.mapObject.fitBounds(this.markers.map(m => [m.position.lat, m.position.lng]))
      },
      search(value) {
        this.searchResults = (value.length == 0) ? this.locations : this.locations.filter(item => item.brand.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.city.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.street.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.address.indexOf(value) != -1);
      },
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
<style lang="scss">
@import '~/assets/styles.scss';
.v-map {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* Search bar */
  .map-search-results {
    background-color: white;
    border: 0.25px solid $lightGrey;
  }
  .map-search-result {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.25px solid $lightGrey;
    &:hover {
      cursor: pointer;
    }
    p {
      margin-left:12px;
      
    }
  }
  .map-search-form {
    position: absolute;
    top: 3rem;
    z-index: 999;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 30vw;
    min-width: 220px;
  }
  .map-search-row {
    position: relative;
  }
  .map-search-input {
    width: 100%;
    font-size: 0.9rem;
    line-height: 2.5em;
    background-color: $white;
    border: 0.05em solid $lightGrey;
    border-radius: 0.25rem 0.25rem 0 0;
    box-shadow: 0px 0px 34px -13px rgba(120,124,135,1);
    color: $darkGrey;
    height: 50px;
    line-height: 2em;
    padding: 1em;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  .map-search-clear, .map-search-icon {
    position: absolute;
    right: 2rem;
    top: 1rem;
    width: 0.15rem;
    height: 0.15rem;
  }
  .map-search-clear {
    opacity: 0.7;
    &:hover {
      display: block;
      opacity: 1;
      border: none;
    }
    &:focus {
      outline: none;
    }
    &:before, &:after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 16px;
      width: 2px;
      background-color: $lightGrey;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
    
  /* Marker Tooltips */
  .leaflet-popup-content-wrapper {
    max-width: 200px;
  }
  .map-popup {
    padding: 0.5em;
    max-width: 160px;
    display: flex;
  }
  
  .map-popup-wrapper {
    border-top: 0.05em solid $lightGrey;
    border-bottom: 0.05em solid $lightGrey;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }
  .map-popup-brand {
    font-weight: 700;
  }
  .map-popup-address {
    span {
      display: inline-block;
    }
  }
}
</style>
