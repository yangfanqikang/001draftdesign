<template>
  <div class="DesignCenter">
    <header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>稿件设计器</span>
      </div>

      <p>设计器</p>
      <span>用户</span>
    </header>
    <nav>
      <div class="first-group">标签组</div>
      <div class="labels">
        <div v-for="li in compList" :key="li" draggable="true" @dragstart="onDragStart" @drag="isEnter=true">{{li}}</div>
      </div>

    </nav>
    <main>
      <div class="design-header">
        <el-button-group>
          <el-button type="primary">预览</el-button>
          <el-button type="primary">清空</el-button>
        </el-button-group>
      </div>
      <div class="design-container" :class="[{isEnter: isEnter}]" @dragover="(e)=>{e.preventDefault()}" @dragstart="onDragStart" @drop="onDrop">
        <div class="item" draggable="true" @dragstart="e=>onDragStartC(e,item)"  @drop="e=>onDropC(e,item)"  @dragover="(e)=>{e.preventDefault()}" v-for="(item, index) in items" :key="item.id" :style="item.style" @click="selectedItem(index)" :class="currentIndex === index ? 'isActive': ''">
          <div :is="item.name"></div>
        </div>
      </div>
      <div class="design-footer"></div>
    </main>
    <aside>属性</aside>
    <footer>页脚</footer>
  </div>
</template>

<script>
const componentsContext = require.context("../components/draft", true, /\.vue$/);
const compList = componentsContext.keys().map(key=>componentsContext(key).default.name)
export default {
  name: "DesignCenter",
  data() {
    return {
      compList,
      items: [
        {
          key:'',
          id: '1',
          name: 'Attach',
          style: {
            gridArea: '1/1/2/25',
            gridTemplateRows: '50px'
          }
        },
        {
          key:'',
          id: '2',
          name: 'AuditDrafter',
          style: {
            gridArea: '2/1/3/25',
            gridTemplateRows: '50px'
          }
        },
      ],
      isEnter: false,
      currentIndex: -1
    }
  },
  created() {

  },
  methods: {
    onDragStart(e){
      this.isEnter = true
      console.log('开始拖拽',e.target.innerText)
      e.dataTransfer.setData('name', e.target.innerText)
    },
    onDrop(e){
      this.isEnter = false
      console.log(e.dataTransfer.getData('name'))
      this.items = this.items.concat(e.dataTransfer.getData('name'))
      console.log('放下',e)
    },
    selectedItem(index){
      console.log('>>>>>>',index)
      this.currentIndex = index
    },
    onDragStartC(e, item){
      // e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.setData('item', JSON.stringify(item))
      console.log('>>拖拽开始', item)
    },
    onDropC(e, item){
      // e.preventDefault()
      e.stopPropagation()
      // 交换位置
      let pre = JSON.parse(e.dataTransfer.getData('item'))
      let preIndex = this.items.findIndex(x=> x.id === pre.id)
      let currentIndex = this.items.findIndex(x=> x.id === item.id)
      console.log(preIndex, currentIndex)
      this.$set(this.items, preIndex, item)
      this.$set(this.items, currentIndex, pre)
      // this.items[preIndex] = item
      // this.items[currentIndex] = pre
      console.log(this.items)
      console.log('>>>拖拽结束',e.target)
    }
  },
}
</script>

<style lang="scss" scoped>
.DesignCenter {
  display: grid;
  height: 100vh;
  grid-template-columns: 250px auto 200px;
  grid-template-rows: 60px auto 60px;
  grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
  grid-gap: 1px;
  background-color: $--draft-color;
  $list: header nav main aside footer;
  @each $h in $list{
    #{$h}{
      grid-area: #{$h};
      background-color: $--color-white;
    }
  }
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    img{
      width: 40px;
    }
  }
  nav{
    text-align: left;
    padding: 10px;
    .first-group{
      font-size: 24px;
      line-height: 2em;
    }
    >.labels{
      display: flex;
      flex-flow: wrap row;
      >div{
        display: inline-block;
        background-color: #fff;
        padding: 5px 10px;
        border: 1px dashed darken($--draft-color,20%);
        border-radius: 5px;
        margin: 0 10px 10px 0;
        &:hover{
          border-color: $--primary-color;
          color: $--primary-color;
          cursor: pointer;
        }
      }
    }

  }
  main{
    >.design-header{
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
    }
    >.design-container{
      margin: 5px 20px 0;
      border: 1px dashed #42b983;
      //border-radius: 5px;
      min-height: 900px;
      display: grid;
      grid-template-columns: repeat(24,1fr);
      grid-template-rows: 50px;
      grid-gap: 1px;
      background-color: yellow;
      >div{
        background-color: #fff;
      }
      >div:hover{
        cursor: pointer;
        background-color: #e5e5e5;
      }
      >div.isActive{
        border: 2px solid orchid;
      }
      &.isEnter{
        border: 1px dashed red;
      }
    }
  }
}
</style>
