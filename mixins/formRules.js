import {
  required,
  email,
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecial,
  minchars,
  intCode,
  ip,
  port
} from '../static/allRules'

export default {
  data () {
    return {
      rules: {
        required,
        email,
        password: {
          hasLowercase,
          hasUppercase,
          hasNumber,
          hasSpecial,
          minchars
        },
        phone: {
          intCode
        },
        ip,
        port
      }
    }
  }
}
