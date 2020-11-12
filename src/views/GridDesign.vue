<template>
  <div class="GridDesign">
    <nav class="viewport-height">
      <el-scrollbar style="height: 100%;">
        <div style="padding: 10px;">
          <h3>控件</h3>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="常用标签" name="1">
              <div v-for="li in labels" :key="li.label" draggable="true" :label="li" @dragstart="onDragStart" @drag="isEnter = true">
                {{ li.label }} <span style="display: none">{{li}}</span>
              </div>
            </el-collapse-item>
            <el-collapse-item title="常用稿纸" name="2">
              <div v-for="li in commons" :key="li.name" draggable="true" :label="li" @dragstart="onDragStart" @drag="isEnter = true">
                {{ li.name }} <span style="display: none">{{li}}</span>
              </div>
            </el-collapse-item>
            <el-collapse-item title="通用组件" name="3">
              <div v-for="li in commons" :key="li.name" draggable="true" :label="li" @dragstart="onDragStart" @drag="isEnter = true">
                {{ li.name }} <span style="display: none">{{li}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

      </el-scrollbar>
    </nav>
    <main class="viewport-height">
      <header>
        <el-radio-group v-model="designType">
          <el-radio-button label="label">标签</el-radio-button>
          <el-radio-button label="draft">稿纸</el-radio-button>
          <el-radio-button label="form">表单</el-radio-button>
          <el-radio-button label="page">页面</el-radio-button>
        </el-radio-group>
        <h3>设计</h3>
        <el-button-group>
          <el-button @click="addItemDynamically" type="primary">新增单元格</el-button>
          <el-button @click="save" type="primary">保存</el-button>
          <el-button @click="preview">预览</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="generateJson">JSON</el-button>
        </el-button-group>
      </header>
      <el-scrollbar style="height: calc(100vh - 100px);box-shadow: 0 1px 5px #e5e5e5">
        <el-card style="margin: 0 20px 40px;">
          <grid-layout
            :layout.sync="initDataMap[designType]"
            :col-num="colNum"
            :row-height="rowHeight"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[parseInt(marginX), parseInt(marginY)]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent"
          >
            <grid-item
              v-for="(item, itemIndex) in initDataMap[designType]"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <i class="el-icon-delete" @click="deleteItem(itemIndex)"></i>
              <div
                class="grid-item-slot"
                :contenteditable="designType === 'label'"
                :title="itemIndex"
                :class="currentIndex === itemIndex ? 'isActive' : ''"
                @click="selectedItem(itemIndex)"
                @dragover="
                  e => {
                    e.preventDefault()
                  }
                "
                @drop="onDrop"
                style="height: 100%;"
                @input="testContenteditable"
              >

                {{ item.i }}
<!--                <span v-if="designType === 'label'" contenteditable="true">{{ item.cName }}</span>-->
<!--                <span v-else>{{ item.i }}</span>-->

<!--                <component :is="item.cName" v-if="designType !== 'label' && item.cName"></component>-->
              </div>
            </grid-item>
          </grid-layout>
        </el-card>
      </el-scrollbar>
      <el-dialog
        center
        :title="previewDesign? '预览': '生成JSON'"
        :visible.sync="dialogVisible"
        width="1000px">
        <div class="grid-test" v-if="previewDesign">
          <div v-for="(li,index) in result" :key="li.gridArea" :style="{gridArea: li.gridArea}">{{li.gridArea}} -- {{index}}</div>
        </div>
        <div v-else>
          <pre>{{ JSON.stringify(result, null, 4)  }}</pre>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </main>
    <aside class="viewport-height">
      <h3>配置</h3>
      <el-tabs v-model="activeName" @tab-click="handleClickTabs" style="padding: 0 15px;">
        <el-tab-pane label="稿纸配置" name="first">
          <div>
            行高<el-input-number style="margin-top: 10px;" v-model="rowHeight" @change="handleChangeRowHeight" :min="1" :max="1000" label="描述文字"></el-input-number>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
            字体颜色<el-color-picker style="margin-left: 10px;" v-model="fontColor" @change="changeColor(1)"></el-color-picker>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
            边框颜色<el-color-picker style="margin-left: 10px;" v-model="borderColor"  @change="changeColor(2)"></el-color-picker>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单项配置" name="second">

        </el-tab-pane>
      </el-tabs>
    </aside>
    <footer>
      footer
    </footer>
  </div>
</template>

<script>
import GridLayout from '@/components/vue-grid-layout/GridLayout'
import GridItem from '@/components/vue-grid-layout/GridItem'
import {draftData, labelData} from '@/views/draft/config/const'
import labels from '@/const/label'
import commons from '@/const/elementComponent'
import _ from 'lodash'
const JSONFile = require.context("./draft/config", true, /\.json$/);
console.log(JSONFile)
JSONFile.keys().forEach(item=>{
  console.log(item)
  console.log(JSONFile(item))
})
// 通过这个方式拿到已有稿纸
const initDataMapImport = {
  label: labelData,
  draft: draftData,
  form: '表单',
  page: '页面'
}
let xx = new Array(10000).fill('1')
export default {
  name: 'GridDesign',
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      xx,
      activeNames: ['1'],
      designType: 'draft',
      initDataMap: initDataMapImport,
      initDataMapImport,
      result: [],
      currentIndex: 0,
      //****
      index: 0,
      colNum: 24,
      rowHeight: 36,
      marginX: 1,
      marginY: 1,
      //****
      labels,
      commons,
      isEnter: false,
      dialogVisible: false,
      previewDesign: false,
      fontColor: '#000000',
      borderColor: '#e5e5e5',
      activeName: 'first',

    }
  },
  mounted() {
    this.index = this.initDataMap[this.designType].length;
    this.initDataMap = this.initDataMapImport
  },
  methods: {
    changeColor(type) {
      if (type === 1) {
          let grid = document.querySelectorAll('.grid-item-slot')
          grid.forEach(item=>{
            item.style.color = this.fontColor
          })
      } else {
          let grid = document.querySelector('.vue-grid-layout')
          grid.style.backgroundColor = this.borderColor
      }
    },
    handleClickTabs(tab, event) {
      console.log(tab, event);
    },
    //*******
    onDragStart(e) {
      this.isEnter = true
      console.log('开始拖拽', e.target.children[0].innerText)
      // console.log('开始拖拽', e.target.children[0].innerText)
      e.dataTransfer.setData('label', e.target.children[0].innerText)
    },
    //******
    selectedItem(index) {
      this.currentIndex = index
    },
    deleteItem(index){
      this.initDataMap[this.designType].splice(index,1)
    },
    testContenteditable(e) {
      console.log(e.target)
    },
    onDrop(e) {
      // this.isEnter = false
      console.log(e.dataTransfer.getData('label'))
      let label = JSON.parse(e.dataTransfer.getData('label'))
      console.log(typeof label)
      let index = Number(e.target.title)
      console.log(index)
      // console.log(this.layout[index].cName = name);
      // 对应组件名称
      // console.log(this.layout[index].cName = label.key);
      // this.items = this.items.concat(e.dataTransfer.getData('name'))
      e.target.innerText = label.label
      console.log('放下', e)
    },
    //******
    //******
    addItemDynamically() {
      let item = {
        x: (this.initDataMap[this.designType].length * 2) % (this.colNum || 24),
        y: this.initDataMap[this.designType].length + (this.colNum || 24),
        w: 2,
        h: 2,
        i: this.index + "",
      }
      this.index++;
      this.initDataMap[this.designType].push(item);
    },
    save() {},
    preview() {
      this.result = _.sortBy(this.initDataMap[this.designType], ['y', 'x'])
      this.result.forEach(item => {
        item.gridArea = item.y + 1 + '/' + (item.x + 1) + '/' + (item.y + 1 + item.h) + '/' + (item.x + 1 + item.w)
      })
      // 先排序的算法才是正确的
      let rows = this.result[this.result.length - 1].y + this.result[this.result.length - 1].h - 1
      this.dialogVisible = true
      this.previewDesign = true
      setTimeout(()=>{
        let grid = document.querySelector('.grid-test')
        grid.style.gridTemplateRows = `repeat(${rows}, 36px)`
      },0)
    },
    reset() {
      this.initDataMap = this.initDataMapImport
    },
    generateJson() {
      this.result = _.sortBy(this.initDataMap[this.designType], ['y', 'x'])
      this.result = this.result.map(item => {
         item.gridArea = item.y + 1 + '/' + (item.x + 1) + '/' + (item.y + 1 + item.h) + '/' + (item.x + 1 + item.w)
        return {
          gridArea: item.gridArea
        }
      })
      this.dialogVisible = true
      this.previewDesign = false
    },
    //****
    layoutUpdatedEvent() {},
    handleChange() {

    },
    handleChangeRowHeight(val){
      this.rowHeight = val
    }
  }
}
</script>

