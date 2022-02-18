import {createRouter,createWebHashHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[{
        path:'/',
        name:"信息",
        component:()=>Promise.resolve(import("../components/chat/chat.vue"))

    },
        /*{
        path: '/chat',
        name: "信息",
        component: ()=>Promise.resolve(import("../components/chat/chat.vue"))
    },*/ {
        path: '/chat/dialogue/',
        name: "",
        components: {
            "default":()=>Promise.resolve(import("../components/chat/chat.vue")),
            "subPage":()=>Promise.resolve(import("../components/chat/dialogue.vue"))
        }
    },
    {
        path: '/chat/dialogue/dialogue-detail/',
        name: "dialogueDetail",
        components: {"subPage":()=> Promise.resolve(import("../components/chat/dialogue-detail.vue"))},

    },
    {
        path: '/contact',
        name: "通讯录",
        component:()=>Promise.resolve(import("../components/contact/contact.vue"))
    },
    {
        path:'/contact/department',
        name:"",
        components:{
            'default':()=>Promise.resolve(import("../components/contact/contact.vue")),
            "subPage":()=>Promise.resolve(import("../components/contact/department.vue"))
        }
        
    },
    {
        path: '/contact/details/',
        name: "",
        components: {
            "default": ()=>Promise.resolve(import("../components/contact/contact.vue")),
            "subPage":()=>Promise.resolve(import("../components/contact/details.vue"))
        }
    },
    {
        path:'/contact/details/contact-dialogue/',
        name:'',
        components:{"subPage":()=>Promise.resolve(import("../components/contact/contact-dialogue.vue"))}

    },
    {
        path:'/self',
        name:'我',
        component:()=>Promise.resolve(import("../components/self/self.vue")),
    },
    {
        path:'/self/setting/',
        name:'',
        components:{
            'default':()=>Promise.resolve(import("../components/self/self.vue")),
            'subPage':()=>Promise.resolve(import("../components/self/setting.vue"))
        }
    },
]
})