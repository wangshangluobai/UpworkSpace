import Vue from "vue"
import { version, devtools, getCurrentInstance } from "vue"
// import { getConfigData } from "@/api/onlineDev/visualDev"
// import store from "./store"

class SetComponetConfig {
  static containerDefaultConfig = {
    popUp: {
      tag: "el-dialog",
      visible: "containerVisible",
      isOwnContainer: true,
    },
    fullScreen: {
      tag: "div",
      visible: "containerVisible",
      isOwnContainer: false,
    },
    drawer: {
      tag: "el-drawer",
      visible: "containerVisible",
      isOwnContainer: true,
    },
  }
  constructor(params) {
    const { containerConfig, componentConfig, customParams } = params || {}
    // TODO 基本参数校验 重写
    this.containerVisible = true
    this.init(containerConfig, componentConfig, customParams)
  }

  async init(conConf, comConf, customParams) {
    this.conConf = conConf
    this.comConf = comConf
    this.customParams = customParams
    const { conType, comRef, comClass, context } = conConf || {}
    console.log(
      "%c [ context ]-35",
      "font-size:13px; background:#81c4b9; color:#c5fffd;",
      context
    )
    const { comProps, comRoute, isDev } = comConf || {}

    if (comRoute) {
      !isDev && (await this.obtainStructuralData(comProps))
    } else {
      throw new Error(
        `组件地址不存在，请检查组件地址(comRoute) - ${comRoute}。`
      )
    }

    const component = (resolve) => require([`@/${comRoute}.vue`], resolve)
    const generateComponent = this.generateComStructure({
      comTag: component,
      config: comConf,
    })
    const config = {
      ...conConf,
      comProps: {
        ...conConf.comProps,
        visible: this.containerVisible,
        beforeClose: (done) => this.isContainerShow({ done }),
      },
      directives: [
        {
          name: "if",
          value: this.containerVisible,
        },
      ],
    }
    const comTag = this.getDefaultConfig({ key: conType, property: "tag" })
    if (!comTag) return
    debugger
    const structure = this.generateComStructure({
      comTag,
      config,
      component: generateComponent,
    })
    console.log(
      "%c [ Vue.prototype ]-80",
      "font-size:13px; background:#d9f832; color:#ffff76;",
      Vue.prototype
    )
    // debugger
    Vue.prototype = Object.create(context)
    Vue.prototype.constructor = Vue
    // console.log(
    //   "%c [ Vue.prototype ]-80",
    //   "font-size:13px; background:#d9f832; color:#ffff76;",
    //   Vue.prototype
    // )
    Vue.config.devtools = true
    this.res = Vue.extend({ render: (h) => structure(h) })
    // this.res = Vue.extend({ render: (h) => structure(h) }).call(context)
    Vue.component("my-res", this.res)
    // console.log(
    //   "%c [ Vue ]-68",
    //   "font-size:13px; background:#fa9fb4; color:#ffe3f8;",
    //   window
    // )
    this.newres = new this.res({ propsData: { tabname: "23" } }).$mount()

    document.getElementById("app").appendChild(this.newres.$el)
    const types = {
      Comment: Symbol("v-cmt"),
      Fragment: Symbol("v-fgt"),
      Static: Symbol("v-stc"),
      Text: Symbol("v-txt"),
    }
    const Fragment = Symbol("Fragment")
    const Text = Symbol("Text")
    const Comment = Symbol("Comment")
    const Static = Symbol("Static")
    const inst = getCurrentInstance()
    // console.log(
    //   "%c [ inst ]-104",
    //   "font-size:13px; background:#4b868f; color:#8fcad3;",
    //   inst
    // )
    // Object.assign(inst.appContext, app._context)
    // Object.assign(inst.provides, app._context.provides)
    // window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = this.newres
    // console.log(
    //   "%c [ this.newres ]-104",
    //   "font-size:13px; background:#b59fc6; color:#f9e3ff;",
    //   this.newres
    // )
    // window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('app:init', app, app.version, types);
    // window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
    // debugger
    // console.log("context", context.prototype)
    // try use emit("init") but lose many data
    // this.newres.version = version
    // this.newres.prototype = Vue.prototype
    // this.newres.mixin = Vue.mixin
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", this.newres, version, {
      Fragment,
      Text,
      Comment,
      Static,
    })
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = this.newres
    // store.dispatch("customComponent/getComponent", { component: this.newres });
    // store.dispatch("customComponent/getShowDialogBox", { isShow: true });
  }
  async obtainStructuralData(params) {
    const { modelId } = params || {}

    if (!modelId) {
      throw new Error(`配置模式需要结构ID (modelId)。`)
    }

    const { code, data } = await getConfigData(modelId)

    if (code !== 200 || !data) {
      throw new Error(`获取结构数据错误，请检查(modelId) - ${modelId}。`)
    }
    this.comConf.comProps.config = data
  }

  generateComStructure(params) {
    const { comTag, config, component } = params || {}
    let {
      comClass = {},
      comStyle = {},
      comAttrs = {},
      comProps = {},
      comDomProps = {},
      comOn = {},
      comNativeOn = {},
      comDirectives = [],
      comScopedSlots = {},
      comSlot,
      comKey,
      comRef,
      comRefInFor,
    } = config || {}

    if (typeof comRefInFor === "undefined") comRefInFor = true
    if (typeof comRef === "undefined") comRef = "comRef"

    return function (h) {
      const components = []
      // TODO: 支持多组件
      if (component) components.push(component(h))

      return h(
        comTag,
        {
          class: { ...comClass },
          style: { ...comStyle },
          attrs: { ...comAttrs },
          props: { ...comProps },
          domProps: { ...comDomProps },
          on: { ...comOn },
          nativeOn: { ...comNativeOn },
          directives: [...comDirectives],
          scopedSlots: { ...comScopedSlots },
          slot: comSlot,
          key: comKey,
          ref: comRef,
          refInFor: comRefInFor,
        },
        components
      )
    }
  }
  getDefaultConfig(params) {
    const { key, property } = params || {}
    const config = SetComponetConfig.containerDefaultConfig

    switch (key) {
      case "popUp":
        return config[key][property]
        break
      case "fullScreen":
        return config[key][property]
        break
      case "drawer":
        return config[key][property]
        break
      default:
        throw new Error(`'conType' - ${key} 是不支持的容器类型`)
        return false
        break
    }
  }
  isContainerShow(params) {
    debugger
    const { done } = params || {}
    const conType = this.conConf.conType
    const context = this.conConf.context
    this.containerVisible = false

    const isOwnCtr = this.getDefaultConfig({
      key: conType,
      property: "isOwnContainer",
    })
    const key = this.getDefaultConfig({ key: conType, property: "visible" })

    if (isOwnCtr) {
      store.dispatch("customComponent/getShowDialogBox", { isShow: false })
      this.containerVisible = false
    } else {
      // TODO: 获取被打开组件的展示类型 判断关闭的方法
    }
    done()
  }
  containerDestroy(params) {}
}

export default SetComponetConfig
