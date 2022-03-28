<template>
<div class="setPass">
    <header id="wx-header">
        <div class="center">
            <div class="iconfont icon-return-arrow" @click="$router.back()">
            </div>
            <span>设置密码</span>
        </div>
    </header>
    <section style="margin-top:30px">
         <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item label="OldPassword" prop="oldPassword">
                <el-input v-model="ruleForm.oldPassword" type="password"/>
            </el-form-item>
            <el-form-item label="NewPassword" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
            <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
            />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm()"
                >Submit</el-button
            >
            <el-button @click="resetForm()">Reset</el-button>
            </el-form-item>
        </el-form>
    </section>
</div>
</template>
<script>
import { reactive, ref} from 'vue'
import {updatePassword} from "../../utils/api"
//import {getCurrentInstance} from "vue"
export default {
    setup(){
        const ruleFormRef = ref()
        const checkOldPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Please input the OldPassword'))
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'))
            } else {
                if (ruleForm.checkPass !== '') {
                if (!ruleFormRef.value) return
                    ruleFormRef.value.validateField('checkPass', () => null)
                }
                callback()
            }
        }
        const validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the password again'))
        } else if (value !== ruleForm.pass) {
            callback(new Error("Two inputs don't match!"))
        } else {
            callback()
        }
        }
        const ruleForm = reactive({
            pass: '',
            checkPass: '',
            oldPassword: '',
        })

        const rules = reactive({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
        })

        const submitForm = () => {
            updatePassword({oldPassword:ruleForm.oldPassword,newPassword:ruleForm.pass}).then()
        }

        const resetForm = () => {
            ruleForm.pass="";
            ruleForm.checkPass="";
            ruleForm.oldPassword="";
            
        }
        return {
            ruleForm,
            rules,
            submitForm,
            resetForm
        }
    }

}

</script>
<style>

</style>