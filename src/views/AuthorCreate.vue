<template>
  <msm-author-form
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @authorSubmit="onSubmit"
  >
  </msm-author-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmAuthorForm from '@/components/AuthorForm'
import {actionTypes} from '@/store/modules/createAuthor'

export default {
  name: 'MsmSectionCreate',
  components: {
    MsmAuthorForm
  },
  data() {
    return {
      initialValues: {
        full_name: '',
        country_of_birth: '',
        comment: '',
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createAuthor.isSubmitting,
      validationErrors: state => state.createAuthor.validationErrors
    })
  },
  methods: {
    onSubmit(authorInput) {
      this.$store
        .dispatch(actionTypes.createAuthor, {authorInput})
        .then(() => {
          this.$router.push({name: 'author'})
        })
    }
  }
}
</script>
