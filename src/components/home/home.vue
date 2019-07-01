<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Tophead></Tophead>
    </el-header>
    <el-container>
        <!-- 侧边栏 -->
      <Sidebar></Sidebar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Tophead from '../../components/layout/tophead'
import Sidebar from '../../components/layout/sidebar'
export default {
  components: {
    Tophead: Tophead,
    Sidebar: Sidebar
  }
  // mounted () {
  //   let token = window.localStorage.getItem('token')
  //   if (!token) {
  //     this.$router.push('/login')
  //     this.$message.error('你还没登陆，请先登陆')
  //   }
  // }
}
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.myimg img {
  height: 60px;

}
.myh h2 {
  margin: 0;
  color: #fff;
}
.myA a {
  float: right;
  text-decoration: none;
  color: red;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100%;
}
.el-menu {
    height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>
