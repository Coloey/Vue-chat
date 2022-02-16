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
        <div class="weui-cells weui-cell weui-cell_access">
            <div class="weui-cell_bd">账号与安全</div>
            <div class="weui-cell_ft">已保护</div>
        </div>
        <div class="weui-cells weui-cell weui-cell_access">
            <div class="weui-cell_bd">新消息通知</div>
        </div>
        <div class="weui-cells weui-cell weui-cell_access">
            <div class="weui-cell_bd">关于校园通</div>
        </div>
        <div>
             <a href="javascript:;" class="weui-btn weui-btn_default" style="width: 50%; margin-top:50px"> 切换账号</a>
            <a href="javascript:;" class="weui-btn" style="width: 50%; background-color:#1976d2;margin-top:20px"> 退出登录</a>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name:"setting",
}
</script>

<style>

</style>