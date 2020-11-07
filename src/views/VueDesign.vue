<template>
  <el-container>
    <el-header
      style="border-bottom: 1px solid #e5e5e5;display: flex;justify-content: space-between;align-items: center">
      <div class="logo"><img src="../assets/img/logo.jpg" alt=""></div>
      <div>设计器</div>
      <div>邹智睿</div>
    </el-header>
    <el-container>
      <el-aside width="250px" style="padding: 10px;">

        <!--        <el-card>-->
        <h3>控件区域</h3>
        <el-collapse v-model="activeNames" @change="handleChange">
          <div style="height: 740px">
            <el-scrollbar style="height: 100%">
              <el-collapse-item title="常用标签" name="1" v-if="designType !== 'label'">

                <!--            <div v-for="li in compList" :key="li" draggable="true" @dragstart="onDragStart" @drag="isEnter = true">-->
                <!--              {{ li }}-->
                <!--            </div>-->
                <div v-for="li in labels" :key="li.label" draggable="true" :label="li" @dragstart="onDragStart" @drag="isEnter = true">
                  {{ li.label }} <span style="display: none">{{li}}</span>
                </div>
                <!--            <div v-for="li in labels" :key="li.label" draggable="true" label="li" @dragstart="onDragStart" @drag="isEnter = true">-->
                <!--              {{ li.label }}-->
                <!--            </div>-->

              </el-collapse-item>
              <el-collapse-item title="通用组件" name="2">
                <div></div>
              </el-collapse-item>
            </el-scrollbar>
          </div>

        </el-collapse>
        <!--        </el-card>-->

      </el-aside>
      <el-container>
        <el-main>
          <div style="display:flex;justify-content: space-between;align-items: center;margin-top: -10px;">
            <el-radio-group v-model="designType">
              <el-radio-button label="label">标签</el-radio-button>
              <el-radio-button label="draft">稿纸</el-radio-button>
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="page">页面</el-radio-button>
            </el-radio-group>
            <h3>{{ typeMap[this.designType] }}设计</h3>
            <el-button-group>
              <el-button @click="addItemDynamically" type="primary">新增单元格</el-button>
              <el-button @click="save" type="primary">保存</el-button>
              <el-button @click="preview">预览</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button @click="generateJson">JSON</el-button>
            </el-button-group>
          </div>
          <div class="design-area" style="height: 740px;">
            <el-scrollbar style="height:100%">
              <el-card style="margin-top: 20px;">
                <div class="draft-border" style="height: 100%;">
                  <div style="display:flex;justify-content:center;align-items: center;width: 360px;margin: 20px auto 0;">
                    <h4 style="width: 100px;color:#666;">{{typeMap[designType]}}名称</h4>
                    <el-input v-model="input"></el-input>
                  </div>

                  <grid-layout
                    :layout.sync="initDataMap[designType]"
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
                    <grid-item v-for="(item, itemIndex) in initDataMap[designType]" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                               :i="item.i" :key="item.i">
                      <div :title="itemIndex" :class="currentIndex === itemIndex ? 'isActive': ''"
                           @click="selectedItem(itemIndex)" @dragover="(e)=>{e.preventDefault()}" @drop="onDrop"
                           style="height: 100%;">
                        {{ item.i }}
                        <span v-if="designType === 'label'">{{item.cName}}</span>
                        <span v-else>{{ item.i }}</span>

                        <component :is="item.cName" v-if="designType !=='label' && item.cName"></component>
                      </div>

                    </grid-item>
                  </grid-layout>
                </div>
              </el-card>
            </el-scrollbar>
          </div>
        </el-main>

      </el-container>
      <el-aside width="200px" style="background-color:#fff;padding: 10px;text-align:center;">
        <h3>配置区</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础配置" name="first">
            <el-form ref="form" :model="form">
              <el-form-item label="填入内容">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="关联相关对话框">
                <el-radio-group v-model="form.resource">
                  <el-radio :label="li.name" v-for="li in dialogs" :key="li.name" style="display: block;text-align:left;line-height: 2em;">{{li.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
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
import Ele from "@/views/draft/components/ele";
const componentsContext = require.context('../components/draft', true, /\.vue$/)
const compList = componentsContext.keys().map(key => componentsContext(key).default.name)
import VueGridLayout from 'vue-grid-layout'
import labels from "@/const/label";
import dialogs from '@/const/dialog'
const typeMap = {
  label: '标签',
  draft: '稿纸',
  form: '表单',
  page: '页面'
}
const testLayout = [
  {cName: '', x: 0, y: 0, w: 12, h: 2, i: '0'},
  {cName: '', x: 2, y: 0, w: 2, h: 4, i: '1'},
  {cName: '', x: 4, y: 0, w: 2, h: 5, i: '2'},
  {cName: '', x: 6, y: 0, w: 2, h: 3, i: '3'},
  {cName: '', x: 8, y: 0, w: 2, h: 3, i: '4'},
  {cName: '', x: 10, y: 0, w: 2, h: 3, i: '5'},
  {cName: '', x: 0, y: 5, w: 2, h: 5, i: '6'},
  {cName: '', x: 2, y: 5, w: 2, h: 5, i: '7'},
  {cName: '', x: 4, y: 5, w: 2, h: 5, i: '8'},
  {cName: '', x: 6, y: 3, w: 2, h: 4, i: '9'},
  {cName: '', x: 8, y: 4, w: 2, h: 4, i: '10'},
  {cName: '', x: 10, y: 4, w: 2, h: 4, i: '11'},
  {cName: '', x: 0, y: 10, w: 2, h: 5, i: '12'},
  {cName: '', x: 2, y: 10, w: 2, h: 5, i: '13'},
  {cName: '', x: 4, y: 8, w: 2, h: 4, i: '14'},
  {cName: '', x: 6, y: 8, w: 2, h: 4, i: '15'},
  {cName: '', x: 8, y: 10, w: 2, h: 5, i: '16'},
  {cName: '', x: 10, y: 4, w: 2, h: 2, i: '17'},
  {cName: '', x: 0, y: 9, w: 2, h: 3, i: '18'},
  {cName: '', x: 2, y: 6, w: 2, h: 2, i: '19'}
]
const labelLayout = [
  {cName: '', x: 0, y: 0, w: 2, h: 2, i: '0'},
  {cName: '', x: 2, y: 0, w: 2, h: 4, i: '1'},
  {cName: '', x: 4, y: 0, w: 2, h: 5, i: '2'},
]

const initDataMap = {
  label: labelLayout,
  draft: testLayout,
  form: '表单',
  page: '页面'
}
export default {
  name: 'VueGridLayout',
  components: {
    Ele,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      labelLayout,
      designType: 'label',
      typeMap,
      initDataMap,
      layout: testLayout,
      index: 0,
      activeName: 'first',
      activeNames: ['1'],
      currentIndex: -1,
      compList,
      isEnter: false,
      labels,
      dialogs,
      input: ''
    }
  },
  mounted() {
    this.index = this.initDataMap[this.designType].length;
  },
  methods: {
    preview(){},
    reset(){},
    generateJson(){},
    onDragStart(e) {
      this.isEnter = true
      console.log('开始拖拽', e.target.children[0].innerText)
      // console.log('开始拖拽', e.target.children[0].innerText)
      e.dataTransfer.setData('label', e.target.children[0].innerText)
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
    selectedItem(index) {
      this.currentIndex = index
    },
    handleChange(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 右侧配置
    onSubmit(){
      this.initDataMap[this.designType][this.currentIndex].cName = this.form.name
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log('Updated layout: ', newLayout)
    },
    save(){},
    addItemDynamically: function () {
      let item = {
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12),
        w: 2,
        h: 2,
        i: this.index + "",
      }
      this.index++;
      this.initDataMap[this.designType].push(item);
    },
    addItem: function () {
      // let self = this;
      //console.log("### LENGTH: " + this.layout.length);
      let item = {"x": 0, "y": 0, "w": 2, "h": 2, "i": this.index + "", whatever: "bbb"};
      this.index++;
      this.layout.push(item);
    },
  }
}
</script>

<style lang="scss" scoped>
.logo {
  img {
    width: 40px;
    height: 40px;
  }
}
:v-deep .design-area .el-scrollbar__wrap{
  overflow-x: hidden!important;
}
.draft-border {
  border: 1px solid $--border-color-base;
  max-width: 994px;
  min-width: 900px;
  margin: 0 auto;
}

.vue-grid-layout {
  width: 865px;
  margin: 20px auto 20px;
  background-color: #e5e5e5;
  min-height: 1000px;
  //height: 300px;
  overflow: hidden;

  .vue-grid-item {
    > div {
      &:hover {
        color: $--color-primary;
        border-color: $--color-primary-light-7;
        background-color: $--color-primary-light-9;
      }

      background-color: #fff;

      &.isActive {
        //border: 1px solid #f00;
        box-shadow: 0 0 5px 1px $--color-primary-light-1 inset !important;
        //z-index: 1000;
      }
    }

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

footer, header, aside {
  background-color: $--color-white;
}

footer {
  height: 30px!important;
}
</style>
