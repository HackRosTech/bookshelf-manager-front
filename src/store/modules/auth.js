import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null
}

export const actionTypes = {
  register: '[auth] Register',
  login: '[auth] Login',
  getCurrentUser: '[auth] Get current user',
  updateCurrentUser: '[auth] Update current user',
  logout: '[auth] logout'
}
export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',

  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure',

  getCurrentUserStart: '[auth] Get current user start',
  getCurrentUserSuccess: '[auth] Get current user success',
  getCurrentUserFailure: '[auth] Get current user failure',

  updateCurrentUserStart: '[auth] Update current user start',
  updateCurrentUserSuccess: '[auth] Update current user success',
  updateCurrentUserFailure: '[auth] Update current user failure',

  logout: '[auth] logout'
}



const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    console.log(payload)
    state.isLoading = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFailure]() {},
  [mutationTypes.logout]() {
    state.currentUser = null
    state.isLoggedIn = false
  }
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  getUserRole: state => {
    return state.currentUser
  }
}


const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user)
          setItem('accessToken', response.data.access_token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
          .getCurrentUser()
          .then(response => {
            context.commit(
                mutationTypes.getCurrentUserSuccess,
                response.data
            )
            resolve(response.data.user)
          })
          .catch(() => {
            context.commit(mutationTypes.getCurrentUserFailure)
          })
    })
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