<style lang="scss" scoped>
.GridDesign {
  display: grid;
  grid-template-columns: 250px auto 220px;
  grid-template-rows: auto 30px;
  background-color: #ccccee;
  grid-gap: 1px;
  > div {
    background-color: #fff;
  }
  .viewport-height {
    height: calc(100vh - 31px);
    background-color: #fff;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  div::v-deep .el-collapse-item__wrap > .el-collapse-item__content {
    display: flex !important;
    flex-flow: wrap row !important;
    justify-content: flex-start;

    > div {
      display: inline-flex;
      background-color: #fff;
      padding: 5px 10px;
      border: 1px dashed darken($--draft-color, 20%);
      border-radius: 5px;
      margin: 0 10px 10px 0;

      &:hover {
        border-color: $--primary-color;
        color: $--primary-color;
        cursor: move;
      }
    }
  }
  .vue-grid-layout {
    width: 865px;
    margin: 0 auto;
    background-color: #e5e5e5;
    .vue-grid-item {
      > div {
        &:hover {
          color: $--color-primary;
          border-color: $--color-primary-light-7;
          background-color: $--color-primary-light-9;
        }

        background-color: #fff;
        &[contenteditable=true]:hover{
          outline: none;
        }
        &[contenteditable=true]:focus{
          outline: none;
          //border: 1px solid cyan;
        }
        &.isActive {
          //border: 1px solid #f00;
          box-shadow: 0 0 5px 1px $--color-primary-light-1 inset !important;
          background-color: #fff;
          //z-index: 1000;
        }
      }

    }
  }
  .grid-test{
    width: 865px;
    margin: 0 auto 20px;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(var(--row-num), var(--row-height));
    background-color: $--draft-color;
    border: 1px solid $--draft-color;
    grid-gap: 1px;
    >div{
      background-color: #fff;
    }
  }
  header {
    height: 60px;
    padding: 20px;
    @include flexbox;
  }
  footer {
    grid-column: 3 span;
    background-color: #fff;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 -1px 5px #e5e5e5;
  }
}
</style>
