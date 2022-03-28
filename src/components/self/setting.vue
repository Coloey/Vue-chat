<template>
<div class="setting">
    <header id="wx-header">
        <div class="center">
            <div class="iconfont icon-return-arrow" @click="$router.back()">
                <span>我</span>
            </div>
            <span>设置</span>
        </div>
    </header>
    <section>
        <router-link :to="{path:'/self/setting/setPassword'}">
            <div class="weui-cells weui-cell weui-cell_access">
                <div class="weui-cell_bd">账号与安全</div>
                <div class="weui-cell_ft">已保护</div>
            </div>
        </router-link>
        
        <div class="weui-cells weui-cell weui-cell_access">
            <div class="weui-cell_bd">新消息通知</div>
        </div>
        <div class="weui-cells weui-cell weui-cell_access">
            <div class="weui-cell_bd">关于校园通</div>
        </div>
        <div>
              <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                :icon="InfoFilled"
                icon-color="red"
                title="确定切换账号吗？"
                @confirm="confirmEvent"
                @cancel="cancelEvent"
             >
                <template #reference>
                <span class="weui-btn weui-btn_default" style="width: 50%; left: 50%;transform: translateX(-100%);margin-top:50px">切换账号</span>
                </template>
             </el-popconfirm>  
              <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                :icon="InfoFilled"
                icon-color="red"
                title="确定退出登录吗？"
                @confirm="confirmEvent"
                @cancel="cancelEvent"
             >
                <template #reference>
                <span class="weui-btn weui-btn_default" style="width: 50%; left: 50%;transform: translateX(-100%);">退出登录</span>
                </template>
             </el-popconfirm>  
        </div>
    </section>
</div>
</template>

<script>
import {logout} from "../../utils/api"
export default {
  setup(){
      const confirmEvent=()=>{
           logout().then(()=>{

           })
      }
      return {
          confirmEvent
      }

  }
    
}

</script>

<style lang="less">
.el-popper {
    background: #fff;
    border-radius: 20px;
    .el-popconfirm {
        padding: 10px 30px;
        .el-popconfirm__main {
           display: flex;
           justify-content: center;
           align-items: center;
           font-size:20px;
            .el-icon {
                    svg {
                        width: 25px;
                        margin: 3px;
                    } 
            }
        }
        .el-popconfirm__action {
            .el-button {
                width: 90px;
                height: 30px;
                font-size: 20px;
                padding: 5px;
                text-align: center;
                border-radius: 5px;
                background: #2196f3;
                color: #fff;
                border-style: none;
                margin: 5px;
                span {
                    color: #fff;
                }
            }
        }

    }

}
 


</style>