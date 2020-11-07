<template>
  <div class="DesignCenter">
    <header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>稿件设计器</span>
      </div>

      <p>设计器</p>
      <span>用户</span>
    </header>
    <nav>
      <div class="first-group">标签组</div>
      <div class="labels">
        <div v-for="li in compList" :key="li" draggable="true" @dragstart="onDragStart" @drag="isEnter = true">
          {{ li }}
        </div>
      </div>
    </nav>
    <main>
      <div class="design-header">
        <el-button-group>
          <el-button @click="addDraftShow = true">新建稿纸</el-button>
          <el-button @click="dialogVisible = true">选择稿纸</el-button>
          <el-button type="primary">预览</el-button>
          <el-button @click="resetDefault">清空</el-button>
        </el-button-group>
      </div>
      <div
        v-if="!addDraftShow"
        class="design-container"
        :class="[{isEnter: isEnter}]"
        @dragover="
          e => {
            e.preventDefault()
          }
        "
        @dragstart="onDragStart"
        @drop="onDrop"
      >
        <!--        <div class="item" draggable="true" @dragstart="e=>onDragStartC(e,item)" @drop="e=>onDropC(e,item)"-->
        <!--             @dragover="(e)=>{e.preventDefault()}" v-for="(item, index) in items" :key="item.id" :style="item.style"-->
        <!--             @click="selectedItem(index)" :class="currentIndex === index ? 'isActive': ''">-->
        <!--          <div :is="item.name"></div>-->
        <!--        </div>-->
      </div>
      <div class="initGrid" v-else>
        <el-row type="flex" :gutter="20" justify="center">
          <el-col :span="12">
            <h3 style="text-align: center;">行</h3>
            <el-input-number
              v-model="rowNum"
              @change="draftChangeRowCol('row')"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="12">
            <h3 style="text-align: center;">列</h3>
            <el-input-number
              v-model="colNum"
              @change="draftChangeRowCol('col')"
              :min="1"
              :max="24"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <div class="show-grid" ref="showGrid" v-if="showList.length>0">
          <div
            v-for="(li, index) in showList"
            :style="li.style"
            @click="selectedItem(index)"
            :key="index"
            :class="currentIndex === index ? 'isActive' : ''"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
      <div class="design-footer"></div>
    </main>
    <aside>
      <h3>设置</h3>
      <div>
        占===<el-input-number
          v-model="unitRow"
          @change="unitChangeRowCol('row')"
          :min="1"
          :max="rowNum"
          label="描述文字"
        ></el-input-number
        >===行
      </div>
      <div>
        占===<el-input-number
          v-model="unitCol"
          @change="unitChangeRowCol('col')"
          :min="1"
          :max="colNum"
          label="描述文字"
        ></el-input-number
        >===列
      </div>
    </aside>
    <footer>页脚</footer>
    <el-dialog title="选择稿纸" center :visible.sync="dialogVisible" width="50%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已有稿纸" name="first">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="新增稿纸" name="second"> </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const componentsContext = require.context('../components/draft', true, /\.vue$/)
