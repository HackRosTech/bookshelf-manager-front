<template>
  <div class="d-flex justify-content-center">
    <msm-validation-errors v-if="errors" :validation-errors="errors" ></msm-validation-errors>
    <form class="w-25" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
               placeholder="Enter your full name" v-model="full_name">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input v-model="country_of_birth" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter your country of birth">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input v-model="comment" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter comment">
      </div>
      <div class="form-check">
      </div>
      <button type="submit" :disabled="isSubmitting" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import MsmValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'MsmAuthorForm',
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  components: {
    MsmValidationErrors
  },
  data() {
    return {
      full_name: this.initialValues.full_name,
      country_of_birth: this.initialValues.country_of_birth,
      comment: this.initialValues.comment,
    }
  },
  methods: {
    onSubmit() {
      const form = {
        full_name: this.full_name,
        country_of_birth: this.country_of_birth,
        comment: this.comment,
      }
      this.$emit('authorSubmit', form)
    }
  }
}
</script>
