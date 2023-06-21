import authorApi from '@/api/author'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createAuthorStart: '[createAuthor] Create author start',
  createAuthorSuccess: '[createAuthor] Create author success',
  createAuthorFailure: '[createAuthor] Create author failure'
}

export const actionTypes = {
  createAuthor: '[createAuthor] Create author'
}

const mutations = {
  [mutationTypes.createAuthorStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createAuthorSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createAuthorFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createAuthor](context, {authorInput}) {
    console.log(authorInput)
    return new Promise(resolve => {
      context.commit(mutationTypes.createAuthorStart)
      authorApi
        .createAuthor(authorInput)
        .then(author => {
          context.commit(mutationTypes.createAuthorSuccess, author)
          resolve(author)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createAuthorFailure,
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
