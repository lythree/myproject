<template>
  <el-card>
    <!-- 面包屑导航 -->
    <brand one="权限管理" two="权限列表"></brand>
    <!-- 表格 -->
    <el-table class="myetabl" :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级">
        <template slot-scope="scope">
           {{scope.row.level === '0' ? '一级' : scope.row.level ==='1'? '二级':'三级'}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import brand from '../layout/brandnav'
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    brand: brand
  },
  methods: {
    getRightsData () {
      this.$http({
        method: 'get',
        url: `rights/list`
      }).then(res => {
        console.log(res)

        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getRightsData()
  }
}
</script>

<style>
.myetabl {
  margin-top: 20px;
}
</style>
