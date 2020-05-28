import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Input from '@/components/Input.vue'

describe('Input', () => {
  let wrapper
  Vue.use(Vuetify, {})

  beforeEach(() => {
    wrapper = shallowMount(Input, {
      Vue, // createLocalVue gives error is used with shallowMount [BUG]
      propsData: {
        label: 'meow',
        hideDetails: false
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('checks props type', () => {
    expect(typeof Input.props).toBe('object')
  })

  test('emits correct events', () => {
    const stub = jest.fn()
    wrapper.vm.$on('enter', stub)
    wrapper.vm.$on('input', stub)

    wrapper.vm.$emit('enter')
    wrapper.vm.$emit('input', 'some text')
    expect(stub).toBeCalled()
    expect(stub).toBeCalledWith('some text')
  })

  test('should load label', async () => {
    const label = wrapper.find('v-label-stub')
    wrapper.setProps({ label: 'test label' })

    await wrapper.vm.$nextTick()

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('test label')
    expect(label.classes()).toContain('sb-input-label')
  })

  test('should load input value', async () => {
    const input = wrapper.find('v-text-field-stub')
    wrapper.setProps({ value: 'test value' })

    await wrapper.vm.$nextTick()

    expect(input.exists()).toBe(true)
    expect(input.attributes().value).toBe('test value')
  })

  test('should test true added attrs into input', () => {
    const input = wrapper.find('v-text-field-stub')
    expect(input.attributes().outlined).toBe('true')
    expect(input.attributes().singleline).toBe('true')
  })

  test('should load rules', async () => {
    const input = wrapper.find('v-text-field-stub')
    const mockedRules = [false]
    wrapper.setProps({ rules: mockedRules })
    await wrapper.vm.$nextTick()
    expect(input.props('rules')).toContain(mockedRules[0])
  })
})

describe('testing input reusability', () => {
  Vue.use(Vuetify)
  const comp = {
    template: "<sb-input :hide-details='false' :rules='[rules]' label='label' />",
    components: { 'sb-input': Input }
  }
  const validator = () => false
  const wrapper = mount(comp, {
    Vue,
    data () {
      return {
        rules: validator
      }
    }
  })

  test('should load component', () => {
    const input = wrapper.find('.v-input')
    const label = wrapper.find('.v-label')
    const messages = wrapper.find('.v-messages__wrapper')

    expect(label.exists()).toBe(true)
    expect(input.classes()).toContain('sb-input-field')
    expect(messages.exists()).toBe(true)
  })

  test('should load the rules', () => {
    const input = wrapper.find('.v-input')

    expect(input.props('rules')).toContain(validator)
  })
})
