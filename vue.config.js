const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/utils/variables.scss";
                         @import "@/assets/styles/utils/mixins/mixins.scss";
                         @import "@/assets/styles/utils/mixins/msg_mixins.scss";
                         @import "@/assets/styles/utils/mixins/flags.scss";
                         @import "@/assets/styles/utils/mixins/buttons.scss";
                         @import "normalize-scss/sass/normalize/import-now";`
      }
    }
  },
})
