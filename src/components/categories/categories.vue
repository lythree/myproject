<template>
  <el-card>
    <!-- 面包屑导航 -->
    <brand one="商品管理" two="商品分类"></brand>
    <!-- 添加按钮 -->
    <el-button @click.prevent="addfn" class="mybtn" type="success" plain>添加分类</el-button>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="newData" style="width: 100%">
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        width="320"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
      ></el-table-tree-column>
      <el-table-column label="级别" width="180">
        <template
          slot-scope="scope"
        >{{scope.row.cat_level === 0 ? "一级":scope.row.cat_level===1 ? '二级': "三级"}}</template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted ? "无效" : "有效"}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="adddialog">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model='catename' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" :label-width="formLabelWidth">
          <!-- 级联框 -->
          {{value}}
          <el-cascader
            v-model="value"
            :options="options"
            :props="propsOpj"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialog = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>
 // @change="handleChange"
<script>
import brand from '../layout/brandnav'
export default {
  data () {
    return {
      // 表格数据源
      tableData: [],
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 分页的数据源
      newData: [],
      // 总页数
      total: 0,
      // 页容量集合
      pagesizes: [5, 10, 15, 20],
      // 加载
      loading: true,
      adddialog: false,
      formLabelWidth: '100px',
      // 级联框中双向绑定数据
      value: [],
      // 级联框的数据源
      options: [],
      // 级联框的配置项
      propsOpj: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        // 选中任意已选项
        checkStrictly: true
      },
      catename: ''
    }
  },
  components: {
    brand: brand
  },
  methods: {
    gettableDate () {
      this.$http({
        method: 'get',
        url: `categories`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
          this.total = data.length
          // 分页数据的获取
          this.getnewData()
          this.loading = false
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 从数据源中截取当前的数据
    getnewData () {
      // 截取的开始索引与结束索引
      let begin = this.pagesize * (this.pagenum - 1)
      let end = this.pagesize * this.pagenum
      //  使用slice截取   第二位不包含
      this.newData = this.tableData.slice(begin, end)
    },
    // 当前页发生改变时
    handleCurrentChange (currentpage) {
      this.pagenum = currentpage
      this.gettableDate()
    },
    // 当页容量量发生改变时
    handleSizeChange (pageSize) {
      this.pagesize = pageSize
      this.gettableDate()
    },
    addfn () {
      this.adddialog = true
      this.getJLData()
    },
    // 获取级联框中的数据
    getJLData () {
      this.$http({
        method: 'get',
        url: `categories?type=2`
      }).then(res => {
        let {meta, data} = res.data
        if (meta.status === 200) {
          this.options = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 添加分类数据
    addCate () {
      this.adddialog = false
      // 判断是否与给分类选着父分类，如果选着取最后一项为父id
      var pid = this.value.length === 0 ? 0 : this.value[this.value.length - 1]
      this.$http({
        method: 'post',
        url: `categories`,
        data: {
          cat_pid: pid, // 设置添加分类的父id
          cat_name: this.catename, // 分类的名称
          cat_level: this.value.length// 分类的等级
        }
      }).then(res => {
        let {meta} = res.data
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.gettableDate()
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.gettableDate()
  }
}
</script>

<style>
.mybtn {
  margin-top: 10px;
}
</style>
