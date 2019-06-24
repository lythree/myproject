<template>
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input size="mini" placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button size="mini" slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click.prevent="addUser" size="mini" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change='selchange(scope.row.id,scope.row.mg_state)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click.prevent="getedit(scope.row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click.prevent="getroles(scope.row.id)"></el-button>
          <!-- {{scope.row}} -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click.prevent="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <div class="block">
      <el-pagination
        @size-change="pagesizeschange"
        @current-change="currentchange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 用户添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form v-model="from">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="from.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="from.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="email" :label-width="formLabelWidth">
          <el-input v-model="from.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="mobile" :label-width="formLabelWidth">
          <el-input v-model="from.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="addDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialog">
      <el-form v-model="editfrom">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="editfrom.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="email" :label-width="formLabelWidth">
          <el-input v-model="editfrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="mobile" :label-width="formLabelWidth">
          <el-input v-model="editfrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog = false">取 消</el-button>
        <el-button @click="edit" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户角色对话框 -->
    <el-dialog title="用户角色" :visible.sync="rolesdialog">
      <el-form v-model="rolesfrom">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="rolesfrom.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-select v-model="rolesfrom.rid" placeholder="请选择">
            <el-option label='请选择' :value="-1"></el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesdialog = false">取 消</el-button>
        <el-button @click="roles" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      // 查询参数
      query: '',
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 页容量的集合
      pagesizes: [5, 10, 15],
      // 总页数
      total: 0,
      // 添加对话框的显示与隐藏
      dialogFormVisible: false,
      // 表头的宽度
      formLabelWidth: '100px',
      // 添加对话框的表格数据
      from: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 用户编辑用户对话框
      editfrom: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 编辑对话框的显示与隐藏
      editdialog: false,
      // 分配角色对话框的显示与隐藏
      rolesdialog: false,
      // 分配角色对象
      rolesfrom: {
        id: '',
        username: '',
        rid: ''

      },
      // 角色数据
      options: []
    }
  },
  methods: {
    getdata () {
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: { Authorization: window.localStorage.getItem('token') }
      }).then(res => {
        // console.log(res)
        let { meta, data } = res.data
        if (meta.status === 200) {
          // 如果当前页的数据为零且当前页不等于1
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getdata()
            return
          }
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    currentchange (currentPage) {
      console.log(currentPage)
      this.pagenum = currentPage
      this.getdata()
    },
    pagesizeschange (pagesize) {
      this.pagesize = pagesize
      this.getdata()
    },
    // 根据内容查询结果
    search () {
      this.pagenum = 1
      this.getdata()
    },
    // 添加用户
    addUser () {
      this.dialogFormVisible = true
    },
    // 添加的用户的数据
    addDialog () {
      this.$http({
        method: 'post',
        url: 'http://localhost:8888/api/private/v1/users',
        data: this.from,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        //  console.log(res)
        let { meta } = res.data
        if (meta.status === 201) {
          this.getdata()
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.dialogFormVisible = false
    },
    // 删除数据
    del (id) {
      //  console.log(id);
      this.$http({
        method: 'delete',
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        let { meta } = res.data
        if (meta.status === 200) {
          this.getdata()
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 获取要编辑数据
    getedit (id) {
      this.editdialog = true
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res)

        let { data, meta } = res.data
        if (meta.status === 200) {
          this.editfrom.username = data.username
          this.editfrom.email = data.email
          this.editfrom.mobile = data.mobile
          this.editfrom.id = data.id
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 提交修改后的数据
    edit (id) {
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${this.editfrom.id}`,
        data: {
          email: this.editfrom.email,
          mobile: this.editfrom.mobile
        },
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          this.editdialog = false
          this.getdata()
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 分配角色
    getroles (id) {
      this.rolesdialog = true
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/roles`,
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        //  console.log(res);
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.options = data
          this.$http({
            method: 'get',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              authorization: window.localStorage.getItem('token')
            }
          }).then(res => {
            // console.log(res)
            let {meta, data} = res.data
            if (meta.status === 200) {
              this.rolesfrom.username = data.username
              this.rolesfrom.rid = data.rid
              this.rolesfrom.id = data.id
            }
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 修改角色
    roles () {
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${this.rolesfrom.id}/role`,
        data: {
          rid: this.rolesfrom.rid
        },
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)

        let {meta} = res.data
        if (meta.status === 200) {
          this.rolesdialog = false
          this.getdata()
        }
      })
    },
    // 改变用户状态
    selchange (uld, type) {
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${uld}/state/${type}`,
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)

        let {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getdata()
  }
}
</script>

<style scoped>
.myrow {
  margin: 10px;
}
</style>
