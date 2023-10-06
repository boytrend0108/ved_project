
export default {
  state:{
    activeModule:'application',
    showSelectCompanyModule:true,
    inputId:'',  
  }, 

  getters: {
  
    ACTIVE_MODULE(state){
      return state.activeModule
    },   
    SHOW_SELECT_COMPANY_MODULE(state){ // возможно не нужен т.к. дублирует activeModule
      return state.showSelectCompanyModule
    },
    
  },

  actions: {
    async SEND_QUESTION_TO_SUPPORT(_, question){
      console.log(question, 'сделать функцию для отправки сообщения')
    }
  },

  mutations: {
    SET_ASK_QUESTION_INPUT(state,input){
      state.askQuestionInput = input 
    },
    SET_INPUT_ID(state, value) {
      state.inputId = value
    },
    SET_SHOW_SELECT_COMPANY_MODULE(state) {
      state.showSelectCompanyModule = !state.showSelectCompanyModule
    },
  
    SET_ACTIVE_MODULE(state, id){
      state.activeModule = id
    }
  }
}