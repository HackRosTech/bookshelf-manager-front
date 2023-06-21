<template>
<div>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="section">
      <th scope="row">1</th>
      <td>{{ section.name }}</td>
      <td>{{ section.description }}</td>
      <td>@mdo</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {actionTypes} from "@/store/modules/section";
import {mapState} from 'vuex'

export default {
  name: "SectionShowVue",

  computed: {
    ...mapState({
      isLoading: state => state.section.isLoading,
      section: state => state.section.data,
      error: state => state.section.error
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getSection, {
      id: this.$route.params.id
    })
  }
}
</script>

<style scoped>

</style>