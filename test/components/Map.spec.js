import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Map from '@/components/Map.vue'

describe('Map', () => {
  let wrapper

  beforeEach(() => {
    const vuetify = new Vuetify()
    Vue.use(vuetify)

    wrapper = mount(Map, {
      Vue,
      vuetify
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('should load Map', () => {
    const map = wrapper.find('GmapMap')
    console.log(map.attributes())
    expect(map.exists()).toBe(true)
    expect(map.attributes().zoom).toBe('7')
    expect(map.attributes('map-type-id')).toBe('terrain')
  })
})
