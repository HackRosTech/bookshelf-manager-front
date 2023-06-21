import sectionApi from '@/api/section'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getSectionStart: '[section] Get section start',
    getSectionSuccess: '[section] Get section success',
    getSectionFailure: '[section] Get section failure',

    deleteSectionStart: '[section] Delete Section start',
    deleteSectionSuccess: '[section] Delete Section success',
    deleteSectionFailure: '[section] Delete Section failure'
}

export const actionTypes = {
    getSections: '[section] Get sections',
    getSection: '[section] Get section',
    deleteSection: '[section] Delete section'
}

const mutations = {
    [mutationTypes.getSectionStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getSectionSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getSectionFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.deleteSectionStart]() {},
    [mutationTypes.deleteSectionSuccess]() {},
    [mutationTypes.deleteSectionFailure]() {}
}

const actions = {
    [actionTypes.getSections](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getSectionStart)
            sectionApi
                .sections()
                .then(section => {
                    context.commit(mutationTypes.getSectionSuccess, section.data.sections)
                    resolve(section)
                })
                .catch(() => {
                    context.commit(mutationTypes.getSectionFailure)
                })
        })
    },

    [actionTypes.getSection](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getSectionStart)
            sectionApi
                .getSection(id)
                .then(section => {
                    context.commit(mutationTypes.getSectionSuccess, section.section)
                    resolve(section)
                })
                .catch(() => {
                    context.commit(mutationTypes.getSectionFailure)
                })
        })
    },

    [actionTypes.deleteSection](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteSectionStart)
            sectionApi
                .deleteSection(id)
                .then(() => {
                    context.commit(mutationTypes.deleteSectionSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteSectionFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}

