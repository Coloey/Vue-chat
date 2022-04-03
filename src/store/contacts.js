

/**
 * id
 * initial
 * headerUrl
 * name
 * sex
 */
const contacts=[
    {
        "id":"id_Banshi",
        "initial":'B',
        "headerUrl":"https://www.ludicade.com/img/cms/logo-mesure-2.jpg",
        "name":"办事指南",
        "nickname":"办事指南"

    },
    {
    "id":12,
    "initial":'L',
    "headerUrl":"https://pic.qqtn.com/up/2017-8/2017081811060478140.png",
    "name":"LiSi",
    "nickname":'李四',
    'sex':1,
    },
    {
    "id":9,
    "initial":'Z',
    "headerUrl":"https://th.bing.com/th/id/OIP.nxZmCO48sYgZ6oYmSNb8mQAAAA?pid=ImgDet&rs=1",
    "name":"ZhangSan",
    "nickname":'张三',
    'sex':0
    },
    {"id":3,
    "initial":'C',
    "headerUrl":"https://pic3.zhimg.com/80/v2-93091834844364ab73fd617db4685210_720w.jpg?source=1940ef5c",
    "name":"Coloey",
    "nickname":"Coloey",
    'sex':1
    },
    {
        "id":14,
        "initial":'X',
        "headerUrl":"https://tse4-mm.cn.bing.net/th/id/OIP-C.hQiXejEJByTQtKTPP1vHTQAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.25&pid=1.7",
        "name":"XiaoQi",
        "nickname":"小七",
        'sex':0,

    },
    {
        "id":15,
        "initial":'L',
        "headerUrl":"https://th.bing.com/th/id/R.abbdb67aba35717ee863e4bdc107f54e?rik=2GcMDYD8MoYfjA&pid=ImgRaw&r=0&sres=1&sresct=1",
        "name":"LiChun",
        "nickname":"李春",
        'sex':0

    }
]
const contact={
    contacts,
    getUserInfo:(id)=>{
        //console.log("getUserInfo 被调用")
        if(!id){
            return;
        }
        else{
            return contacts.find(v=>v.id==id)
        }
    },
}
export default contact