<template>
  <msm-book-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @bookSubmit="onSubmit"
  >
  </msm-book-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmBookForm from "@/components/BookForm";
import {actionTypes} from '@/store/modules/editBook'

export default {
  name: "BookUpdateView",
  components: {MsmBookForm},
  computed: {
    ...mapState({
      isLoading: state => state.editBook.isLoading,
      book: state => state.editBook.book,
      isSubmitting: state => state.editBook.isSubmitting,
      validationErrors: state => state.editBook.validationErrors
    }),
    initialValues() {
      if (!this.book) {
        return null
      }
      return {
        title: this.book.title,
        description: this.book.description,
        cover_image: this.book.cover_image,
        year_of_publication: this.book.year_of_publication,
        author_id: this.book.author_id,
        section_id: this.book.section_id,
      }
    }
  },

  mounted() {
    this.$store.dispatch(actionTypes.getBook, {
      id: this.$route.params.id
    })
  },

  methods: {
    onSubmit(bookInput) {
      const id = this.$route.params.id
      this.$store
          .dispatch(actionTypes.updateBook, {bookInput, id})
          .then(() => {
            this.$router.push({name: 'home'})
          })
    }
  }
}
</script>

<style scoped>

</style>