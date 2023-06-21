<template>
  <div class="home">
    <div>
      <router-link class="btn btn-primary" :to="{name: 'bookCreate'}">Add book</router-link>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Year of publication</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="book in books" :key="book">
          <th scope="row">{{ book.id }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.description }}</td>
          <td>{{ book.year_of_publication }}</td>
          <template v-if="book.id">
            <td>
              <router-link class="btn btn-success mr-3" :to="{name: 'bookShow', params: {id: book.id}}">Show
              </router-link>
              <router-link class="btn btn-primary mr-3" :to="{name: 'bookEdit', params: {id: book.id}}">Edit
              </router-link>
              <button @click="deleteBook(book.id)" type="button" class="btn btn-danger">Delete</button>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters} from "vuex";
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes} from "@/store/modules/book";

export default {
  name: 'HomeView',

  computed: {
    ...mapState({
      isLoading: state => state.book.isLoading,
      books: state => state.book.data,
      error: state => state.book.error
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getBooks);
  },

  methods: {
    deleteBook(id) {
      this.$store
          .dispatch(actionTypes.deleteBook, {
            id: id
          })
          .then(() => {
            this.$store.dispatch(actionTypes.getBooks);
          })
    }
  }
}
</script>
