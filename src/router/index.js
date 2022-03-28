import {createRouter,createWebHashHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[{
        path:'/',
        name:"信息",
        component:()=>Promise.resolve(import("../components/chat/chat.vue"))

    },
    {
        path: '/login',
        name: "login",
        component:
            ()=>Promise.resolve(import("../components/login/login.vue"))
    },
        {
        path: '/register',
        name: "注册",
        component: ()=>Promise.resolve(import("../components/register/register.vue"))
    }, {
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
        name: "",
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
    {
        path:'/self/setting/setPassword',
        name:'',
        components:{
            'subPage':()=>Promise.resolve(import("../components/setPassword/setPassword.vue"))
        }
    }
]
})