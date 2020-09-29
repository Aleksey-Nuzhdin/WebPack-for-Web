export default{
  state:{
    messege: 'Hello from Vuex'
  },
  mutations:{},
  actions:{},
  getters:{
    getMessage(state){
      return state.messege
    }
  },
}