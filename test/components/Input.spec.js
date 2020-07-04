import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Input from '@/components/Input.vue'

describe('Input', () => {
  let wrapper
  // Vue.use(Vuetify, {})

  beforeEach(() => {
    const vuetify = new Vuetify()
    Vue.use(vuetify)

    wrapper = mount(Input, {
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

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
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
    const label = wrapper.find('.v-label')
    wrapper.setProps({ label: 'test label' })

    await wrapper.vm.$nextTick()

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('test label')
    expect(label.classes()).toContain('theme--light')
  })

  test('should load input value', async () => {
    const input = wrapper.find('.v-text-field')
    wrapper.setProps({ value: 'test value' })

    await wrapper.vm.$nextTick()

    expect(input.exists()).toBe(true)
    // console.log(input.vm.value)
    expect(input.vm.value).toBe('test value')
  })

  test('should load rules', async () => {
    const input = wrapper.find('.v-text-field')
    const mockedRules = [false]
    wrapper.setProps({ rules: mockedRules })
    await wrapper.vm.$nextTick()
    expect(input.props('rules')).toContain(mockedRules[0])
  })
})

describe('testing input reusability', () => {
  Vue.use(Vuetify)
  const comp = {
    template: "<ng-input :hide-details='false' :rules='[rules]' label='label' />",
    components: { 'ng-input': Input }
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
