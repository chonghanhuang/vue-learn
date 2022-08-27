let Vue
class MyRouter {
  constructor(options) {
    this.options = options

    this.app = new Vue({
      data() {
        return {
          current: "/"
        }
      }
    })

    this.routeMap = {}

    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route
    })

    window.addEventListener("hashchange", this.onHashChange.bind(this))
  }

  onHashChange() {
    this.app.current = window.location.hash.slice(1) || "/"
  }
}

MyRouter.install = function (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to
          }
        },
        [this.$slots.default]
      )
    }
  })

  Vue.component("router-view", {
    render(h) {
      let comp = null

      let route = this.$router.routeMap[this.$router.app.current]

      if (route) {
        comp = route.component
      }

      return h(comp)
    }
  })
}

export default MyRouter
