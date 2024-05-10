<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-button @click="actioncc">Get CC</el-button>
  </div>
</template>

<script>
  // import HelloWorld from "./components/HelloWorld.vue"

  export default {
    name: "App",
    // components: {
    //   HelloWorld,
    // },
    methods: {
      actioncc() {
        console.log("actioncc", this)
        const params = {
          containerConfig: {
            conType: "popUp",
            comClass: { other: true },
            comProps: { title: "other" },
            comRef: "containerRef",
            context: this,
          },
          // src\views\onlineDev\webDesign\index.vue
          // views/basic/dynamicModel/list/index
          componentConfig: {
            isDev: true,
            comRoute: "components/HelloWorld",
            comClass: { channel: true },
            comProps: { other: "channel", modelId: "547062297219039429" },
            comRef: "componentRef",
          },
        }
        console.log(
          "%c [ params ]-80",
          "font-size:13px; background:#4e3674; color:#927ab8;",
          params
        )
        const initCustomComponent = new this.cc(params)
        // setTimeout(() => {
        //   initCustomComponent.containerVisible = true;
        // }, 3000);
        console.log(
          "%c [ initCustomComponent ]-1175",
          "font-size:13px; background:#7419fc; color:#b85dff;",
          initCustomComponent
        )
      },
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    /* text-align: center; */
    /* color: #2c3e50; */
    /* margin-top: 60px; */
    background-color: #ccc;
    /* display: flex; */
    height: 100vh;
    width: 100vw;
  }
</style>
