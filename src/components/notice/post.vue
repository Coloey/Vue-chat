<template>
<div class="main">
    <header id="wx-header">
    <div class="center">
        <router-link to="/notice" tag="div" class="iconfont icon-return-arrow"></router-link>
        <span>编辑通知</span>
    </div> 
    </header>
    <div class="content">
        <div class="control">
            <el-button class="cancle" type="primary" @click="cancle">取消</el-button>
            <el-button class="post" type="primary"  @click="submit">发布</el-button>
        </div>   
        <textarea name="" id="" cols="30" rows="10" placeholder="请在此处编辑" v-model="textValue" >
        </textarea>
        <el-upload action="#" list-type="picture-card" :auto-upload="false" 
         :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
        :before-upload="beforeUpload">
        <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</div> 
</template>
<script>
import { Plus } from '@element-plus/icons-vue'
import {reactive, ref} from "vue"
import {ElMessage} from 'element-plus'
import { useStore } from 'vuex'
import {useRouter} from "vue-router"
import CHAT from "../../client"
export default {
    components:{
        Plus
    },
    setup(){
        const dialogImageUrl=ref('')
        const dialogVisible=ref(false)
        const textValue=ref("")
        const store=useStore()
        const router=useRouter()
        let fileList=reactive([])
        const beforeUpload=(file)=>{
            const isJpg=file.type==='image/jpg'||'image/jpeg'
            const isPng=file.tyep==='image/png'
            if(!isJpg&&!isPng){
                return new Promise(reject=>{
                    ElMessage.error("上传的图片只能是jpg或者jpeg或者png格式");
                    reject();
                })
            }
        }
        const handleRemove=(file,fileList)=>{
           for(const i in fileList){
               console.log(fileList[i])
               //console.log(fileList[i].key)
               if(fileList[i].key===file.uid){
                   fileList.splice(i,1);
               }
           }
        }  
        const handlePictureCardPreview = (file) => {
            //console.log(file.url);
            dialogImageUrl.value = file.url;
            dialogVisible.value = true
        }
        const cancle=()=>{
            textValue.value="";
            fileList.length=0;
            router.push("/notice")
        }
        const submit=()=>{
            if(textValue.value.length===0&&fileList.length===0){
                ElMessage.warning("内容不能为空")
            }
          let ImageUrl=[];
           if(fileList.length>0){
               for(let i in fileList){
                   ImageUrl.push(fileList[i].url);
               }
           }
            const obj={
                fromUser:store.state.userInfo.username,
                headerUrl:store.state.userInfo.user_pic,
                textValue:textValue.value,
                ImageUrl,
            };
            CHAT.sendPost(obj);  
            ElMessage.success("发布成功!")  
            setTimeout(()=>{
                router.push('/notice')
            },1500)
                             
        }
        return {
            handleRemove,
            handlePictureCardPreview,
            textValue,
            submit,  
            fileList,
            beforeUpload,
            cancle
        }

    }

}
</script>
<style lang="less">
@import "../../assets/less/post.less";

</style>