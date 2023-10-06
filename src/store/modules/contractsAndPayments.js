import axios from "@/api/axios.js"
import { fileFormatValidaton } from "@/helpers/validation"

export default {
  state: {
    wrong_file: {
      file: "",
      document_id: "",
    }, 
    wrong_file_img: "",
    wrong_chat_file: "",
    invoice_id: null,
    docs: {
      receipt_of_payment: {
        // платежка заказчика
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        name: "",
        file: "",
        href: "",
      },

      provider_invoice: [
        {
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          name: "",
          file: "",
          href: "",
        },
      ],

      provider_invoice_check: [], // выставленные счета и платежки по ним

      order_invoice: {
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        name: "",
        file: "",
        href: "",
      },

      order_packing_list: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      customs_completion_certificate: {
        // заявка на перевозку
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      customs_customs_clearance: {
        //договор на таможенное оформление
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      factory_contract: {
        // договор с фабрикой поставщиком
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      logistics_contract: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      logistics_transportation_request: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      logistics_completion_certificate: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      factory_invoice: {
        // платежка на фабрику
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      images: {
        files: [], // foto товара в формате Base64
        binaryFile: [], // файл из инпута формата File(binary) для отравки на сервер
        href: [],
        name: [],
      },

      askQuestionInput: {
        file: "",
        name: "",
      },

      upload_user_pic: {
        // avaтар
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      chat_file: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      customs_additional_agreement: {
        name: "",
        file: "",
        binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      },

      templates: {
        customs_additional_agreement: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        customs_customs_clearance: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        customs_completion_certificate: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_contract: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_transportation_request: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_completion_certificate: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
      },

      completed_docs: {
        customs_additional_agreement: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        customs_customs_clearance: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        customs_completion_certificate: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_contract: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_transportation_request: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
        logistics_completion_certificate: {
          name: "",
          file: "",
          binaryFile: null, // файл из инпута формата File(binary) для отравки на сервер
          href: "",
        },
      },
    },
  },
  //------------------------------------------------------------------------------

  getters: {
    INVOICE_ID(state) {
      return state.invoice_id;
    },
    DOCS(state) {
      return state.docs;
    },

    WRONG_FILE(state) {
      return state.wrong_file;
    },

    WRONG_FILE_IMG(state) {
      return state.wrong_file_img;
    },

    WRONG_CHAT_FILE(state) {
      return state.wrong_chat_file;
    },
  },

  actions: {
    async UPLOAD_DOCS({ commit }, event) {
      // загрузка фото или документов пользователя
      return new Promise((resolve, reject) => {
        if (!event.target.files?.length && !event.dataTransfer.files?.length) return;
        let id = event.target.id || event.currentTarget.dataset.id;
        if (id === "upload-user-pic-mobile" || id === "takePictureField")
          id = "upload-user-pic";
        const files = event.target.files 
         ? Array.from(event.target.files) 
         : Array.from(event.dataTransfer.files);
        const file_format = fileFormatValidaton(files, id);
        if (file_format) {
          event.target.value = ""; // обнуляем инпут value
          if (id === "images" || id === "chat_file") {
            files.forEach((file) => {
              commit("SET_BINARY_FILE", { files: file, id }); // подготавливаем для отправки на сервер
            });
          } else {
            commit("SET_BINARY_FILE", { files, id }); // подготавливаем для отправки на сервер
          }

          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (id === "images" || id === "chat_file") {
                commit("SET_IMAGE", { file: reader.result, type: "add" }); // подготавливаем для отрисовки на фронте
                commit("SET_UPLOAD_DATA", {
                  file: reader.result,
                  name: file.name,
                  id,
                });
                resolve();
              } else {
                // подготавливаем для отрисовки на фронте
                commit("SET_UPLOAD_DATA", {
                  file: reader.result,
                  name: file.name,
                  id,
                });
                resolve();
              }
            };
            reader.readAsDataURL(file); // async!!!
          });
        } else reject();
      });
    },

    async UPLOAD_BILL({ commit }, event) {
      // счетов заказчика
      return new Promise((resolve) => {
        if (!event.target.files.length) {
          return;
        }
        let id = event.target.id;
        const files = Array.from(event.target.files);
        const file_format = fileFormatValidaton(files, id);
        if (file_format) {
          event.target.value = ""; // обнуляем инпут value
          files.forEach((file) => {
            commit("SET_BILL_BINARY_FILE", { files: file }); // подготавливаем для отправки на сервер
          });

          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              // подготавливаем для отрисовки на фронте
              commit("SET_UPLOAD_DATA_BILL", { file: reader.result });
              resolve();
            };
            reader.readAsDataURL(file); // async!!!
          });
        }
      });
    },

    async UPLOAD_BILL_OR_CHECK(
      { dispatch },
      { event, type, order_id, invoice_id }
    ) {
      // счетов заказчика
      return new Promise((resolve, reject) => {
        if (!event.target.files?.length && !event.dataTransfer.files?.length) {
          return;
        }
        let id = event.target.id || event.target.dataset.id;
        const files = Array.from(event.target.files || event.dataTransfer.files );
        const file_format = fileFormatValidaton(files, id, invoice_id);
        if (file_format) {
          event.target.value = ""; // обнуляем инпут value
          files.forEach((file) => {
            resolve(
              dispatch("UPLOAD_BILL_OR_CHECK_TO_SERVER", {
                file,
                type,
                order_id,
                invoice_id,
              })
            );
          });
        } else reject();
      });
    },

    async UPLOAD_DOCS_DRAG({ commit }, event) {
      // загрузка фото или документов пользователя
      return new Promise((resolve) => {
        if (!event.dataTransfer.files.length) {
          return;
        }
        let id = event.target.id || event.currentTarget.dataset.id  
        const files = [...event.dataTransfer.files];
        const file_format = fileFormatValidaton(files, id);
        if (file_format) {
          event.target.value = ""; // обнуляем инпут value

          files.forEach((file) => {
            commit("SET_BINARY_FILE", { files: file, id }); // подготавливаем для отправки на сервер
          });

          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (id === "images" || id === "chat_file") {
                commit("SET_IMAGE", { file: reader.result, type: "add" }); // подготавливаем для отрисовки на фронте
                commit("SET_UPLOAD_DATA", {
                  file: reader.result,
                  name: file.name,
                  id,
                });
              } else {
                // подготавливаем для отрисовки на фронте
                commit("SET_UPLOAD_DATA", {
                  file: reader.result,
                  name: file.name,
                  id,
                });
                resolve();
              }
            };
            reader.readAsDataURL(file); // async!!!
          });
        }
      });
    },

    async UPLOAD_FILE_TO_SERVER({ commit, state }, { orderId, inputId }) {
      const id = inputId.replaceAll("-", "_");
      const binaryFiles = [state.docs[id].binaryFile];
      const files = new FormData();
      binaryFiles.forEach((el) => {
        files.append("files", el);
      });

      await axios({
        method: "post",
        url: `documents/order/${orderId}/${id}/upload`,
        data: files,
      })
        .then(() => {
          commit("SET_VALIDATION_ERR", "");
        })
        .catch((err) => {
          commit("SET_VALIDATION_ERR", `Oшибка загрузки ${inputId} на сервер`);
          console.log(`Ошибка загрузки ${inputId} на сервер`, err);
        });
    },

    async UPLOAD_BILL_OR_CHECK_TO_SERVER(
      { dispatch },
      { order_id, type, file, invoice_id }
    ) {
      const data = new FormData();
      const object = { note: "string" };
      data.append("file", file);
      data.append("data", JSON.stringify(object));
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/documents/order/${order_id}/invoice/${type}/upload`,
          params: { invoice_id },
          data: data,
        })
          .then(() => resolve(dispatch("GET_BILLS_FROM_SERVER", order_id)))
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    async GET_BILLS_FROM_SERVER({ commit }, order_id) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `/documents/order/${order_id}/invoice/invoice/download`,
        })
          .then((res) => resolve(commit("SET_BILLS_AND_CHECKS", res.data)))
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    async DELETE_BILL_FROM_SERVER({ dispatch }, { order_id, invoice_id }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/documents/order/${order_id}/invoice/invoice/delete`,
          params: { invoice_id },
        })
          .then(() => resolve(dispatch("GET_BILLS_FROM_SERVER", order_id)))
          .catch((err) => reject(console.log(err)));
      });
    },

    async UPDATE_IMAGES({ commit, state }, orderId) {
      const images = new FormData();
      const imagesArr = [];

      state.docs.images.href.forEach((el) => {
        let blob = new Blob([el]);
        imagesArr.push(blob);
      });

      state.docs.images.binaryFile.forEach((el) => {
        imagesArr.push(el);
      });

      imagesArr.forEach((el) => {
        images.append("files", el);
      });

      await axios({
        method: "post",
        url: `documents/order/${orderId}/image/upload`,
        data: images,
      })
        .then(() => {
          commit("SET_VALIDATION_ERR", "");
        })
        .catch((err) => {
          commit("SET_VALIDATION_ERR", `Oшибка загрузки фото на сервер`);
          console.log(`Ошибка загрузки фото на сервер`, err);
        });
    },

    async GET_FILE_FROM_SERVER({ commit }, { orderId, inputId, site_role }) {
      if (!orderId) return
      if (inputId === "invoice") inputId = "order_invoice";
      const file_type = inputId.replaceAll("-", "_");
      await axios({
        method: "get",
        url: `/documents/order/${orderId}/${file_type}/download`,
        params: { role: site_role },
      })
        .then((res) => {
          debugger
          const ext = res.data.split(".").pop();
          const name = res.data.split("/").pop();
          let href = "http://docs.google.com/viewer?url=https://static.delegat.online/" + res.data;

          commit("SET_HREF_FILE", { href, id: inputId, ext, name, site_role });
          commit("SET_URL", { url: href, id: inputId, ext, name, site_role });
        })
        .catch((err) => console.log(err));
    },

    async GET_IMAGE_FROM_SERVER({ commit }, { orderId, size }) {
      return await axios({
        method: "get",
        url: `/documents/order/${orderId}/images/${size}/download`,
      })
        .then((res) => {
          res.data.forEach((el) => {
            const href = `https://static.delegat.online/${el}`;
            commit("SET_HREF_FILE", { href: href, id: "images" });
          });
        })
        .catch(() => console.log("Фото не найдено"));
    },

    async GET_DOCS_TEMPLATES({ commit }, { doc_name, order_id }) {
      await axios({
        method: "get",
        url: `/templates/${doc_name}/`,
        params: { order_id },
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + this.getters.TOKEN,
        },
      })
        .then((res) => {
          const ext = res.headers["content-disposition"].split(".")[1];
          const name = res.headers["content-disposition"].split("=")[1];
          const href = URL.createObjectURL(res.data);
          commit("SET_DOCS_TEMPLATES", { href, name, ext });
        })
        .catch((err) => { 
          console.log(`Ошибка при загрузке документа ${doc_name}`, err);
        });
    },

    async SAVE_IMAGE_AS_FILE(_, url) {
      await axios({
        method: "get",
        url: url,
        responseType: "blob",
      }).catch((err) => console.log(err));
    },

    async UPLOAD_PROVIDER_INVOICE(_, order_id) {
      // !!!! ПОДСТАВИТЬ ДАННЫЕ В payload !!!!
      const payload = new FormData();
      payload.append("file", this.getters.DOCS.provider_invoice.binaryFile);
      payload.append("data", "Поставить данные!!!!!");
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/documents/order/${order_id}/invoice/bill/upload`,
          data: payload,
        })
          .then(() => resolve())
          .catch((err) => {
            console.log("Oшибка загрузки на сервер счета исполнителя", err);
            reject();
          });
      });
    },
  },

  mutations: {
    SET_INVOICE_ID(state, id) {
      state.invoice_id = id;
    },

    SET_DOCS_TEMPLATES(state, payload) {
      const doc_name = payload.name.replace(/-/g, "_").split(".")[0];
      state.docs.templates[doc_name].href = payload.href;
      state.docs.templates[doc_name].name = payload.name;
      state.docs.templates[doc_name].ext = payload.ext;
    },

    SET_UPLOAD_DATA(state, { file, name, href, id, url }) {
      const site_role = this.getters.SITE_ROLE
        ? this.getters.SITE_ROLE
        : "customer";
      let newId = id.replace(/-/g, "_");
      if (id === "invoice") newId = `${site_role}_invoice`;
      if (
        newId === "customs_additional_agreement" ||
        newId === "customs_customs_clearance" ||
        newId === "invoice"
      ) {
        state.docs[newId].name = name;
        state.docs[newId].file = file;
        state.docs[newId].href = href;
        state.docs[newId].url = url;
      } else if (id === "chat_file") {
        state.docs.images.name.push(name);
        if (href) state.docs.images.files.push(href);
      } else if (id === "images") return;
      else {
        state.docs[newId].name = name;
        state.docs[newId].file = file;
        state.docs[newId].href = href;
        state.docs[newId].url = url;
      }
    },

    SET_UPLOAD_DATA_BILL(state, { file }) {
      const id = state.docs.provider_invoice.length - 1;
      state.docs.provider_invoice[id].file = file;
    },

    SET_IMAGE(state, { file, type }) {
      debugger
      if (type === "add") {
        state.docs.images.files.push(file);
      } else {
        state.docs.images.files.splice(file.value, 1);
        state.docs.images.binaryFile.splice(file.value, 1);
        state.docs.images.name.splice(file.value, 1);
        state.docs.images.href.splice(file.value, 1);
      }
    },

    SET_BINARY_FILE(state, { files, id }) {
      debugger
      let newId = id.replace(/-/g, "_"); // заменяем - на _
      const site_role = this.getters.SITE_ROLE
        ? this.getters.SITE_ROLE
        : "customer";
      if (id === "invoice") newId = `${site_role}_invoice`;
      if (id === "images" || id === "chat_file") {
        state.docs.images.binaryFile.push(files);
      } else {
        if (
          newId == "customs_additional_agreement" || 
          newId === "customs_customs_clearance"
        ) {
          if(Array.isArray(files)) state.docs[newId].binaryFile = files[0];
          else state.docs[newId].binaryFile = files;
        } else {
          if (Array.isArray(files)) state.docs[newId].binaryFile = files[0];
            else state.docs[newId].binaryFile = files;
          
        }
      }
    },

    SET_BILL_BINARY_FILE(state, file) {
      const invoice = {
        name: file.files.name,
        file: "",
        binaryFile: file.files, // файл из инпута формата File(binary) для отравки на сервер
        href: "",
      };
      if (!state.docs.provider_invoice[0].name) {
        state.docs.provider_invoice[0] = invoice;
      } else state.docs.provider_invoice.push(invoice);
    },

    SET_BILLS_AND_CHECKS(state, data) {
      state.docs.provider_invoice_check = data.sort((a, b) => {
        return a.id - b.id;
      });
    },

    DELETE_BILL(state, id) {
      if (this.getters.SITE_ROLE === "provider") {
        state.docs.provider_invoice_check.splice(id, 1);
      } else {
        state.docs.provider_invoice_check[id].check_path = "";
      }
    },

    SET_HREF_FILE(state, { href, ext, id, name, site_role }) {
      // переделать логику
      const newId = id.replace(/-/g, "_"); // заменяем - на _
      if (site_role === "template") {
        state.docs.templates[id].href = href;
        state.docs.templates[id].ext = ext;
        state.docs.templates[id].name = name;
        return;
      }

      switch (id) {
        case "images":
          state.docs.images.href.push(href);
          break;
        case "chat_file":
          state.docs.images.href.push(href);
          state.docs.images.name.push(name);
          break;
        case "avatar":
          state.docs.upload_user_pic.href = href;
          break;
        case "clear":
          state.docs.images.href = [];
          break;
        default:
          if (
            (site_role === "customer" &&
              this.getters.SITE_ROLE === "provider") ||
            (site_role === "provider" && this.getters.SITE_ROLE === "customer")
          ) {
            state.docs.completed_docs[newId].href = href;
            state.docs.completed_docs[newId].ext = ext;
            state.docs.completed_docs[newId].name = name;
            return;
          }
          state.docs[newId].href = href;
          state.docs[newId].ext = ext;
          state.docs[newId].name = name;
      }
    },

    SET_URL(state, { url, id }) {
      const newId = id.replace(/-/g, "_"); // заменяем - на _
      switch (id) {
        case "customs_additional_agreement":
          state.docs[newId].url = url;
          break;
        case "customs_customs_clearance":
          state.docs[newId].url = url;
          break;
        case "invoice":
          state.docs[newId].url = url;
          break;
        default:
          state.docs[newId].url = url;
      }
    },

    SET_WRONG_FILE_IMG(state, file) {
      state.wrong_file_img = file;
      setTimeout(() => {
        state.wrong_file_img = "";
      }, 3000);
    },

    SET_WRONG_FILE(state, { file, document_id, invoice_id }) {
      if (invoice_id) {
        state.wrong_file.document_id = document_id + invoice_id;
      } else state.wrong_file.document_id = document_id;
      state.wrong_file.file = file;
      setTimeout(() => {
        state.wrong_file.file = "";
        state.wrong_file.document_id = "";
      }, 3000);
    },

    SET_WRONG_CHAT_FILE(state, file) {
      state.wrong_chat_file = file;
      setTimeout(() => {
        state.wrong_chat_file = "";
      }, 3000);
    },

    SET_CLEAR_INVOICE_AND_PLIST(state) {
      state.docs.order_invoice = {
        binaryFile: null,
        name: "",
        file: "",
        href: "",
        url: "",
      };

      state.docs.order_packing_list = {
        binaryFile: null,
        name: "",
        file: "",
        href: "",
        url: "",
      };

      state.docs.images = {
        files: [],
        binaryFile: [],
        href: [],
        name: [],
      };
    },

    SET_CLEAR_IMG(state) {
      state.docs.images.files = [];
      state.docs.images.binaryFile = [];
      state.docs.images.href = [];
      state.docs.images.name = [];
    },

    SET_CLEAR_COMPLETED_DOCS_AND_TEMPLATES(state) {
      for(const el in state.docs.completed_docs) {
        for (const key in  state.docs.completed_docs[el]) {
          state.docs.completed_docs[el][key] = "";
        }
      }

      for(const el in state.docs.templates) {
        for (const key in  state.docs.templates[el]) {
          state.docs.templates[el][key] = "";
        }
      }
    },

    SET_CLEAR_DOCS(state) {
      for (let el in state.docs) {
        switch(el) {
          case "images":
            this.commit("SET_CLEAR_IMG");
            break

          case "completed_docs":
          case "templates":
            this.commit("SET_CLEAR_COMPLETED_DOCS_AND_TEMPLATES")
            break;

          case "provider_invoice_check":
            state.docs.provider_invoice_check = [];
            break

          case "provider_invoice":
            state.docs.provider_invoice = [];
            break

          default: 
            for (let key in state.docs[el]) {
              state.docs[el][key] = "";
            }
        }
      }
    },
  },

};


