<template>
  <v-row>
    <!-- <div class="text-center">
      <logo />
      <vuetify-logo />
    </div> -->
    <v-col>
      <v-card>
        <v-card-title class="headline">
          Input Form
        </v-card-title>
        <v-card-text>
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
            :rules="[rules.required, rules.intCode]"
            :hide-details="false"
            label="Mobile"
          />
          <Input
            v-model="userInfo.address"
            :rules="[rules.required]"
            :hide-details="false"
            label="Address"
          />
          <gmap-autocomplete class="introInput">
            <template v-slot:input="slotProps">
              <Input
                ref="input"
                outlined
                prepend-inner-icon="place"
                placeholder="Location Of Event"
                @listeners="slotProps.listeners"
                @attrs="slotProps.attrs"
              />
            </template>
          </gmap-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <Map />
    </v-col>
  </v-row>
</template>

<script>
import Map from '../components/Map.vue'
import Input from '../components/Input.vue'
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import formRules from '@/mixins/formRules'
export default {
  components: {
    // Logo,
    // VuetifyLogo,
    Input,
    Map
  },
  mixins: [formRules],
  data: () => ({
    userInfo: {
      name: null,
      email: null,
      mobile: null,
      address: null
    }
  })
}
</script>
