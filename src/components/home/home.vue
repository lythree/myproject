<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
    <Tophead></Tophead>
    </el-header>
    <el-container>
        <!-- 侧边栏 -->
      <Sidebar></Sidebar>
      <el-main>Main</el-main>
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
.el-col {
  height: 60px;
}
.el-row img {
  height: 100%;

}
.el-col h2 {
  margin: 0;
  color: #fff;
}
.el-col a {
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
  text-align: center;
  line-height: 160px;
  height: 100%;
}
</style>
