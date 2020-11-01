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
      <draggable v-model="arr1" @end="end1" :options="{group:{name: 'itxst',pull:'clone'},sort: true}"  animation="300"  :move="onMove">
        <transition-group>
          <div :class="item.id==1?'item forbid':'item'" v-for="item in arr1" :key="item.id">{{item.name}}</div>
        </transition-group>
      </draggable>
    </nav>
    <main>
      <draggable v-model="arr2" @end="end2" group="itxst"  animation="300" :move="onMove">
        <transition-group>
          <div :class="item.id==12?'item2 forbid':'item2'" v-for="item in arr2" :key="item.id">{{item.name}}</div>
        </transition-group>
      </draggable>
    </main>
    <aside>属性</aside>
    <footer>页脚</footer>
  </div>
</template>

<script>
const componentsContext = require.context("../components/draft", true, /\.vue$/);
const compList = componentsContext.keys().map(key=>componentsContext(key).default.name)
import Draggable from 'vuedraggable'
export default {
  name: "DesignCenter",
  components: {
    Draggable
  },
  data() {
    return {
      arr1:[
        { id: 1, name: 'www.itxst.com（不允许停靠）' },
        { id: 2, name: 'www.jd.com' },
        { id: 3, name: 'www.baidu.com' },
        { id: 5, name: 'www.google.com' },
        { id: 4, name: 'www.taobao.com（不允许拖拽）' }
      ],
      arr2:[
        { id: 11, name: '常用菜单' },
      ],
      moveId:-1
    }
  },
  created() {

  },
  methods: {
    //左边往右边拖动时的事件
    end1(e){
      console.log(e)
      var that=this;
      var  items=this.arr2.filter(function(m){
        return  m.id==that.moveId
      })
      //如果左边
      if(items.length<2) return;
      this.arr2.splice(e.newDraggableIndex, 1)
    },
    //右边往左边拖动时的事件
    end2(e){
      console.log(e)
      var that=this;
      var  items=this.arr1.filter(function(m){
        return  m.id==that.moveId
      })
      //如果左边
      if(items.length<2) return;
      this.arr1.splice(e.newDraggableIndex, 1)
    },
    //move回调方法
    onMove(e,originalEvent){
      this.moveId=e.relatedContext.element.id;
      //不允许停靠
      if (e.relatedContext.element.id == 1) return false;
      //不允许拖拽
      if (e.draggedContext.element.id == 4) return false;
      if (e.draggedContext.element.id == 11) return false;
      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
.DesignCenter {
  display: grid;
  height: 100vh;
  grid-template-columns: 200px auto 200px;
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

  .name-list{
    >li{
      line-height: 2em;
      font-size: 16px;
      text-align: left;
      list-style: none;
    }
  }
  .xxx{
    min-height: 800px;
    background-color: red;
  }
}
.itxst {
  margin: 10px;
  text-align :left;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}
.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  text-align: left;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item2 {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: pink;
  text-align: left;
}
.item2 + .item2 {
  border-top: none;
  margin-top: 6px;
}

.item2:hover {
  outline: solid 1px #ddd;
  cursor: move;
}
</style>
