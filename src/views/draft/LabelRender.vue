<template>
  <div>
    <div class="BabelRender">
      <ele v-for="(li,index) in labelData.group" :style="li.style" :key="index" :nativeOn="li.nativeOn" :on="li.on">{{li.nodeValue}}</ele>
    </div>
    <SelectBox ref="selectBox" :attrs="labelData.attrs" @getValue="getValue"></SelectBox>
  </div>
</template>

<script>
// import babelData from './config/babelData'
// import babelM from "@/views/draft/mixins/babelM";
import {isCPC} from './config/isCPC'
import SelectBox from "@/views/draft/components/SelectBox";
import Ele from "@/views/draft/components/ele";
export default {
  name: 'LabelRender',
  components: {Ele, SelectBox},
  // mixins: [babelM],
  data() {
    return {
      labelData: {}
    }
  },
  created() {
    this.labelData = isCPC(this)
  },
  // render() {
  //   // let _data = this.$data
  //   // console.log(isCPC(this))
  //   console.log(this._self)
  //   let _this = this._self
  //   let list = isCPC(_this).group
  //   let attrs = isCPC(_this).attrs
  //   console.log(isCPC(_this))
  //   return (
  //     <div>
  //       <div class="BabelRender">
  //         {list.map(li => {
  //           return (
  //             <ele style={li.style} nativeOn={li.nativeOn} on={li.on}>
  //               {li.nodeValue}
  //             </ele>
  //           )
  //         })}
  //       </div>
  //       <SelectBox ref="selectBox" attrs={attrs} on={{getValue: this.getValue}}></SelectBox>
  //     </div>
  //   )
  // },
  methods: {
    $_handleClick(){
      this.$refs.selectBox.outerVisible =true
    },
    getValue(value){
      console.log(value)
      this.labelData.group[3].nodeValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.BabelRender {
  background-color: yellowgreen;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px;
  grid-gap: 1px;
  > div {
    background-color: #fff;
    line-height: 50px;
  }
}
</style>
