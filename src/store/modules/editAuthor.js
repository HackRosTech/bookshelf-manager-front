import authorApi from '@/api/author'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  author: null
}

export const mutationTypes = {
  updateAuthorStart: '[editAuthor] Update author start',
  updateAuthorSuccess: '[editAuthor] Update author success',
  updateAuthorFailure: '[editAuthor] Update author failure',

  getAuthorStart: '[editAuthor] Get author start',
  getAuthorSuccess: '[editAuthor] Get author success',
  getAuthorFailure: '[editAuthor] Get author failure'
}

export const actionTypes = {
  updateAuthor: '[editAuthor] Create author',
  getAuthor: '[getAuthor] Get author'
}

const mutations = {
  [mutationTypes.updateAuthorStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateAuthorSuccess](state) {
    state.isSubmitting = false
    state.author = null
  },
  [mutationTypes.updateAuthorFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getAuthorStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getAuthorSuccess](state, payload) {
    state.isLoading = false
    console.log(payload)
    state.author = payload
  },
  [mutationTypes.getAuthorFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateAuthor](context, {id, authorInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateAuthorStart)
      authorApi
        .updateAuthor(id, authorInput)
        .then(author => {
          context.commit(mutationTypes.updateAuthorSuccess, author)
          resolve(author)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateAuthorFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getAuthor](context, {id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getAuthorStart)
      authorApi
        .getEditAuthor(id)
        .then(author => {
          context.commit(mutationTypes.getAuthorSuccess, author)
          resolve(author)
        })
        .catch(() => {
          context.commit(mutationTypes.getAuthorFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
