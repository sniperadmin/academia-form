import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MAPS_API,
    libraries: 'places'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
  }
})
