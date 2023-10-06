import store from '@/store';
import router from "@/router"
import axios from 'axios';

axios.defaults.baseURL = 'https://api.delegat.online'

export function setDefaultToken() {
  axios.defaults.headers.common['Authorization'] 
  = 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'));
}

setDefaultToken()

  // eslint-disable-next-line
  export function setDefaultHeader(){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'));
 }
 
// Добавляем перехват ответов
let refresh = false
axios.interceptors.response.use(function (response) {
  // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
  // Здесь можете сделать что-нибудь с ответом
  return response;
}, function (error) {
  // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
  // Здесь можете сделать что-то с ошибкой ответа
if (error.message === 'Network Error'&& !refresh){
    refresh = true
    console.log("axios interceptors logout ERROR500")
    store.commit("SET_INPUT_VALIDATION_ERR", "Упс.., серверная ошибка")
  }
  if (error.response.status == 401 && !refresh) {
    refresh = true
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    console.log("axios interceptors logout ERROR401")
    router.push(`/${store.getters.SITE_ROLE}/signin`)
  }
 
  refresh = false
  return Promise.reject(error);
});


export default axios