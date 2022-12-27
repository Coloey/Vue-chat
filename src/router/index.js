import { createRouter, createWebHashHistory } from "vue-router";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "通讯录",
      component: () =>
        Promise.resolve(import("../components/contact/contact.vue")),
    },
    {
      path: "/login",
      name: "login",
      component: () => Promise.resolve(import("../components/login/login.vue")),
    },
    {
      path: "/register",
      name: "注册",
      component: () =>
        Promise.resolve(import("../components/register/register.vue")),
    },
    {
      path: "/contact",
      name: "",
      component: () =>
        Promise.resolve(import("../components/contact/contact.vue")),
    },
    {
      path: "/contact/department",
      name: "",
      components: {
        default: () =>
          Promise.resolve(import("../components/contact/contact.vue")),
        subPage: () =>
          Promise.resolve(import("../components/contact/department.vue")),
      },
    },
    {
      path: "/contact/details/",
      name: "",
      components: {
        default: () =>
          Promise.resolve(import("../components/contact/contact.vue")),
        subPage: () =>
          Promise.resolve(import("../components/contact/details.vue")),
      },
    },
    {
      path: "/contact/details/contact-dialogue/",
      name: "",
      components: {
        subPage: () =>
          Promise.resolve(import("../components/contact/contact-dialogue.vue")),
      },
    },
    {
      path: "/contact/details/contact-dialogue-details/",
      name: "",
      components: {
        subPage: () =>
          Promise.resolve(
            import("../components/contact/contact-dialogue-details.vue")
          ),
      },
    },
    {
      path: "/notice",
      name: "通知",
      component: () =>
        Promise.resolve(import("../components/notice/notice.vue")),
    },
    {
      path: "/notice/post/",
      name: "",
      components: {
        default: () =>
          Promise.resolve(import("../components/notice/notice.vue")),
        subPage: () => Promise.resolve(import("../components/notice/post.vue")),
      },
    },
    {
      path: "/self",
      name: "我",
      component: () => Promise.resolve(import("../components/self/self.vue")),
    },
    {
      path: "/self/setting/",
      name: "",
      components: {
        default: () => Promise.resolve(import("../components/self/self.vue")),
        subPage: () =>
          Promise.resolve(import("../components/self/setting.vue")),
      },
    },
    {
      path: "/self/setting/setPassword",
      name: "",
      components: {
        subPage: () =>
          Promise.resolve(import("../components/setPassword/setPassword.vue")),
      },
    },
  ],
});
