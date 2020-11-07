<template>
  <el-container>
    <el-header style="border-bottom: 1px solid #e5e5e5;display: flex;justify-content: space-between;align-items: center">
      <div class="logo"><img src="../assets/img/logo.jpg" alt=""></div>
      <div>设计器</div>
      <div>邹智睿</div>
    </el-header>
    <el-container>
      <el-aside width="250px" style="padding: 10px;">

<!--        <el-card>-->
          <h3>控件区域</h3>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="常用标签" name="1">

              <div v-for="li in compList" :key="li" draggable="true" @dragstart="onDragStart" @drag="isEnter = true">
                {{ li }}
              </div>

            </el-collapse-item>
            <el-collapse-item title="通用组件" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
          </el-collapse>
<!--        </el-card>-->

      </el-aside>
      <el-container>
        <el-main>
          <el-container style="justify-content: space-between">
            <el-radio-group v-model="designType">
              <el-radio-button label="label">标签设计</el-radio-button>
              <el-radio-button label="draft">稿纸设计</el-radio-button>
              <el-radio-button label="form">表单设计</el-radio-button>
              <el-radio-button label="page">页面设计</el-radio-button>
            </el-radio-group>
            <el-button-group>
              <el-button @click="addItem">预览</el-button>
              <el-button @click="addItem">清空</el-button>
              <el-button @click="addItem">生成JSON</el-button>
              <el-button @click="addItemDynamically">新增一项</el-button>
            </el-button-group>
          </el-container>
          <el-card style="margin-top: 20px;">
            <h3>{{typeMap[this.designType]}}</h3>
            <div class="draft-border">
              <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="30"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[1, 1]"
                :use-css-transforms="true"
                @layout-updated="layoutUpdatedEvent"
              >
                <grid-item v-for="(item, itemIndex) in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                  <div :title="itemIndex" :class="currentIndex === itemIndex ? 'isActive': ''" @click="selectedItem(itemIndex)" @dragover="(e)=>{e.preventDefault()}" @drop="onDrop" style="height: 100%;">
                    {{ item.i }}
                    <component :is="item.cName" v-if="item.cName"></component>
                  </div>

                </grid-item>
              </grid-layout>
            </div>

          </el-card>
        </el-main>

      </el-container>
      <el-aside width="200px" style="background-color:#fff;padding: 10px;text-align:center;">
          <h3>配置区</h3>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础配置" name="first">基础配置</el-tab-pane>
            <el-tab-pane label="高级配置" name="second">高级配置</el-tab-pane>
          </el-tabs>
      </el-aside>
    </el-container>
    <el-footer>
      页脚
    </el-footer>
  </el-container>
</template>

<script>
const componentsContext = require.context('../components/draft', true, /\.vue$/)
const compList = componentsContext.keys().map(key => componentsContext(key).default.name)
import VueGridLayout from 'vue-grid-layout'
const typeMap = {
  label: '标签',
  draft: '稿纸',
  form: '表单',
  page: '页面'
}
const testLayout = [
  {cName:'', x: 0, y: 0, w: 2, h: 2, i: '0'},
  {cName:'', x: 2, y: 0, w: 2, h: 4, i: '1'},
  {cName:'', x: 4, y: 0, w: 2, h: 5, i: '2'},
  {cName:'', x: 6, y: 0, w: 2, h: 3, i: '3'},
  {cName:'', x: 8, y: 0, w: 2, h: 3, i: '4'},
  {cName:'', x: 10, y: 0, w: 2, h: 3, i: '5'},
  {cName:'', x: 0, y: 5, w: 2, h: 5, i: '6'},
  {cName:'', x: 2, y: 5, w: 2, h: 5, i: '7'},
  {cName:'', x: 4, y: 5, w: 2, h: 5, i: '8'},
  {cName:'', x: 6, y: 3, w: 2, h: 4, i: '9'},
  {cName:'', x: 8, y: 4, w: 2, h: 4, i: '10'},
  {cName:'', x: 10, y: 4, w: 2, h: 4, i: '11'},
  {cName:'', x: 0, y: 10, w: 2, h: 5, i: '12'},
  {cName:'', x: 2, y: 10, w: 2, h: 5, i: '13'},
  {cName:'', x: 4, y: 8, w: 2, h: 4, i: '14'},
  {cName:'', x: 6, y: 8, w: 2, h: 4, i: '15'},
  {cName:'', x: 8, y: 10, w: 2, h: 5, i: '16'},
  {cName:'', x: 10, y: 4, w: 2, h: 2, i: '17'},
  {cName:'', x: 0, y: 9, w: 2, h: 3, i: '18'},
  {cName:'', x: 2, y: 6, w: 2, h: 2, i: '19'}
]
export default {
  name: 'VueGridLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      designType: 'draft',
      typeMap,
      layout: testLayout,
      index: 0,
      activeName: 'second',
      activeNames: ['1'],
      currentIndex: -1,
      compList,
      isEnter: false,
    }
  },
  mounted() {
    this.index = this.layout.length;
  },
  methods: {
    testClick(){
      debugger
    },
    onDragStart(e) {
      this.isEnter = true
      console.log('开始拖拽', e.target.innerText)
      e.dataTransfer.setData('name', e.target.innerText)
    },
    onDrop(e) {
      // this.isEnter = false
      console.log(e.dataTransfer.getData('name'))
      let name = e.dataTransfer.getData('name')
      console.log(e.target)
      let index = Number(e.target.title)
      console.log(index)
      console.log(this.layout[index].cName = name);
      // this.items = this.items.concat(e.dataTransfer.getData('name'))
      // e.target.innerText = str
      console.log('放下', e)
    },
    selectedItem(index){
      this.currentIndex = index
    },
    handleChange(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    layoutUpdatedEvent: function(newLayout) {
      console.log('Updated layout: ', newLayout)
    },
    addItemDynamically: function() {
      let item = {
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12),
        w: 2,
        h: 2,
        i: this.index+"",
      }
      this.index++;
      this.layout.push(item);
    },
    addItem: function() {
      // let self = this;
      //console.log("### LENGTH: " + this.layout.length);
      let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
      this.index++;
      this.layout.push(item);
    },
  }
}
</script>

<style lang="scss" scoped>
.logo{
  img{
    width: 40px;
    height: 40px;
  }
}
.draft-border{
  border: 1px solid $--border-color-base;
  max-width: 994px;
  min-width: 900px;
  margin: 0 auto;
  padding-top: 50px;
}
.vue-grid-layout {
  width: 865px;
  margin: 20px auto 20px;
  background-color: #e5e5e5;
  min-height: calc(100vh - 180px);
  .vue-grid-item{
    >div{
      &:hover {
        color: $--color-primary;
        border-color: $--color-primary-light-7;
        background-color: $--color-primary-light-9;
      }
      background-color: #fff;
      &.isActive {
        //border: 1px solid #f00;
        box-shadow: 0 0 5px 1px $--color-primary-light-1 inset!important;
        //z-index: 1000;
      }
    }

  }

}
.el-collapse-item__wrap>.el-collapse-item__content {
  display: flex!important;
  flex-flow: wrap row!important;
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
footer,header,aside{
  background-color: $--color-white;
}
</style>
