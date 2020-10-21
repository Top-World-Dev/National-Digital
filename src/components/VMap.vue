<template>
  <div class="v-map">
    <div class="map-search">
      <div class="map-search-form">
        <div class="map-search-row">
          <input type="text" name="search" placeholder="Search" autocomplete="off" class="map-search-input" aria-label="search" v-model="searchValue" @keyup.enter="loadResults()">
          <a v-if="searchValue.length > 0" role="button" class="map-search-clear" tabindex="0" @click="clear" ></a>
          <span class="map-search-icon"  v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.931 28.932" width="14" height="14"><path fill="#787c87" d="M28.344 25.518l-6.114-6.115a12.177 12.177 0 002.303-7.137c0-3.275-1.275-6.355-3.594-8.672A12.183 12.183 0 0012.266 0a12.176 12.176 0 00-8.673 3.594 12.183 12.183 0 00-3.592 8.672c0 3.276 1.275 6.356 3.592 8.674a12.187 12.187 0 008.673 3.594c2.599 0 5.067-.813 7.136-2.303l6.114 6.115c.392.391.902.586 1.414.586a2 2 0 001.414-3.414zM6.422 18.111c-1.562-1.562-2.421-3.639-2.421-5.846s.859-4.282 2.421-5.844c1.561-1.562 3.636-2.422 5.844-2.422s4.284.86 5.845 2.422c1.562 1.562 2.422 3.638 2.422 5.845s-.859 4.283-2.422 5.846c-1.562 1.562-3.636 2.42-5.845 2.42s-4.285-.86-5.844-2.421z"/></svg>
          </span>
        </div>
        <div class="map-search-results" v-if="searchSuggestions.length > 0">
          <div class="map-search-result" v-for="result in searchSuggestions" @click="findResult(result)">
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

        <l-layer-group ref="features">
          <l-marker
            v-for="marker in markers"
            :key="marker.id"
            ref="marker"
            :lat-lng.sync="marker.position"
          
            @click="goToMarker(marker)"
          ></l-marker>
          </l-layer-group>
      </l-map>
    </ClientOnly>
    </div>
  </div>
</template>
<script>
  let Vue2Leaflet = {};
  let latLng,icon; 
  import 'leaflet/dist/leaflet.css';
  import _ from 'lodash'

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
      'l-layer-group': Vue2Leaflet.LLayerGroup,
      'l-popup': Vue2Leaflet.LPopup,
      'l-icon': Vue2Leaflet.LIcon,
    },
    props: ["blok"], 
    async mounted() {
      this.loading = true;
      const response = await fetch('/de.ryd.one-places.json');
      const data = await response.json();
      this.locations = data.map(location => {
        return {
          id: location.id,
          position: { lat: location.lat, lng: location.lon },
          brand: location.brand,
          address: `${location.street} ${location.houseNumber}, ${location.zip} ${location.city}`,
          zip: location.zip,
          city: location.city,
          street: location.street,
          popup: `
          <div class="map-popup">
            <div class="map-popup-wrapper">
              <div class="map-popup-brand">${ location.brand }</div>
              <div class="map-popup-address">${location.street} ${location.houseNumber}<br />  ${location.zip} ${location.city}</div>
            </div>
          </div>
          `
        }
      });

      this.$refs.map.mapObject.on('load', this.addMarkers());
     
      this.loading = false;

    },
    data() {
      return {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        loading: false, 
        locations: [],
        activeMarker: null,
        markers: [],
        mapOptions: {
          zoomSnap: 0.5,
          scrollWheelZoom: false,
          preferCanvas: true
        },
        scroll: false,
        searchValue: '',
        searchSuggestions: [],
        searchResults: [],
        showMap: true,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      };
    },
    methods: {
      addMarkers() {
        this.markers = (this.searchResults.length == 0) ? this.locations.map(point => point) : this.searchResults.map(point => point) ; 
      },
      clear() {
        this.searchValue = '';
        this.searchResults = [];
        this.markers = [];
        this.activeMarker = null;
        this.$refs.map.mapObject.closePopup();
        this.$refs.map.mapObject.setView(new L.LatLng(Number(this.blok.lat), Number(this.blok.lng)), Number(this.blok.zoom));
        this.addMarkers();

      },
      enableZoom() {
        this.$refs.map.mapObject.scrollWheelZoom.enable();
      },
      findResult(result) {
        this.$refs.map.mapObject.closePopup();

        // clear old markers and search results
        this.searchResults = [];
        this.markers = [];

        // add new search marker
        this.searchResults.push(result);
        this.markers.push(result);
        
        this.goToMarker(result);
        
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
        })
        return icon;
      },
      goToMarker(marker) {
        if(this.activeMarker == marker.id) {
          return false;
        }
        this.searchSuggestions = [];
        this.$refs.map.mapObject.flyTo(latLng(marker.position.lat, marker.position.lng), 14, { animate: true, duration: 0.9});

        this.activeMarker = marker.id;
        
        
      },
      loadResults() {
        if(this.searchValue.length == 0) {
          return false
        }

        // clear out old search and markers
        this.searchResults = this.searchSuggestions;
        this.searchSuggestions = [];
        this.markers = [];
        this.activeMarker = null;

        // add new markers and search results
        this.searchResults.forEach(result => this.markers.push(result));
        this.$refs.map.mapObject.fitBounds(this.markers.map(m => [m.position.lat, m.position.lng]))
      },
      search(value) {
        this.searchSuggestions = (value.trim().length == 0) ? this.locations : this.locations.filter(item => item.brand.toLowerCase().indexOf(value.trim().toLowerCase()) != -1 || item.city.toLowerCase().indexOf(value.trim().toLowerCase()) != -1 || item.street.toLowerCase().indexOf(value.trim().toLowerCase()) != -1 || item.address.indexOf(value.trim()) != -1);
      },
      triggerSearch:_.debounce(function(value) {
        this.search(value);
      }, 300),
    },
    computed: {
      center() {
        if (process.isClient) {
          return latLng(Number(this.blok.lat), Number(this.blok.lng))
        }
      },
      zoom() {
        if (process.isClient) {
          return Number(this.blok.zoom)
        }
      }
    },
    watch: {
      searchValue: function (newSearch, oldSearch) {
        if(newSearch.length == 0) {
          this.searchSuggestions = [];
        }
        if(newSearch.length > 1) {
          this.triggerSearch(newSearch);
        }
      },
      activeMarker: {
        async handler(newVal, oldVal) {
          await this.$nextTick()  

          // get marker position
          if(newVal) {
  
            let marker = this.markers.filter(item => item.id == newVal);
            let pos = this.markers.map(point => point.id ).indexOf(newVal);

            this.$refs.marker[pos].mapObject.bindPopup(marker[0].popup).openPopup();
          }
          
        },
        immediate: true
      },

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
    align-items: flex-start;
    justify-content: flex-start;
    &:hover {
      cursor: pointer;
    }
    p {
      margin-left: 1rem;
      color: $black;
      border-color: transparent;
      border-bottom-width: 0.05em;
      border-bottom-style: solid;
      text-decoration: none;
      &:hover {
        border-color: $black;
      }
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
    display: block;
    width: 25px;
    height: 25px;
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