const compList = componentsContext.keys().map(key => componentsContext(key).default.name)
import _ from 'lodash'
export default {
  name: 'DesignCenter',
  data() {
    return {
      compList,
      items: [],
      isEnter: false,
      currentIndex: 0,
      dialogVisible: false,
      activeName: 'second',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      currentPage4: 4,
      rowColObj: {
        rowNum: 2,
        colNum: 2,
        unitCol: 1,
        unitRow: 1,
      },
      rowNum: 2,
      colNum: 2,
      unitCol: 1,
      unitRow: 1,
      showList: [],
      defaultList: [
        {
          style: {
            gridColumnStart: '1 span',
            gridRowStart: '1 span',
            height: '200px',
            // zIndex: 1
          }
        },
        {
          style: {
            gridColumnStart: '1 span',
            gridRowStart: '1 span',
            height: '50px',
          }
        },
        {
          style: {
            gridColumnStart: '1 span',
            gridRowStart: '1 span'
          }
        },
        {
          style: {
            gridColumnStart: '1 span',
            gridRowStart: '1 span'
          }
        }
      ],
      addDraftShow: true
    }
  },
  created() {
    this.showList = JSON.parse(JSON.stringify(this.defaultList))
  },
  methods: {
    resetDefault(){
      this.showList = JSON.parse(JSON.stringify(this.defaultList))
      this.rowNum= 2
        this.colNum= 2
        this.unitCol= 1
        this.unitRow= 1
      // grid-template-columns: repeat(2, 1fr);
      // grid-template-rows: repeat(2, 50px);
      this.$refs.showGrid.style.gridTemplateColumns = 'repeat(2, 1fr)'
      this.$refs.showGrid.style.gridTemplateRows = 'repeat(2, 50px)'
    },
    selectedItem(index) {
      this.currentIndex = index
      this.unitRow = this.showList[index].style.gridRowStart.split(' ')[0]
      this.unitCol = this.showList[index].style.gridColumnStart.split(' ')[0]
    },
    draftChangeRowCol(type) {
      let obj = {
        style: {
          gridColumnStart: '1 span',
          gridRowStart: '1 span'
        }
      }
      if (type === 'row') {
        this.rowNum = this.rowNum++
        console.log(this.$refs.showGrid.style.gridTemplateRows)
        this.$refs.showGrid.style.gridTemplateRows = `repeat(${this.rowNum},50px)`
      } else {
        this.colNum = this.colNum++
        this.$refs.showGrid.style.gridTemplateColumns = `repeat(${this.colNum},1fr)`
      }
      // let n = this.rowNum * this.colNum
      // 新增一行, 那么数量新增,当前colNum,
      let n = type === 'row' ? this.colNum : this.rowNum
      _.times(n, () => {
        this.showList.push(obj)
      })
    },
    unitChangeRowCol(type) {
      // 两个判断,一个是行数,超过表格的行数,是直接新增
      if (type === 'row') {
        this.showList[this.currentIndex].style.gridRowStart = this.unitRow + ' span'
        this.showList[this.currentIndex].style.gridColumnStart = this.unitCol + ' span'
      } else {
        this.showList[this.currentIndex].style.gridRowStart = this.unitRow + ' span'
        this.showList[this.currentIndex].style.gridColumnStart = this.unitCol + ' span'
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick() {},
    onDragStart(e) {
      this.isEnter = true
      console.log('开始拖拽', e.target.innerText)
      e.dataTransfer.setData('name', e.target.innerText)
    },
    onDrop(e) {
      this.isEnter = false
      console.log(e.dataTransfer.getData('name'))
      this.items = this.items.concat(e.dataTransfer.getData('name'))
      console.log('放下', e)
    },

    onDragStartC(e, item) {
      // e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.setData('item', JSON.stringify(item))
      console.log('>>拖拽开始', item)
    },
    onDropC(e, item) {
      // e.preventDefault()
      e.stopPropagation()
      // 交换位置
      let pre = JSON.parse(e.dataTransfer.getData('item'))
      let preIndex = this.items.findIndex(x => x.id === pre.id)
      let currentIndex = this.items.findIndex(x => x.id === item.id)
      console.log(preIndex, currentIndex)
      this.$set(this.items, preIndex, item)
      this.$set(this.items, currentIndex, pre)
      // this.items[preIndex] = item
      // this.items[currentIndex] = pre
      console.log(this.items)
      console.log('>>>拖拽结束', e.target)
    }
  }
}
</script>

<style lang="scss" scoped>
.DesignCenter {
  display: grid;
  height: 100vh;
  grid-template-columns: 300px auto 300px;
  grid-template-rows: 60px auto 60px;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  grid-gap: 1px;
  background-color: $--draft-color;
  $list: header nav main aside footer;
  @each $h in $list {
    #{$h} {
      grid-area: #{$h};
      background-color: $--color-white;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    img {
      width: 40px;
    }
  }

  nav {
    text-align: left;
    padding: 10px;

    .first-group {
      font-size: 24px;
      line-height: 2em;
    }

    > .labels {
      display: flex;
      flex-flow: wrap row;

      > div {
        display: inline-block;
        background-color: #fff;
        padding: 5px 10px;
        border: 1px dashed darken($--draft-color, 20%);
        border-radius: 5px;
        margin: 0 10px 10px 0;

        &:hover {
          border-color: $--primary-color;
          color: $--primary-color;
          cursor: pointer;
        }
      }
    }
  }

  main {
    > .design-header {
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
    }
    > .initGrid {
      min-height: 900px;
      padding: 20px;
      .show-grid {
        margin-top: 40px;
        background-color: $--draft-color;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        //grid-template-rows: repeat(2, 50px);
        border: 1px solid $--draft-color;
        grid-gap: 1px;
        > div {
          background-color: #fff;
          cursor: pointer;
          line-height: 50px;
          &:hover {
            background-color: #f0f0f0;
          }
          &.isActive {
            border: 1px solid #f00;
            //box-shadow: 0 0 5px #f00;
            //z-index: 1000;
          }
          &.isEnter {
            border: 1px dashed red;
          }
        }
      }
    }
    > .design-container {
      margin: 5px 20px 0;
      border: 1px dashed #42b983;
      //border-radius: 5px;
      min-height: 900px;
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      grid-template-rows: 50px;
      grid-gap: 1px;
      > div {
        background-color: #fff;
      }

      > div:hover {
        cursor: pointer;
        background-color: #e5e5e5;
      }

      > div.isActive {
        //border: 2px solid orchid;
        box-shadow: 0 0 5px red inset!important;
        background-color: yellowgreen;
        z-index: 1000;
      }

      &.isEnter {
        border: 1px dashed red;
      }
    }
  }
  aside {
    > div {
      margin-top: 20px;
    }
  }
}
</style>
