import { setItem } from "@/helpers/persistanceStorage";
import axios from "@/api/axios";
import { setDefaultToken } from "@/api/axios";
import router from "@/router";
import startApp from "@/main";
import { connectToCentrifuge } from "@/helpers/centrifugo";
// import { socket } from "@/helpers/centrifugo"
export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    site_role: "",
    userName: "",
    currentUserToken: null,
    currentUserRefreshToken: null,
    isLoggedIn: false,
    userData: {
      email: null,
      phone_number: null,
    },
    socketConnection: false,
    wrongRefeshToken: false,
    refreshCounter: 0,
  },

  getters: {
    WRONG_REFRESH_TOKEN(state) {
      return state.wrongRefeshToken;
    },

    SET_SOCKET_CONNECTION(state) {
      return state.socketConnection;
    },

    USER_DATA(state) {
      return state.userData;
    },

    USER_NAME(state) {
      return state.userName;
    },
    IS_SUBMITTING(state) {
      return state.isSubmitting;
    },
    IS_LOGGED_IN(state) {
      return state.isLoggedIn;
    },

    CURRENT_USER(state) {
      return state.currentUser;
    },
    TOKEN(state) {
      return state.currentUserToken;
    },
    REFRESH_TOKEN(state) {
      return state.currentUserRefreshToken;
    },
    SITE_ROLE(state) {
      return state.site_role;
    },
  },

  actions: {
    REGISTRATION({ commit, dispatch }, credentials) {
      
      commit("SET_USER_DATA", {
        email: credentials.email,
        phone_number: credentials.phone_number,
      });
      const site_role = router.currentRoute._value.path.split("/")[1];
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/${site_role}/signup`,
          data: credentials,
        })
          .then((response) => {
            dispatch("GET_USER_IP");
            resolve(response.data);
          })
          .catch((result) => {
            console.log("result errors", result);
            commit("SET_VALIDATION_ERR", result.response.data.detail);
            reject();
          });
      });
    },

    async LOGIN({ commit }, credentials) {
      commit("SET_USER_DATA", {
        email: credentials.email,
        phone_number: credentials.phone_number,
      });
      const site_role = router.currentRoute._value.path.split("/")[1];
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/${site_role}/signin`,
          data: credentials,
        })
          .then(response => {
            setItem("accessToken", response.data.access_token);
            setItem("refreshToken", response.data.refresh_token);
            commit("SET_REFRESH_TOKEN", response.data.refresh_token);
            commit("SET_WRONG_REFRESH_TOKEN", false);
            setDefaultToken();
            resolve(response.data.access_token);
          })
          .catch(result => {
            console.log(result);
            commit("LOGIN_FILED", result.response.data);
            commit("SET_VALIDATION_ERR", result.response.data.detail);
            reject(result);
          });
      });
    },

    async REFRESH_TOKEN({ commit, state }) {
      // axios.js
      if (state.refreshCounter !== 0) {
        startApp();
        router.push(`/`);
        localStorage.clear();
        commit("SET_REFRESH_COUNTER", 0);
        return;
      }
      if (!JSON.parse(localStorage.getItem("refreshToken"))) return;
      const data = {
        refresh_token: JSON.parse(localStorage.getItem("refreshToken")),
      };
      return new Promise((resolve) => {
        axios({
          method: "post",
          url: `/${this.getters.SITE_ROLE}/refresh`,
          data: data,
        })
          .then((res) => {
            commit("SET_REFRESH_COUNTER", 1);
            commit("SET_WRONG_REFRESH_TOKEN", false);
            setItem("accessToken", res.data.access_token);
            setDefaultToken();
            this.dispatch("ATTEMPT", res.data.access_token).then(() =>
              resolve()
            );
          })
          .catch((err) => {
            commit("SET_REFRESH_COUNTER", 0);
            console.log("Oшибка обновления токена", err);
            commit("SET_WRONG_REFRESH_TOKEN", true);
            commit("SET_USER", null)
            commit("SET_TOKEN", null)
            let site_role = localStorage.getItem("site_role") || "customer";
            router.push(`/${site_role}/signin`);
            resolve();
          });
      });
    },

    async ATTEMPT({ commit, dispatch }, token) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "/user",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            commit("SET_USER", response.data);
            localStorage.setItem("site_role", response.data.site_role);
            commit("SET_TOKEN", token);
            commit("SET_REFRESH_COUNTER", 0);
            commit("SET_WRONG_REFRESH_TOKEN", false);
            commit(
              "SET_REFRESH_TOKEN",
              JSON.parse(localStorage.getItem("refreshToken"))
            );
          })
          .then(() => dispatch("CONNECT_TO_CENTRIFUGO"))
          .then(() => connectToCentrifuge())
          .then(() => {
            dispatch("GET_COMPANY_FROM_SERVER"); // надо сделать одну функцию для получения всех данных
            dispatch("GET_AVATAR_FROM_SERVER").then(() => resolve());
          })
          .catch((err) => {
            console.log(err);
            commit("SET_USER", null);
            commit("SET_TOKEN", null);
            // commit("SET_REFRESH_TOKEN", null)
            this.dispatch("REFRESH_TOKEN").then(() => reject());
          });
      });
    },

    async VERIFY_EMAIL(_, token) {
      const site_role = router.currentRoute._value.path.split("/")[1];
      await axios({
        method: "post",
        url: `/${site_role}/verify-email`,
        params: { token },
      }).catch((err) => console.log(err));
    },

    async SEND_EMAIL_AGAIN() {
      const site_role = router.currentRoute._value.path.split("/")[1];
      const registration_email = this.getters.EMAIL;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${site_role}/+verify-email/send-code/${registration_email}`,
        })
          .then(() => {
            this.commit("SET_SHOW_CONFIRM_EMAIL", true);
            this.commit("SET_SHOW_CHANGE_PASSWORD", false);
            this.commit("SET_SHOW_CHECK_EMAIL", true);
            this.commit("SET_SEND_SECOND_EMAIL", true);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            this.commit("SET_VALIDATION_ERR", err.response.data.detail);
            reject();
          });
      });
    },

    async LOGOUT({ commit, state }) {
      try {
        await axios({
          method: "post",
          url: "/logout",
          data: { refresh_token: state.currentUserRefreshToken },
        }).then(() => {
          const lastOffer = localStorage.getItem("lastOffer") || null;
          const unwatcheOffers = JSON.parse(localStorage.getItem("unwatched_offers")) || [];
          const unreadMessages = JSON.parse(localStorage.getItem("unreadMessages")) || [];
          localStorage.clear();
          localStorage.setItem("lastOffer", lastOffer);
          localStorage.setItem("unwatched_offers", JSON.stringify(unwatcheOffers));
          localStorage.setItem("unwatched_offers", JSON.stringify(unwatcheOffers));
          localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
          this.commit("SET_IS_APPLICATION_COMPLETE", false);
          commit("SET_USER", null);
          commit("SET_TOKEN", null);
          commit("SET_REFRESH_TOKEN", null);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  mutations: {
    SET_SITE_ROLE(state, site_role) {
      state.site_role = site_role
    },

    SET_REFRESH_COUNTER(state, number) {
      state.refreshCounter = number;
    },

    SET_WRONG_REFRESH_TOKEN(state, status) {
      state.wrongRefeshToken = status;
    },

    SET_SOCKET_CONNECTION(state, status) {
      state.socketConnection = status;
    },

    SET_USER_DATA(state, userData) {
      state.userData = userData;
    },

    REGISTER_SUCCESS(state, payload) {
      state.isSubmitting = false;
      state.currentUserToken = payload;
      state.isLoggedIn = true;
    },

    LOGIN_START(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },

    LOGIN_SUCCESS(state, payload) {
      state.isSubmitting = false; 
      state.currentUserToken = payload;
      state.isLoggedIn = true;
    },

    LOGIN_FILED(state) {
      state.isSubmitting = false;
    },

    SET_USER(state, user) {
      state.currentUser = user;
      //получаем имя
      if (state.currentUser) {
        const userFullName = state.currentUser.full_name;
        const correctUserFullName = userFullName.replace(/ +/g, " ").trim();
        const userName =
          correctUserFullName.split(" ")[0] +
          " " +
          correctUserFullName.split(" ")[1];
        state.userName = userName;
        state.site_role = user.site_role;
      } else state.site_role = localStorage.getItem("site_role");
    },

    SET_TOKEN(state, token) {
      state.currentUserToken = token;
      setTimeout(() => {
        if (!token) return;
        this.dispatch("REFRESH_TOKEN");
      }, 3000000);
    },

    SET_REFRESH_TOKEN(state, token) {
      state.currentUserRefreshToken = token;
    },
  },
};
