<template>
    <el-aside width="200px">
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
               <i class="el-icon-s-grid"></i>
              <span>用户列表</span>
           </el-menu-item>
          </el-submenu>
           <el-submenu index="2">
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>权限管理</span>
             </template>
            <el-menu-item index="2-1">
                <i class="el-icon-s-grid"></i>
                <span>角色列表</span>
             </el-menu-item>
            <el-menu-item index="2-2">
               <i class="el-icon-s-grid"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>商品管理</span>
             </template>
            <el-menu-item index="3-1">
                <i class="el-icon-s-grid"></i>
                <span>商品列表</span>
             </el-menu-item>
            <el-menu-item index="3-2">
               <i class="el-icon-s-grid"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
               <i class="el-icon-s-grid"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
               <i class="el-icon-s-grid"></i>
              <span>订单列表</span>
           </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
               <i class="el-icon-s-grid"></i>
              <span>数据报表</span>
           </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
</template>

<script>
export default {

}
</script>

<style>

</style>
