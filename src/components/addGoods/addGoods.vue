<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bread one="商品管理" two="商品列表"></bread>
    <!-- 警告提示信息 -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品类容"></el-step>
    </el-steps>
    <!-- tab栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
      <el-tab-pane label="基本信息" name="first">
        <el-form label-position="top" label-width="80px" v-model="goodsfrom" >
          <el-form-item label="商品名称" >
            <el-input v-model="goodsfrom.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" >
            <el-input v-model="goodsfrom.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品总量" >
            <el-input v-model="goodsfrom.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" >
            <el-input v-model="goodsfrom.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="gdvalue" :options="gdoptions" :props="propsObj"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div v-for="(item, index) in fendata" :key="index">
          <div>{{item.attr_name}}</div>
          <div>
            <el-checkbox
              v-model="checked"
              border
              v-for="(item1, index1) in item.attr_vals.split( ',')"
              :key="index1"
            >{{item1}}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <el-form label-width="80px" label-position="top">
          <el-form-item :label="item.attr_name" v-for="(item, index) in goodsonly" :key="index">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
          :headers="headersObj"
          :on-success="imgsuccess"
          :on-remove="imgremove"
          :on-preview="onpreview"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          {{fileList}}
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品类容" name="five">
        <el-button type="primary" plain @click.prevent="addGoods">新增商品</el-button>
        <quill-editor v-model="content"
                ref="myQuillEditor"
        > </quill-editor>
      </el-tab-pane>
    </el-tabs>
    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="imgdialog">
      <img ref="myimg" style="width:100%">
      <div slot="footer" class="dialog-footer">
        <el-button @click="imgdialog = false">取 消</el-button>
        <el-button type="primary" @click="imgdialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import bread from '../layout/brandnav'
export default {
  data () {
    return {
      // 步骤条的步骤
      active: 0,
      // 设置默认选中的tab的名称
      activeName: 'first',
      // 表单数据
      goodsfrom: {
        goods_cat: '',
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_introduce: ''
      },

      gdvalue: [],
      gdoptions: [],
      propsObj: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      // 分类参数
      fendata: [],
      // 分类数据属性
      goodsonly: [],
      checked: true,
      headersObj: {
        Authorization: window.localStorage.getItem('token')
      },

      fileList: [],
      imgdialog: false,
      content: '我是默认值'
    }
  },
  components: {
    bread: bread
  },
  methods: {
    // 每次tab被点击时会被触发
    handleClick (event) {
      // 事件源对象
      // 设置步骤条的进度
      this.active = +event.index
      if (event.index === '1') {
        this.getgood('many')
      }
      if (event.index === '2') {
        this.getgood('only')
      }
    },
    // 获取级联框的中的数据
    getCascaderdata () {
      this.$http({
        method: 'get',
        url: `categories`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.gdoptions = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 获取分类数据封装成一个函数
    getgood (el) {
      if (this.gdvalue !== 0) {
        this.$http({
          method: 'get',
          url: `categories/${
            this.gdvalue[this.gdvalue.length - 1]
          }/attributes?sel=${el}`
        }).then(res => {
          let { data, meta } = res.data
          if (meta.status === 200) {
            if (el === 'many') {
              this.fendata = data
            }
            if (el === 'only') {
              this.goodsonly = data
            }
          } else {
            this.$message.error(meta.msg)
          }
        })
      }
    },
    // 图片上传成功后执行的函数
    imgsuccess (response, file, fileList) {
      console.log(response)
      this.fileList.push(response.data.tmp_path)
    },
    // 图片移除时执行的函数
    imgremove (file, fileList) {
      // 得到图片移除时的数据
      let img = file.response.data.tmp_path
      // 从数组中将图片移除
      this.fileList.forEach((item, index) => {
        if (item === img) {
          // 移除这个元素
          this.fileList.splice(index, 1)
        }
      })
    },
    // 图片预览时执行的函数
    onpreview (file) {
      // 打开面板
      this.imgdialog = true
      // 渲染图片
      // 延迟到下次dom加载之前在执行
      this.$nextTick(() => {
        let img = file.response.data.url
        this.$refs.myimg.src = img
      })
    },
    // 添加商品
    addGoods () {
      this.goodsfrom.goods_cat = this.gdvalue.join(',')
      this.goodsfrom.goods_introduce = this.content
      this.$http({
        method: 'post',
        url: 'goods',
        data: this.goodsfrom
      }).then(res => {
        console.log(res)

        let {meta} = res.data
        if (meta.status === 201) {
          this.$router.push('/goods')
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getCascaderdata()
  }
}
</script>

<style>
.el-alert.el-alert--info.is-light {
  margin-top: 10px;
}
.el-steps.el-steps--horizontal {
  margin-top: 10px;
  font-size: 12px;
}
.el-tabs.el-tabs--left {
  margin-top: 40px;
}
.ql-editor.ql-blank {
    height: 500px;
}
</style>
