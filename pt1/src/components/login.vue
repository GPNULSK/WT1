<template>
  <div class="login_div">
    <el-form @keyup.enter.native="loginSubmit" :model="ruleForm" :rules="rules" ref="ruleForm"   label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
name: "login",
  data(){
    return{
      ruleForm:{
        name:'',
        password:''
      },
      rules:{
        name:{required: true,message:'请输入用户名'},
        password:{required: true,message:'请输入密码'}
      }
    }
  },
  methods: {
    loginSubmit(){
      this.axios('http://localhost:8089/login',{
        params:{
          username: this.ruleForm.name,
          password: this.ruleForm.password
        }
      }).then(res=>{
        if(res.data!=-1){

          sessionStorage.setItem('id',res.data);
          this.$router.push('/profile')

        }
      })
    }
  }

}
</script>

<style scoped>
.login_div{
  margin-top: 200px;
  margin-left: 380px;
  width: 500px;
  height: 600px;
}
</style>
