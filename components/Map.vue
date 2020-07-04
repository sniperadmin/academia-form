<template>
  <GmapMap
    :center="{lat:10, lng:10}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 600px"
    @click="getLocation"
  />
</template>

<script>
import { getCors } from '@/helpers/emitLatLng'
export default {
  name: 'Map',
  methods: {
    getLocation () {
      getCors()
    }
  }
}
</script>

<style scoped>

</style>
