<template>
  <div>
    <router-link class="btn btn-primary" :to="{name: 'sectionCreate'}">Add section</router-link>
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

      <tr v-for="section in sections" :key="section">
        <th scope="row">{{ section.id }}</th>
        <td>{{ section.name }}</td>
        <td>{{ section.description }}</td>
        <td>
          <router-link class="btn btn-success mr-3" :to="{name: 'sectionShow', params: {id: section.id}}">Show</router-link>
          <router-link class="btn btn-primary mr-3" :to="{name: 'sectionEdit', params: {id: section.id}}">Edit</router-link>
          <button @click="deleteSection(section.id)" type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/section'

export default {
  name: "SectionView",

  computed: {
    ...mapState({
      isLoading: state => state.section.isLoading,
      sections: state => state.section.data,
      error: state => state.section.error
    })
  },

  mounted() {
    this.$store.dispatch(actionTypes.getSections);
  },

  methods: {
    deleteSection(id) {
      this.$store
          .dispatch(actionTypes.deleteSection, {
            id: id
          })
          .then(() => {
            this.$store.dispatch(actionTypes.getSections);
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