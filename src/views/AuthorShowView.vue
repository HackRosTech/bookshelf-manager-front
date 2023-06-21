<template>
<div>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">full name</th>
      <th scope="col">country of birth</th>
      <th scope="col">comment</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="author">
      <td>{{ author.full_name }}</td>
      <td>{{ author.country_of_birth }}</td>
      <td>{{ author.comment }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {actionTypes} from "@/store/modules/author";
import {mapState} from 'vuex'

export default {
  name: "AuthorShowVue",

  computed: {
    ...mapState({
      isLoading: state => state.author.isLoading,
      author: state => state.author.data,
      error: state => state.author.error
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getAuthor, {
      id: this.$route.params.id
    })
  }
}
</script>

<style scoped>

</style>