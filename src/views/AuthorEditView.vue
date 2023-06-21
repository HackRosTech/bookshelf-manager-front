<template>
  <msm-author-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @authorSubmit="onSubmit"
  >
  </msm-author-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmAuthorForm from "@/components/AuthorForm";
import {actionTypes} from '@/store/modules/editAuthor'

export default {
  name: "AuthorUpdateView",
  components: {MsmAuthorForm},
  computed: {
    ...mapState({
      isLoading: state => state.editAuthor.isLoading,
      author: state => state.editAuthor.author,
      isSubmitting: state => state.editAuthor.isSubmitting,
      validationErrors: state => state.editAuthor.validationErrors
    }),
    initialValues() {
      console.log(this.author)
      if (!this.author) {
        return null
      }
      return {
        full_name: this.author.full_name,
        country_of_birth: this.author.country_of_birth,
        comment: this.author.comment,
      }
    }
  },

  mounted() {
    this.$store.dispatch(actionTypes.getAuthor, {
      id: this.$route.params.id
    })
  },

  methods: {
    onSubmit(authorInput) {
      const id = this.$route.params.id
      this.$store
          .dispatch(actionTypes.updateAuthor, {authorInput, id})
          .then(() => {
            this.$router.push({name: 'author'})
          })
    }
  }
}
</script>

<style scoped>

</style>