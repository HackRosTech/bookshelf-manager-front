import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import section from '@/store/modules/section'
import createSection from "@/store/modules/createSection";
import editSection from "@/store/modules/editSection";
import author from "@/store/modules/author";
import createAuthor from "@/store/modules/createAuthor";
import editAuthor from "@/store/modules/editAuthor";
import book from "@/store/modules/book";
import createBook from "@/store/modules/createBook";
import editBook from "@/store/modules/editBook";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    section,
    createSection,
    editSection,
    author,
    createAuthor,
    editAuthor,
    book,
    createBook,
    editBook
  }
})
