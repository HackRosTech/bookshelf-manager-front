import sectionApi from '@/api/section'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createSectionStart: '[createSection] Create section start',
  createSectionSuccess: '[createSection] Create section success',
  createSectionFailure: '[createSection] Create section failure'
}

export const actionTypes = {
  createSection: '[createSection] Create section'
}

const mutations = {
  [mutationTypes.createSectionStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createSectionSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createSectionFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createSection](context, {sectionInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createSectionStart)
      sectionApi
        .createSection(sectionInput)
        .then(section => {
          context.commit(mutationTypes.createSectionSuccess, section)
          resolve(section)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createSectionFailure,
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
