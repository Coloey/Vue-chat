export default {
    //将联系人首字母提取出来
    contactsInitialList(state){
        let initialList=[],allContacts=state.allContacts,max=allContacts.length
        for(let i=0;i<max;i++){
            if(initialList.indexOf(allContacts[i].initial.toUpperCase())==-1){
                initialList.push(allContacts[i].initial)
                //console.log(allContacts[i].initial)
            }
        }
        return initialList.sort()

    },
    //将联系人按照首字母进行分类
    contactsList(state,getters){
        let contactsList={},allContacts=state.allContacts,max=allContacts.length
        for(let i=0;i<getters.contactsInitialList.length;i++){
            let protoTypeName=getters.contactsInitialList[i]
            contactsList[protoTypeName]=[]
            for(let j=0;j<max;j++){
                if(allContacts[j].initial.toUpperCase()===protoTypeName){
                    contactsList[protoTypeName].push(allContacts[j])
                }
            }
        }
        return contactsList

    },
    departmentsInitialList(state){
        let initialList=[],allDepartments=state.allDepartments,max=allDepartments.length
        for(let i=0;i<max;i++){
            if(initialList.indexOf(allDepartments[i].initial.toUpperCase())===-1){
                initialList.push(allDepartments[i].initial)
            }
            
        }
        //console.log(initialList)
        return initialList.sort()

    },
    departmentsList(state,getters){
        let departmentsList={},allDepartments=state.allDepartments,max=allDepartments.length
        for(let i=0;i<getters.departmentsInitialList.length;i++){
            let protoTypeName=getters.departmentsInitialList[i];
            departmentsList[protoTypeName]=[];
            for(let j=0;j<max;j++){
                if(allDepartments[j].initial.toUpperCase()===protoTypeName){
                    departmentsList[protoTypeName].push(allDepartments[j])
                }
            }
        }
        //console.log(departmentsList)
        return departmentsList
    },
    //获取用户信息
    getUserInfo(state){
        return state.userInfo;
    }
   
}