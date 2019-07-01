<template>
  <el-aside width="200px">
    <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo">
      <el-submenu v-for="(item,index) in menusList" :key="index" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item v-for="(item1,index1) in item.children" :key="index1" :index="'/'+item1.path">
          <i class="el-icon-s-grid"></i>
          <span>{{item1.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    getMenusData () {
      this.$http({
        method: 'get',
        url: 'menus'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.menusList = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getMenusData()
  }
}
</script>

<style>
</style>
