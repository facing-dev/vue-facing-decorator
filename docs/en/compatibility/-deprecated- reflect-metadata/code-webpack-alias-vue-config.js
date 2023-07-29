module.exports = {
    //...
    chainWebpack: config => {
        //...
        config.resolve.alias.set('vue-facing-decorator', 'vue-facing-decorator/dist/index-return-cons')
    }
}