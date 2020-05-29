<template>
  <v-container>
    <v-alert
      outlined
      type="success"
      text
    >
      Thanks for your submission!
    </v-alert>
    <v-card>
      <v-card-title>
        Registered Info
      </v-card-title>
      <v-card-text v-if="userData">
        <v-col cols="12">
          <h2>
            Name: {{ userData.name }}
          </h2>
        </v-col>
        <v-col cols="12">
          <h2>
            Email: {{ userData.email }}
          </h2>
        </v-col>
        <v-col cols="12">
          <h2>
            Mobile: {{ userData.mobile }}
          </h2>
        </v-col>
        <v-col cols="12">
          <h2>
            Address: {{ userData.calculated }}
          </h2>
        </v-col>
      </v-card-text>
    </v-card>
    <v-row justify="center" class="mt-8">
      <v-btn color="info" @click="$router.back()">
        back
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userData: null
  }),

  computed: {
    userId () {
      return this.$route.params.id
    }
  },
  mounted () {
    fetch('/api/profiles/' + this.userId).then((response) => { return response.json() }).then((json) => {
      this.userData = json.profile
    })
  }
}
</script>

<style scoped>

</style>
