<template>
  <el-row>
    <el-col class="myimg" :span="4">
      <img src="../../assets/logo.png" alt>
    </el-col>
    <el-col class="myh" :span="16">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col class="myA" :span="4">
      <a href="#" @click.prevent="logout">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你是否要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem('token')
          this.$router.push({ name: 'login' })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })

      // 清除token值
    }
  }
}
</script>

<style>
</style>
