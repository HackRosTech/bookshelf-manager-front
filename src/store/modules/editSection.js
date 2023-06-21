import sectionApi from '@/api/section'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  section: null
}

export const mutationTypes = {
  updateSectionStart: '[editSection] Update section start',
  updateSectionSuccess: '[editSection] Update section success',
  updateSectionFailure: '[editSection] Update section failure',

  getSectionStart: '[editSection] Get section start',
  getSectionSuccess: '[editSection] Get section success',
  getSectionFailure: '[editSection] Get section failure'
}

export const actionTypes = {
  updateSection: '[editSection] Create section',
  getSection: '[editSection] Get section'
}

const mutations = {
  [mutationTypes.updateSectionStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateSectionSuccess](state) {
    state.isSubmitting = false
    state.section = null
  },
  [mutationTypes.updateSectionFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getSectionStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getSectionSuccess](state, payload) {
    state.isLoading = false
    state.section = payload
  },
  [mutationTypes.getSectionFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateSection](context, {id, sectionInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateSectionStart)
      sectionApi
        .updateSection(id, sectionInput)
        .then(section => {
          context.commit(mutationTypes.updateSectionSuccess, section)
          resolve(section)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateSectionFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getSection](context, {id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getSectionStart)
      sectionApi
        .getEditSection(id)
        .then(section => {
          context.commit(mutationTypes.getSectionSuccess, section)
          resolve(section)
        })
        .catch(() => {
          context.commit(mutationTypes.getSectionFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
