<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title class="headline">
          Input Form
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <Input
              v-model="userInfo.name"
              :rules="[rules.required]"
              :hide-details="false"
              label="Name"
            />
            <Input
              v-model="userInfo.email"
              :rules="[rules.required, rules.email]"
              :hide-details="false"
              label="Email"
            />
            <Input
              v-model="userInfo.mobile"
              :rules="[rules.required, rules.phone.intCode]"
              :hide-details="false"
              label="Mobile"
            />
            <Input
              v-model="userInfo.calculated"
              text-area
              :rules="[rules.required]"
              :hide-details="false"
              label="Address"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            color="primary"
            @click="submitInfo"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <Map @map="logMap" />
    </v-col>
  </v-row>
</template>

<script>
import Map from '../components/Map.vue'
import Input from '../components/Input.vue'
import formRules from '@/mixins/formRules'
require('@/mocks/mirage')

export default {
  components: {
    Input,
    Map
  },
  mixins: [formRules],
  data: () => ({
    valid: false,
    userInfo: {
      name: null,
      email: null,
      mobile: null,
      calculated: null
    },
    savedSubmissionID: null
  }),
  mounted () {
    fetch('/api/profiles').then((res) => { return res.json() }).then(json => console.log(json))
  },
  methods: {
    logMap (e) {
      this.userInfo.calculated = `latitude: ${e.lat}, longitude: ${e.lng}`
    },
    submitInfo () {
      fetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify(this.userInfo)
      }).then((res) => {
        return res.json()
      }).then((json) => { this.savedSubmissionID = json.profile.id }).then(() => {
        this.$router.push({ name: 'confirm', params: { id: this.savedSubmissionID } })
      })
    }
  }
}
</script>
