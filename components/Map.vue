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
export default {
  name: 'Map',
  methods: {
    getLocation (e) {
      this.$emit('map', { lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
  }
}
</script>

<style scoped>

</style>
