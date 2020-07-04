import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Map from '@/components/Map.vue'

describe('Map', () => {
  let wrapper
  const localVue = createLocalVue()

  beforeEach(() => {
    const vuetify = new Vuetify()
    Vue.use(vuetify)

    wrapper = shallowMount(Map, {
      localVue,
      vuetify,
      stubs: ['GmapMap']
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('should load Map', () => {
    const map = wrapper.find('GmapMap-stub')
    expect(map.exists()).toBe(true)
    expect(map.attributes().zoom).toBe('7')
    expect(map.attributes('map-type-id')).toBe('terrain')
  })

  test('should emit click event', async () => {
    const map = wrapper.find('GmapMap-stub')
    const mockGetLocation = jest.spyOn(wrapper.vm, 'getLocation')
      .mockImplementation(() => { return { lat: 0, lng: 0 } })

    wrapper.vm.$on('click', mockGetLocation)
    map.trigger('click')
    await wrapper.vm.$emit('click')

    expect(mockGetLocation).toHaveBeenCalled()
  })
})
