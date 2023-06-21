<template>
  <div>
    <router-link class="btn btn-primary" :to="{name: 'authorCreate'}">Add author</router-link>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="author in authors" :key="author">
        <th scope="row">{{ author.id }}</th>
        <td>{{ author.full_name }}</td>
        <td>{{ author.country_of_birth }}</td>
        <td>{{ author.comment }}</td>
        <td>
          <router-link class="btn btn-success mr-3" :to="{name: 'authorShow', params: {id: author.id}}">Show</router-link>
          <router-link class="btn btn-primary mr-3" :to="{name: 'authorEdit', params: {id: author.id}}">Edit</router-link>
          <button @click="deleteAuthor(author.id)" type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/author'

export default {
  name: "SectionView",

  computed: {
    ...mapState({
      isLoading: state => state.author.isLoading,
      authors: state => state.author.data,
      error: state => state.author.error
    })
  },

  mounted() {
    this.$store.dispatch(actionTypes.getAuthors);
  },

  methods: {
    deleteAuthor(id) {
      this.$store
          .dispatch(actionTypes.deleteAuthor, {
            id: id
          })
          .then(() => {
            this.$store.dispatch(actionTypes.getAuthors);
          })
    }
  }
}
</script>

<style scoped>
.mr-3 {
  margin-right: 3px;
}
</style>