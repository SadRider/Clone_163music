<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="unlogin-wrapper" v-if="!getCookie">
                <div class="unlogin-container" @click="dialogFormVisible=true">
                    <Button :text="'点击登录'"/>
                </div>
            </div>
            <div class="login-wrapper" v-else>
                <div class="login-container">
                    <div class="avatar-wrapper">
                        <img v-lazy="getAvatar" class="avatar">
                    </div>
                    <div class="username-wrapper">
                        <p>{{getNickname}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" :model="form">
            <el-form-item label="手机号">
                <el-input v-model="form.phoneNumber" @blur="isHasUser"></el-input>
                <p>{{phoneMessage}}</p>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.password"></el-input>
                <p>{{passwordMessage}}</p>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Login">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {Login,isHasUser} from '../../api/login'
import {mapGetters} from 'vuex'
import Button from '../base/button.vue'
export default {
    name:'Login',
    components:{
        Button
    },
    data() {
        return {
            dialogFormVisible:false,
            form: {
                phoneNumber:'',
                password:''
            },
            phoneMessage:'',
            passwordMessage:'',
        }
    },
    methods: {
        Login(){
            Login(this.form.phoneNumber,this.form.password).then(res=>{
                console.log("res",res)
                if(res.code!=200){
                    this.passwordMessage='密码错误'
                }else{
                    this.$store.commit("login/saveUser",res)
                    localStorage.setItem('cookie',res.cookie)
                    localStorage.setItem('avatar',res.profile.avatarUrl)
                    localStorage.setItem('nickName',res.profile.nickname)
                    localStorage.setItem('uid',res.profile.userId)
                    this.dialogFormVisible=false
                }
            })
            setTimeout(() => {
            this.$router.go(0)
            }, 1000);
        },
        isHasUser(){
            if(this.phoneNumber==''){
                this.phoneMessage='请输入手机号'
                return
            }else{
                isHasUser(this.form.phoneNumber).then(res=>{
                    console.log(this.form.phoneNumber,res)
                    if(res.exist<0){
                        this.phoneMessage='账号不存在'
                    }else{
                        this.phoneMessage=''
                    }
                })
            }
        },
    },
    computed:{
        ...mapGetters({
            getAvatar:'login/getAvatar',
            getNickname:'login/getNickname',
            getCookie:'login/getCookie'
        })
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.login-wrapper
    width 18.75rem
    height 5rem
    position relative
    .unlogin-wrapper
        width 100%
        height 100%
        .unlogin-container
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            // .button
            //     font-size 1rem
            //     font-weight bold
            //     color #fff
            //     background-color $bgColor
            //     width 6rem
            //     height 2.5rem
            //     border 0
            //     border-radius 2.5rem
            // .button:active
            //     background-color #fff
            //     color $bgColor
    .login-wrapper
        width 100%
        height 100%
        .login-container
            width 100%
            height 100%
            padding 0.5rem
            box-sizing border-box
            .avatar-wrapper
                width 4rem
                height 4rem
                border-radius 50%
                margin-right 1rem
                float left
                .avatar
                    width 100%
                    border-radius 50%
            .username-wrapper
                width 12.75rem
                height 4rem
                line-height 4rem
                float left
                font-size 1.1rem
</style>