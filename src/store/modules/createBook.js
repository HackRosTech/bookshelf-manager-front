import bookApi from '@/api/book'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createBookStart: '[createBook] Create book start',
  createBookSuccess: '[createBook] Create book success',
  createBookFailure: '[createBook] Create book failure'
}

export const actionTypes = {
  createBook: '[createBook] Create book'
}

const mutations = {
  [mutationTypes.createBookStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createBookSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createBookFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createBook](context, {bookInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createBookStart)
      bookApi
        .createBook(bookInput)
        .then(book => {
          context.commit(mutationTypes.createBookSuccess, book)
          resolve(book)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createBookFailure,
            result.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
