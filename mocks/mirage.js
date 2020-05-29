import { Server, Model, Factory } from 'miragejs'
import faker from 'faker'

export default new Server({
  models: {
    profile: Model
  },

  factories: {
    profile: Factory.extend({
      name () { return faker.name.findName() },
      email () { return faker.internet.email() },
      mobile () { return faker.phone.phoneNumber() },
      address () { return faker.address.streetAddress() }
    })
  },

  seeds (server) {
    server.createList('profile', 2)
  },

  routes () {
    this.namespace = 'api'

    this.get('/profiles', (schema) => {
      return schema.profiles.all()
    })

    this.get('/profiles/:id', (schema, request) => {
      const user = schema.profiles.find(request.params.id)
      return user
    })

    this.post('/profiles', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)

      return schema.profiles.create(attrs)
    })
  }
})
