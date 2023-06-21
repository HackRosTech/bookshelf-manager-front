import bookApi from '@/api/book'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  book: null
}

export const mutationTypes = {
  updateBookStart: '[editBook] Update book start',
  updateBookSuccess: '[editBook] Update book success',
  updateBookFailure: '[editBook] Update book failure',

  getBookStart: '[editBook] Get book start',
  getBookSuccess: '[editBook] Get book success',
  getBookFailure: '[editBook] Get book failure'
}

export const actionTypes = {
  updateBook: '[editBook] Edit book',
  getBook: '[getBook] Get book'
}

const mutations = {
  [mutationTypes.updateBookStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateBookSuccess](state) {
    state.isSubmitting = false
    state.book = null
  },
  [mutationTypes.updateBookFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getBookStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getBookSuccess](state, payload) {
    state.isLoading = false
    state.book = payload
  },
  [mutationTypes.getBookFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateBook](context, {id, bookInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateBookStart)
      bookApi
        .updateBook(id, bookInput)
        .then(book => {
          context.commit(mutationTypes.updateBookSuccess, book)
          resolve(book)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateBookFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getBook](context, {id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getBookStart)
      bookApi
        .getEditBook(id)
        .then(book => {
          context.commit(mutationTypes.getBookSuccess, book)
          resolve(book)
        })
        .catch(() => {
          context.commit(mutationTypes.getBookFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
