import {createStore} from "vuex"
import contact from "./contacts"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
import departments from "./departments"
export default createStore({
    state:{
        logining:true,
        newMsgCount:0,//新消息数量
        allContacts:contact.contacts,//所有联系人
        allDepartments:departments,
        currentPageName:"信息",//用于在header组件中显示当前页标题
        headerStatus: true,//显示true或者隐藏false header组件
        tipsStatus:false,//控制首页右上角菜单显示
        userInfo:{},
        msgList:{
            stcikMsg:[],//置顶消息列表
            baseMsg:[
                {
                     
                    "id":"id_Banshi",
                    "read":true,
                    "newMsgCount":0,
                    "quiet":false,
                    
                    "msg":[
                        {"text":"欢迎点击办事指南,如果你有什么关于学业竞赛等上面的问题需要咨询的可以发消息给我,系统会自动回复并对您的问题进行解答及指引",
                        "date":1477778578910,
                        "name":"办事指南",
                        "headerUrl":"https://www.ludicade.com/img/cms/logo-mesure-2.jpg"},                   
                    ],
                    "lastMsg":{},             
                    "user":contact.getUserInfo('id_Banshi') 

                },
                
                {
                
                "id":"id_LiChun",
                "read":false,
                "newMsgCount":2,
                "quiet":false,//true消息免打扰,false提示新消息
               
                "msg":[
                    {//对话框的聊天记录
                    "text":"你好啊",
                    "date":1488117964666,
                    "name":"李春",
                    "headerUrl":"https://pic.qqtn.com/up/2017-8/2017081811060478140.png",
                    },
                    {
                        "text":'有什么事吗',
                        "date":148811799999,
                        "name":"李春",
                        "headerUrl":"https://pic.qqtn.com/up/2017-8/2017081811060478140.png",

                    },     
                ],
                "lastMsg":{},
                "user":contact.getUserInfo('id_LiChun')

            },
            {
                
                "id":"id_WangWu",
                "read":false,
                "newMsgCount":2,
                "quiet":false,
                
                "msg":[
                    {//对话框的聊天记录
                    "text":"您好",
                    "date":1488117999999,
                    "name":"王五",
                    "headerUrl":"https://th.bing.com/th/id/OIP.EER7oOUiluG05iQQySh34AAAAA?pid=ImgDet&rs=1",},
                    {
                        "text":'你打电话问下',
                        "date":1488117999999,
                        "name":"王五",
                        "headerUrl":"https://th.bing.com/th/id/OIP.EER7oOUiluG05iQQySh34AAAAA?pid=ImgDet&rs=1",
                    },
                    
                ],
                "lastMsg":{},
                "user":contact.getUserInfo('id_WangWu')
            },
            {
               
                "id":"id_ZhaoLiu",
                "read":false,
                "newMsgCount":2,
                "quiet":false,
               
                "msg":[
                    {//对话框的聊天记录
                    "text":"同学你好",
                    "date":1488117967678,
                    "name":"赵六",
                    "headerUrl":"https://th.bing.com/th/id/OIP.G2D87CoGPOcSsVXYcrHfmgAAAA?pid=ImgDet&rs=1",
                    },
                    {
                        "text":'可以,明天到我办公室一趟',
                        "date":1488117978789,
                        "name":"赵六",
                        "headerUrl":"https://th.bing.com/th/id/OIP.G2D87CoGPOcSsVXYcrHfmgAAAA?pid=ImgDet&rs=1",

                    },     
                ],
                "lastMsg":{},
                "user":contact.getUserInfo('id_ZhaoLiu')
            },
        ]
        }        
    },
    mutations,
    actions,
    getters
})