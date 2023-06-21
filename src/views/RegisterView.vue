<template>
  <div class="container d-flex justify-content-center align-items-center h">

    <form @submit.prevent="onSubmit">
      <bm-validation-errors
          v-if="validationErrors"
          :validation-errors="validationErrors"
      ></bm-validation-errors>

      <div class="form-outline mb-4">
        <input type="text" id="form2Example1" class="form-control" v-model="name" placeholder="Name" />
      </div>

      <div class="form-outline mb-4">
        <input type="email" id="form2Example1" class="form-control" v-model="email" placeholder="Email address" />
      </div>

      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" class="form-control" v-model="password" placeholder="Password" />
      </div>

      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" class="form-control" v-model="confirmPassword" placeholder="Confirm Password" />
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <!-- Checkbox -->
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example34" checked/>
            <label class="form-check-label" for="form2Example34"> Remember me </label>
          </div>
        </div>

        <div class="col">
          <!-- Simple link -->
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <!-- Submit button -->
      <button :disabled="isSubmitting" type="submit" class="btn btn-primary btn-block mb-4">Sign Up</button>

      <div class="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <button type="button" class="btn btn-secondary btn-floating mx-1">
          <i class="fab fa-google"></i>
          <font-awesome-icon :icon="faGoogle"/>
        </button>

      </div>
    </form>

  </div>
</template>

<script>
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import BmValidationErrors from '@/components/ValidationErrors'

export default {
  name: "RegisterView.vue",

  components: {
    BmValidationErrors
  },

  data() {
    return {
      faGoogle: faGoogle,
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  },

  methods: {
    onSubmit() {
      console.log('onSubmit')
      this.$store
          .dispatch('register', {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.confirmPassword
          })
          .then(() => {
            this.$router.push({name: 'home'})
          })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
</style>