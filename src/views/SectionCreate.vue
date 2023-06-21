<template>
  <msm-section-form
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @sectionSubmit="onSubmit"
  >
  </msm-section-form>
</template>

<script>
import {mapState} from 'vuex'

import MsmSectionForm from '@/components/SectionForm'
import {actionTypes} from '@/store/modules/createSection'

export default {
  name: 'MsmSectionCreate',
  components: {
    MsmSectionForm
  },
  data() {
    return {
      initialValues: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createSection.isSubmitting,
      validationErrors: state => state.createSection.validationErrors
    })
  },
  methods: {
    onSubmit(sectionInput) {
      this.$store
        .dispatch(actionTypes.createSection, {sectionInput})
        .then(() => {
          this.$router.push({name: 'section'})
        })
    }
  }
}
</script>
