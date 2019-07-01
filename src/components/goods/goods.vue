<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bread one="商品管理" two="商品列表"></bread>
    <!-- 搜索框&按钮 -->
    <el-row class="goodBtn">
      <el-col :span="6">
        <el-input size="mini" placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button size="mini" slot="append" icon="el-icon-search" @click.prevent="goodsSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click.prevent="$router.push('/goods/addGoods')" size="mini" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="goodsSizeChange"
      @current-change="goodsCurrentChange"
      :current-page="pagenum"
      :page-sizes="pageszies"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import bread from '../layout/brandnav'
export default {
  data () {
    return {
      goodsData: [],
      // 查询参数
      query: '',
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 10,
      // 总页数
      total: 0,
      // 页容量的集合
      pageszies: [5, 10, 15]
    }
  },
  components: {
    bread: bread
  },
  methods: {
    getGoodsData () {
      this.$http({
        method: 'get',
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.goodsData = data.goods
          this.total = data.goods.length
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    goodsCurrentChange (currentPage) {
      this.pagenum = currentPage
      this.getGoodsData()
    },
    goodsSizeChange (pageSize) {
      this.pagesize = pageSize
      this.getGoodsData()
    },
    goodsSearch () {
      this.getGoodsData()
    }
  },
  mounted () {
    this.getGoodsData()
  }
}
</script>

<style>
.goodBtn {
  margin-top: 10px;
}
</style>
