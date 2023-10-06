import store from "@/store";
import {
  ID_NUM_VALIDATION,
  ID_PHONE_VALIDATION,
  ALLOWED_FILE_FORMATS,
} from "@/constants/validationConst";
import { REGEXP_NUMBER, REGEXP_PHONE_NUMBER, REGEXP_EMAIL} from "@/constants/regExp";


export const numValidation = event => {
  
  if (!ID_NUM_VALIDATION.includes(event.target.id)) return "";
  if (event.target.value === '') {
    store.commit("SET_INPUT_VALIDATION_ERR", false);
    return;
  }
  
  if (!REGEXP_NUMBER.test(event.target.value)) {
    event.target.classList.add("invalid");
    store.commit("SET_INPUT_VALIDATION_ERR", true);
    return "Поле должно содержать только цифры";
  } 

  event.target.classList.remove("invalid");
  store.commit("SET_INPUT_VALIDATION_ERR", false);
  return "";
  
}; 

export const phoneValidation = event => {

  if (!ID_PHONE_VALIDATION.includes(event.target.id)) return;

  if (!REGEXP_PHONE_NUMBER.test(event.target.value)) { 
    event.target.classList.add("invalid")
    return "Неверный формат телефонного номера (пример: +7(123)1110022)"
  } 

  event.target.classList.remove("invalid")
  return ""

}

export const emailValidation = event => {
  if (event.target.id === "email" || event.target.id === "agent_email") {
    if (!REGEXP_EMAIL.test(event.target.value)) {
      event.target.classList.add("invalid")
      return "Наверный формат email"
    } else {
      event.target.classList.remove("invalid")
      return ""
    }
  }
}

export const fioValidation = (event) => {
  const fio_reg = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]/
  if (!fio_reg.test(event.target.value)) {
    event.target.classList.add("invalid")
    return "Наверный формат ФИО (пример: Иванов Иван Иванович )"
  } else {
    event.target.classList.remove("invalid")
    return ""
  }
}

export const fileFormatValidaton = (files, id, invoice_id) => {
  const document_id = id
  store.commit("SET_WRONG_FILE", {file:"", document_id:""})
  store.commit("SET_WRONG_FILE_IMG", "")
  store.commit("SET_WRONG_CHAT_FILE", "")
  if(id === "upload-user-pic") id = "images"
  if(id !== "images" && id !== "chat_file") id = "file" 
  let file_format;
 
  switch(id) {
    case "images" :
      files.forEach(file => {
        if(file.type === "image/png" || file.type === "image/jpeg") { 
            file_format = true
          } else { 
            store.commit("SET_WRONG_FILE_IMG", file.name)
            file_format = false 
        } 
      });
      break
     
    case "file" :
      if( ALLOWED_FILE_FORMATS.includes(files[0].type)) return true
      store.commit("SET_WRONG_FILE",{file:files[0].name, document_id, invoice_id})
      return false

    case "chat_file" :
      return true 
    
  }
  return file_format
}

export const registrationFormValidation = event => {
  const valid = () => {
    if (this.isValid.samePassword && 
      this.isValid.name && 
      this.isValid.email && 
      this.isValid.phone &&
      this.isValid.password_1 === true) {
      this.isBtnEnable = true
      btn.removeAttribute("disabled")
    }
  }
  event.target.classList.add("invalid")
  const btn = document.querySelector(".btn")
  btn.setAttribute("disabled", "disabled")
  this.isBtnEnable = false

  const targetId = event.target.id
  
  if (event.target.id === "password_2") {
    if (this.value.password_1 === this.value.password_2) {
      event.target.classList.remove("invalid")
      this.isValid.samePassword = true
      valid()
    } else {
      this.isValid.samePassword = false
    }
  } else if(this.regExp[targetId].test(this.value[targetId])) {
    this.isValid[targetId] = true
    event.target.classList.remove("invalid")
    valid()
  } else {
    this.isValid[targetId] = false
  }

}

export const currencyTypeValidation = () => {
  const currency_type = store.getters.BANK[0].ras_schet.slice(5, 8);
  if (currency_type !== "810") return false;
  return true;
};

export const  passwordValidationMsg = ctx => {
  if (!ctx.value.password_1.length) return ''

  if (ctx.value.password_1.length < 8 || ctx.value.password_1.length > 20) {
    return "Длина пароля должна быть от 8 до 20 символов"
  }

  if (!/(?=.*[a-z])/.test(ctx.value.password_1)) {
    return "Добавьте лaтинские буквы"
  }

  if (!/(?=.*[A-Z])/.test(ctx.value.password_1)) {
    return "Добавьте заглавные латинские буквы"
  }

  if (!/(?=.*[0-9])/.test(ctx.value.password_1)) {
    return "Добавьте цифры"
  }

  if (!/(?=.*[!@#$%^&*])/.test(ctx.value.password_1)) {
    return "Добавьте символы !@#$%^&*"
  }

  return ''
}

export const comparePassword = ctx => {
  if (!ctx.value.password_1.length || !ctx.value.password_2.length) return 

  if (ctx.value.password_1 !== ctx.value.password_2) {
    document.querySelector('#password_2').classList.add('invalid')
    ctx.comparePasswordMsg = true;
    ctx.isValid.samePassword = false;
    return
  }

  document.querySelector('#password_2').classList.remove('invalid')
  ctx.comparePasswordMsg = false;
  ctx.isValid.samePassword = true;
}