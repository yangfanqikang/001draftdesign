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
        <el-card style="margin: 0 20px;">
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
              <div
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
<!--                {{ item.i }}-->
                <span v-if="designType === 'label'" contenteditable="true">{{ item.cName }}</span>
                <span v-else>{{ item.i }}</span>

                <component :is="item.cName" v-if="designType !== 'label' && item.cName"></component>
              </div>
            </grid-item>
          </grid-layout>
        </el-card>
      </el-scrollbar>
    </main>
    <aside class="viewport-height">
      <h3>配置</h3>
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
const initDataMap = {
  label: labelData,
  draft: draftData,
  form: '表单',
  page: '页面'
}
export default {
  name: 'GridDesign',
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      activeNames: ['1'],
      designType: 'draft',
      initDataMap,
      currentIndex: 0,
      //****
      index: 0,
      colNum: 24,
      rowHeight: 30,
      marginX: 1,
      marginY: 1,
      //****
      labels,
      commons,
      isEnter: false,
    }
  },
  mounted() {
    this.index = this.initDataMap[this.designType].length;
  },
  methods: {
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
    preview() {},
    reset() {},
    generateJson() {},
    //****
    layoutUpdatedEvent() {},
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.GridDesign {
  display: grid;
  grid-template-columns: 250px auto 200px;
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
