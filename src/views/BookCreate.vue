<template>
  <msm-book-form
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @bookSubmit="onSubmit"
  >
  </msm-book-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmBookForm from '@/components/BookForm'
import {actionTypes} from '@/store/modules/createBook'

export default {
  name: 'MsmBookCreate',
  components: {
    MsmBookForm
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        cover_image: '',
        year_of_publication: '',
        author_id: '',
        section_id: '',
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
    onSubmit(bookInput) {
      this.$store
        .dispatch(actionTypes.createBook, {bookInput})
        .then(() => {
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>
