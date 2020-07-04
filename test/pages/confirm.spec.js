import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import confirm from '@/pages/confirm.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      name: 'mock',
      email: 'mock@jest.com',
      mobile: '0123456789',
      calculated: 'fake'
    })
  })
)

describe('confirm', () => {
  let wrapper
  const localVue = createLocalVue()

  beforeEach(() => {
    Vue.use(Vuetify)
    const vuetify = new Vuetify()

    wrapper = shallowMount(confirm, {
      localVue,
      vuetify,
      mocks: {
        $route: {
          params: { id: 4 }
        }
      },
      data () {
        return {
          userData: null
        }
      }
    })
  })

  afterEach(() => {
    fetch.mockClear()
    wrapper.destroy()
  })

  // tests here
  test('should be vue', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('should not load user data', () => {
    const vct = wrapper.find('v-card-text-stub')
    expect(vct.exists()).toBe(false)
  })

  test('should load userdata', async () => {
    wrapper.setData({
      userData: {
        name: 'mock',
        email: 'mock@jest.com',
        mobile: '0123456789',
        calculated: 'fake'
      }
    })
    await wrapper.vm.$nextTick()
    const vct = wrapper.find('v-card-text-stub')
    expect(vct.exists()).toBe(true)
  })
})
