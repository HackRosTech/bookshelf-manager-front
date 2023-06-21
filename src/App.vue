<template>
  <nav>
    <header class="p-3 text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <router-link :to="{name: 'home'}" class="nav-link px-2 text-secondary">Home</router-link>
            </li>

            <li>
              <router-link v-if="currentUser && currentUser.is_admin" :to="{name: 'section'}" class="nav-link px-2 text-white">
                Section
              </router-link>
            </li>

            <li>
              <router-link v-if="currentUser && currentUser.is_admin" :to="{name: 'author'}" class="nav-link px-2 text-white">
                Author
              </router-link>
            </li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" @submit.prevent="onSubmit">
            <input v-model="search" type="search" class="form-control form-control-dark text-bg-dark"
                   placeholder="Search..." aria-label="Search">
          </form>

          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2">Login</button>
            <button type="button" class="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
  </nav>
  <router-view/>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {actionTypes} from "@/store/modules/book";
import {actionTypes as actionTypesAuth, getterTypes as authGetterTypes} from '@/store/modules/auth'

export default {
  name: 'HomeView',

  data() {
    return {
      search: ''
    }
  },

  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    ...mapState({
      isLoading: state => state.book.isLoading,
      books: state => state.book.data,
      error: state => state.book.error
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypesAuth.getCurrentUser);
  },

  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.getBooks, this.search);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  color: #2c3e50;
}
</style>
