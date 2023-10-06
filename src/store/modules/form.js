
export default {
  state:{
    isValid: true,
    email: '',
    password: '',
    showLoginForm: true,
    showSignUpForm: true,
    showConfirmEmail: false,
    showChangePassword:false,
    showCheckEmail: false, 
    showSuccessForm: false, 
    show_burger_menu: false, 
    show_side_filter: false, 
    show_find_manager_form: false,
    showSuccessFindManagerForm: false,
    dialogWithCustomer: false, // подставляет в диалоговое окно форму общения с заказчиком
    showProposalSentForm: false, // подставляет в ДА форму proposalSentForm
    showApplicationForm: false, // подставляет в ДА форму ApplicationForm
    validationErrors: null,
    inputDraft: '',
  },
  getters: {
    INPUT_DRAFT(state) {
      return state.inputDraft
    },
    VALIDATION_ERRORS(state){
      return state.validationErrors 
    },
    DIALOG_WITH_CUSTOMER(state){
      return state.dialogWithCustomer 
    },
    SHOW_FIND_MANAGER_FORM(state ){
      return state.show_find_manager_form
    },
    SHOW_PROPOSAL_SENT_FORM(state){
      return state.showProposalSentForm
    },
    SHOW_APPLICATION_FORM(state){
      return state.showApplicationForm
    },
    SHOW_SIDE_FILTER(state) {
      return state.show_side_filter
    },

    SHOW_BURGER_MENU(state) {
      return state.show_burger_menu
    },

    SHOW_SUCCESS_FORM(state) {
      return state.showSuccessForm
    },
    SHOW_LOGIN_FORM(state){
      return state.showLoginForm
    },
    SHOW_SIGNUP_FORM(state){
      return state.showLoginForm
    },
    SHOW_CONFIRM_EMAIL(state){
      return state.showConfirmEmail
    },
    SHOW_CHANGE_PASSWORD(state){
      return state.showChangePassword
    },
    SHOW_CHECK_EMAIL(state){
      return state.showCheckEmail
    },
    SHOW_SUCCESS_FIND_MANAGER_FORM(state) {
      return state.showSuccessFindManagerForm
    },
    IS_VALID(state){
      return state.isValid
    },
    EMAIL(state){
      return state.email
    },
    PASSWORD(state){
      return state.password
    },
    NEW_PASSWORD(state){
      return state.newPassword
    },
  },

  actions: {
    GET_EMAIL({commit}, email){
      commit('SET_EMAIL', email)
    },
    A_CLEAR_FORM(){
      document.querySelector("#login-form").reset()
    }
  },

  mutations: {

    SWITCH_DIALOG_WITH_CUSTOMER(state, status){
      state.dialogWithCustomer = status
    },

    SWITCH_SHOW_PROPOSAL_SENT_FORM(state, status){
      state.showProposalSentForm = status 
    },

    SWITCH_SHOW_APPLICATION_FORM(state, status){
      state.showApplicationForm = status
    }, 

    SET_SHOW_SIDE_FILTER(state, status) {
      state.show_side_filter = status
    },

    SET_SHOW_BURGER_MENU(state, status) {
      state.show_burger_menu = status
    },

    SET_SHOW_SUCCESS_FORM(state, data){
      state.showSuccessForm = data
    },
    
    SET_SHOW_CONFIRM_EMAIL(state, data){
      state.showConfirmEmail = data
   },

   SET_SHOW_CHANGE_PASSWORD(state, data){
      state.showChangePassword = data
   },

   SET_SHOW_FIND_MANAGER_FORM(state, status) {
    state.show_find_manager_form = status
   },

   SET_SHOW_LOGIN_FORM(state, data){
     state.showLoginForm = data
   },

   SET_SHOW_SIGNUP_FORM(state, status){
     state.showLoginForm = status
   },
   
   SET_SHOW_CHECK_EMAIL(state, data){
     state.showCheckEmail = data
   },

   SET_SHOW_SUCCESS_FIND_MANAGER_FORM(state, status) {
    state.showSuccessFindManagerForm = status
   },

    SWITCH_IS_VALID(state, param){
      state.isValid = param
    },
    SET_FORM_DATA(state,formData){
      state.email = formData.email
      state.password = formData.password
    },
    CLEAR_FORM(state){
      state.email = ''
      state.password = ''
      state.isValid = true
    },
    SET_RESET_FORM_STATUS(state){ // cбрасывает настройки до начальных
      state.showLoginForm= true
      state.showSignUpForm= true
      state.showConfirmEmail= false
      state.showChangePassword=false
      state.showCheckEmail= false 
    },

    SET_VALIDATION_ERR(state, err) {
      if(err === 'clear') {
        state.validationErrors = ''
          return 
        } 
      else if(err === 'Incorrect user password' )  state.validationErrors = "Неверный пароль";
      else if(err.includes('already exists') && err.includes("email") )  state.validationErrors = "Пользователь с таким email уже зарегистрирован";
      else if(err.includes('already exists') && err.includes("phone_number") )  state.validationErrors = "Пользователь с таким телефоном уже зарегистрирован";
      else if(err.includes('not found') )  state.validationErrors = "Пользователь с таким email не найден";
      else if(err.includes('Offer already exist') )  state.validationErrors = "Вы уже откликались на эту заявку";
      else if(err.includes('The user is not authorized') ) state.validationErrors = "Пользователь не авторизован в системе";
      else if (err.includes('value is not a valid email address')) state.validationErrors = "Не верно указан Email пользователя"
      else state.validationErrors = "Упс.. Что-то пошло не так...";
      setTimeout(() => {
        state.validationErrors = ''
      }, 5000);
    },

    SET_INPUT_DRAFT(state, value) {
       state.inputDraft = value;
    }
 }
}