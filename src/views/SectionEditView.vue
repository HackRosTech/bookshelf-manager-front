<template>
  <msm-section-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @sectionSubmit="onSubmit"
  >
  </msm-section-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmSectionForm from "@/components/SectionForm";
import {actionTypes} from '@/store/modules/editSection'

export default {
  name: "SectionUpdateView",
  components: {MsmSectionForm},
  computed: {
    ...mapState({
      isLoading: state => state.editSection.isLoading,
      section: state => state.editSection.section,
      isSubmitting: state => state.editSection.isSubmitting,
      validationErrors: state => state.editSection.validationErrors
    }),
    initialValues() {
      if (!this.section) {
        return null
      }
      return {
        name: this.section.name,
        description: this.section.description,
      }
    }
  },

  mounted() {
    this.$store.dispatch(actionTypes.getSection, {
      id: this.$route.params.id
    })
  },

  methods: {
    onSubmit(sectionInput) {
      const id = this.$route.params.id
      this.$store
          .dispatch(actionTypes.updateSection, {sectionInput, id})
          .then(() => {
            this.$router.push({name: 'section'})
          })
    }
  }
}
</script>

<style scoped>

</style>