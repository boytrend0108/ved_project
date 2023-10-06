import store from "@/store";
const pastImage = (e) => {
  if (e.clipboardData) {
    // получаем все содержимое буфера
    const items = e.clipboardData.items;
    if (items) {
      // находим изображение
      for (let i = 0; i < items.length; i++) {
        if (
          items[i].type.indexOf("image") !== -1 ||
          items[i].type.indexOf("application/msword") !== -1
        ) {
          // представляем изображение в виде файла
          var blob = items[i].getAsFile();
          // создаем временный урл объекта
          var URLObj = window.URL || window.webkitURL;
          var source = URLObj.createObjectURL(blob);
          const ext = blob.name.split(".");
          store.commit("SET_UPLOAD_DATA", {
            href: source,
            id: "chat_file",
            site_role: "customer",
            name: blob.name,
            ext: ext[ext.length - 1],
          });
          store.commit("SET_BINARY_FILE", { files: blob, id: "chat_file" });
          setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
        }
      }
    }
  }
};

export { pastImage };
