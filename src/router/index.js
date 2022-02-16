import {createRouter,createWebHistory} from "vue-router"
import chat from "../components/chat/chat.vue"
import dialogue from "../components/chat/dialogue.vue"
import dialogueDetail from "../components/chat/dialogue-detail.vue"
import contact from "../components/contact/contact.vue"
import details from "../components/contact/details.vue"
import contactDialogue from"../components/contact/contact-dialogue.vue"
import department from "../components/contact/department.vue"
import self from "../components/self/self.vue"
import setting from "../components/self/setting.vue"
//import mobileDetails from "../components/contact/mobile-contacts.vue"
export default createRouter({
    history:createWebHistory(),
    routes:[{
        path: '/',
        name: "信息",
        component: chat
    }, {
        path: '/chat/dialogue/',
        name: "",
        components: {
            "default":chat,
            "subPage":dialogue
        }
    },
    {
        path: '/chat/dialogue/dialogue-detail/',
        name: "dialogueDetail",
        components: {"subPage": dialogueDetail},

    },
    {
        path: '/contact',
        name: "通讯录",
        component:contact
    },
    {
        path:'/contact/department',
        name:"",
        components:{
            'default':contact,
            "subPage":department
        }
        
    },
    {
        path: '/contact/details/',
        name: "",
        components: {
            "default": contact,
            "subPage":details
        }
    },
    {
        path:'/contact/details/contact-dialogue/',
        name:'',
        components:{"subPage":contactDialogue}

    },
    {
        path:'/self',
        name:'',
        component:self,
    },
    {
        path:'/self/setting/',
        name:'',
        components:{
            'default':self,
            'subPage':setting
        }
    },
]
})