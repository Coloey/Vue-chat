import {createRouter,createWebHashHistory} from "vue-router"
//import chat from "../components/chat/chat.vue"
//import dialogue from "../components/chat/dialogue.vue"
//import dialogueDetail from "../components/chat/dialogue-detail.vue"
//import contact from "../components/contact/contact.vue"
/*import details from "../components/contact/details.vue"
import contactDialogue from"../components/contact/contact-dialogue.vue"
import department from "../components/contact/department.vue"
import self from "../components/self/self.vue"
import setting from "../components/self/setting.vue"*/
//import mobileDetails from "../components/contact/mobile-contacts.vue"
export default createRouter({
    history:createWebHashHistory(),
    routes:[{
        path: '/',
        name: "信息",
        component: ()=>Promise.resolve(import("../components/chat/chat.vue"))
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
        name:'',
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