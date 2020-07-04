import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import index from '@/pages/index.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      savedSubmissionID: 4
    })
  })
)

describe('index', () => {
  let wrapper

  const localVue = createLocalVue()

  beforeEach(() => {
    Vue.use(Vuetify)
    const vuetify = new Vuetify()

    wrapper = shallowMount(index, {
      localVue,
      vuetify,
      data () {
        return {
          userData: null
        }
      },
      mocks: {
        $route: {
          params: {
            name: 'home'
          }
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

  test('should test logmap', async () => {
    const spyLogMap = jest.spyOn(wrapper.vm, 'logMap')
      .mockImplementation(() => { return { lat: 0, lng: 0 } })

    wrapper.vm.$on('map', spyLogMap)
    wrapper.vm.$emit('map')

    await wrapper.vm.$nextTick()
    expect(spyLogMap).toHaveBeenCalled()
  })

  test('should test submitInfo', async () => {
    const spySubmitInfo = jest.spyOn(wrapper.vm, 'submitInfo')
    const btn = wrapper.find('v-btn-stub')

    wrapper.vm.$on('click', spySubmitInfo)
    btn.trigger('click')
    wrapper.vm.$emit('click')

    await wrapper.vm.$nextTick()

    expect(btn.exists()).toBe(true)
    expect(spySubmitInfo).toHaveBeenCalled()
  })
})
