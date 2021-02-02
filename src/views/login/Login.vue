<template>
  <!-- 登录框 -->
  <div class="login-bg">
    <div  class="login-container">
      <el-form class="login-form" :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
        <!-- 企业编码 -->
        <el-form-item prop="erpid">
          <el-input prefix-icon="el-icon-s-home" type="text" v-model.number="ruleForm.erpid" autocomplete="off" placeholder="企业编码"></el-input>
        </el-form-item>
        <!-- 登录名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" type="text" v-model="ruleForm.username" autocomplete="off" placeholder="登录名"></el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="输入密码"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="vercode">
          <el-row>
            <el-col :span="14">
              <el-input prefix-icon="el-icon-security" type="text" v-model="ruleForm.vercode" autocomplete="off" placeholder="图形验证码"></el-input>
            </el-col>
            <el-col :span="10">
              <div class="login-vercode">
                <img class="login-vercode-img" src="http://192.168.16.168:8090/lyLogin/BSystem/vcimg/QryImg.ua" alt="">
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <!-- <el-input type="submit"  @click="submitForm('ruleForm')">登录</el-input> -->
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    var _this = this
    const validateObj = {
      erpid(rule, value, callback){
        if(!value){
          return callback(new Error('企业编码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 300);
      },
      username(rule, value, callback){
        if(!value){
          return callback(new Error('用户名不能为空'));
        }
        callback()
      },
      password(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (_this.ruleForm.password !== '') {
          //   _this.$refs.ruleForm.validateField('password');
          // }
          callback();
        }
      },
      vercode(rule, value, callback){
        if( value ===''){
          callback(new Error('请填写验证码'));
        } else {
          callback()
        }
      }
    }

    return {
      ruleForm: {
        erpid: '',
        username: '',
        password: '',
        vercode:''
      },
      rules: {
        erpid: [
          {validator: validateObj.erpid, trigger: 'blur'}
        ],
        username: [
          {validator: validateObj.username, trigger: 'blur'}
        ],
        password: [
          {validator: validateObj.password, trigger: 'blur'}
        ],
        vercode:[
          {validator: validateObj.vercode, trigger: 'blur'}
        ]
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .login-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-image: url(http://192.168.16.170/bck/back.jpg);
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
  .login-container{
    box-sizing: border-box;
    width: 375px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 426px;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -13%);
  }
  @media (max-width: 768px) {
    .login-container{
      width: 300px;
      padding: 10px;
   }
  }
  .el-form-item{
    margin-bottom: 18px;
  }
  /deep/.el-input__inner:focus{
    border-color:#d34a5a
  }
  .login-vercode{
    height: 40px;
    margin-left: 10px;
  }
  .login-vercode-img{
    width: 100%;
    height: 100%;
    border-radius: 4px
  }
  .login-btn{
    width: 100%;
    background: #d34a5a;
    border: none
  }
  /deep/.el-input__icon{
    color: #d34a5a;
  }
  /deep/.el-form-item__error{
    color: #333;
  }
</style>
