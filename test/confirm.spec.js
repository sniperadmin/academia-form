import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import confirm from '@/pages/confirm.vue'

describe('confirm', () => {
  let wrapper

  beforeEach(() => {
    const vuetify = new Vuetify()
    Vue.use(vuetify)

    wrapper = mount(confirm, {
      Vue,
      vuetify,
      propsData: {
        label: 'meow',
        rules: [],
        hideDetails: false
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('should be a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('should load data', () => {
    const titles = wrapper.findAll('h2')
    expect(titles.length).toBe(4)
  })
})
