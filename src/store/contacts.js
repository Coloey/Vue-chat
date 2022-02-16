/**
 * id
 * initial
 * headerUrl
 * name
 * sex
 */
const contacts=[
    {
    "id":"id_LiChun",
    "initial":'X',
    "headerUrl":"https://pic.qqtn.com/up/2017-8/2017081811060478140.png",
    "name":"学籍科——李春",
    'sex':1,
    },
    {
    "id":"id_ZhangSan",
    "initial":'X',
    "headerUrl":"https://th.bing.com/th/id/OIP.nxZmCO48sYgZ6oYmSNb8mQAAAA?pid=ImgDet&rs=1",
    "name":"学籍科——张三",
    'sex':0
    },
    {"id":"id_WangWu",
    "initial":'K',
    "headerUrl":"https://th.bing.com/th/id/OIP.EER7oOUiluG05iQQySh34AAAAA?pid=ImgDet&rs=1",
    "name":"科研处——王五",
    'sex':1
    },
    {
        "id":"id_ZhaoLiu",
        "initial":'K',
        "headerUrl":"https://th.bing.com/th/id/OIP.G2D87CoGPOcSsVXYcrHfmgAAAA?pid=ImgDet&rs=1",
        "name":"科研处——赵六",
        'sex':0,

    },
    {
        "id":"id_SunQi",
        "initial":'D',
        "headerUrl":"https://th.bing.com/th/id/R.abbdb67aba35717ee863e4bdc107f54e?rik=2GcMDYD8MoYfjA&pid=ImgRaw&r=0&sres=1&sresct=1",
        "name":"档案室——孙齐",
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
            for(let index in contacts){
                if(contacts[index].id==id){
                   // console.log(contacts[index])
                    return contacts[index]
                }
            }
        }
    }
}
export default contact