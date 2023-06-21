<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">title</th>
        <th scope="col">description</th>
        <th scope="col">year of publication</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="book">
        <td>{{ book.title }}</td>
        <td>{{ book.description }}</td>
        <td>{{ book.year_of_publication }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {actionTypes} from "@/store/modules/book";
import {mapState} from 'vuex'

export default {
  name: "BookShowVue",

  computed: {
    ...mapState({
      isLoading: state => state.book.isLoading,
      book: state => state.book.data,
      error: state => state.book.error
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getBook, {
      id: this.$route.params.id
    })
  }
}
</script>

<style scoped>

</style>