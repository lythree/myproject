<template>
  <div class="login">
    <div class="mybox">
      <el-form
        :rules="rules"
        label-position="top"
        :model="useObj"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名"  prop="username">
          <el-input type="text" v-model="useObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  >
          <el-input type="password" v-model="useObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click.prevent="login">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'http://localhost:8888/api/private/v1/login',
      useObj: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http({
            method: 'post',
            url: this.url,
            data: this.useObj
          }).then(res => {
            // console.log(res)
            let {meta, data} = res.data
            if (meta.status === 200) {
              // 将token保存到浏览器
              window.localStorage.setItem('token', data.token)
              this.$router.push('/')
              this.$message({
                message: meta.msg,
                type: 'success'
              })
            } else {
              this.$message.error(meta.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.mybox {
  width: 540px;
  height: 440px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  box-sizing: border-box;
}
.btn {
  width: 100%;
}
</style>
