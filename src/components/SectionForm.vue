<template>
  <div class="d-flex justify-content-center">
    <msm-validation-errors v-if="errors" :validation-errors="errors" ></msm-validation-errors>
    <form class="w-25" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
               placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input v-model="description" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter description">
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
  name: 'MsmSectionForm',
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
      name: this.initialValues.name,
      description: this.initialValues.description,
    }
  },
  methods: {
    onSubmit() {
      const form = {
        name: this.name,
        description: this.description,
      }
      this.$emit('sectionSubmit', form)
    }
  }
}
</script>
