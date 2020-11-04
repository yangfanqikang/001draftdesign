<template>
  <el-dialog :title="title" :visible.sync="outerVisible">
    <el-dialog
      width="800px"
      style="minHeight: 800px"
      :title="title"
      :visible.sync="innerVisible"
      append-to-body>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="innerVisible = true">历史记录</el-button>
      <el-button @click="confirm">确 定</el-button>
      <el-button @click="outerVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SelectBox",
  data() {
    return {
      title: '',
      outerVisible: false,
      innerVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
    console.log(this.$attrs)
    this.title = this.$attrs.title
  },
  methods: {
    confirm() {
      this.outerVisible = false
      this.$emit('getValue', this.value)
    }
  },
}
</script>

<style lang="scss" scoped>
.SelectBox {
}
</style>
