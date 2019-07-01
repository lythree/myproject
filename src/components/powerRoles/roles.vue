<template>
  <el-card>
    <!-- 面包屑导航 -->
    <brand one="权限管理" two="角色列表"></brand>
    <!-- 按钮 -->
    <el-button class="mybutton" size="medium" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <!-- 角色的权限内容 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <!-- 一级权限 -->
              <el-tag
                @close="delright(scope.row.id,item1.id,scope.row)"
                closable
                class="tag1"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, index2) in item1.children" :key="index2">
                <el-col :span="4">
                  <!-- 二级权限 -->
                  <el-tag
                    @close="delright(scope.row.id,item2.id,scope.row)"
                    closable
                    type="info"
                    class="tag2"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                    @close="delright(scope.row.id,item3.id,scope.row)"
                    class="tag3"
                    v-for="(item3,index3) in item2.children"
                    :key="index3"
                    closable
                    type="danger"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          <el-button
            @click.prevent="rightCk(scope.row.children,scope.row.id)"
            type="success"
            icon="el-icon-check"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限选择对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <el-tree
        ref='mytree'
        :data="rightData"
         node-key="id"
         :default-expand-all='true'
         show-checkbox
        :props="propsOpj"
         :default-checked-keys="defaultCK"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getright">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script >
import brand from '../layout/brandnav'
export default {
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      // 权限数据
      rightData: [],
      // 默认配置项
      propsOpj: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的的数组
      defaultCK: [],
      roleid: ''
    }
  },
  methods: {
    // 获取角色列表的数据
    getRolesData () {
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        console.log(res)

        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 删除权限
    delright (roleId, rightId, scoperow) {
      this.$http({
        method: 'delete',
        url: `roles/${roleId}/rights/${rightId}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          scoperow.children = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 权限的选择
    rightCk (datalist, roleID) {
      this.roleid = roleID
      // 每次打开都要清空已有的权限
      this.defaultCK = []
      this.dialogFormVisible = true
      this.$http({
        method: 'get',
        url: `rights/tree`
      }).then(res => {
        let {meta, data} = res.data
        if (meta.status === 200) {
          // 将所有的权限保存起来
          this.rightData = data
          // 设置默认选选择的元素
          // 遍历一级权限
          datalist.forEach(item1 => {
            // 遍历二级权限
            item1.children.forEach(item2 => {
              // 遍历三级权限
              item2.children.forEach(item3 => {
                //  得到当前数据行中所有三级权限的id
                this.defaultCK.push(item3.id)
              })
            })
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 角色授权
    getright () {
      // 得到全选
      let allids = this.$refs.mytree.getCheckedKeys()
      // 得到半选
      let halfids = this.$refs.mytree.getHalfCheckedKeys()
      // 接受
      let rids = [...allids, ...halfids]
      this.$http({
        method: 'post',
        url: `roles/${this.roleid}/rights`,
        data: {
          rids: rids.join(',')
        }
      }).then(res => {
        let {meta} = res.data
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.getRolesData()
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.dialogFormVisible = false
    }
  },
  mounted () {
    this.getRolesData()
  },
  components: {
    brand: brand
  }
}
</script>

<style>
.mybutton {
  margin-top: 20px;
}
.tag1,
.tag2,
.tag3 {
  margin-top: 10px;
}
.tag3 {
  margin-right: 10px;
}
</style>
