<!--<template>-->
<!--  <div class="BabelRender">-->
<!--    BabelRender-->
<!--  </div>-->
<!--</template>-->

<script>
// import babelData from './config/babelData'
// import babelM from "@/views/draft/mixins/babelM";
import {isCPC} from './config/isCPC'
export default {
  name: 'BabelRender',
  // mixins: [babelM],
  data() {
    return {
      babelData: []
    }
  },
  created() {
    this.babelData = isCPC(this)
    console.log('......')
  },
  render() {
    // let _data = this.$data
    // console.log(isCPC(this))
    // console.log(this._self)
    // let _this = this._self

    let attrs = this.babelData.attrs
    // console.log(isCPC(_this))
    return (
      <div>
        <div class="BabelRender">
          {this.babelData.group.map(li => {
            return (
              <ele style={li.style} nativeOn={li.nativeOn} on={li.on}>
                {li.nodeValue}
              </ele>
            )
          })}
        </div>
        <SelectBox ref="selectBox" attrs={attrs} on={{getValue: this.getValue}}></SelectBox>
      </div>
    )
  },
  methods: {
    $_handleClick(){
      this.$refs.selectBox.outerVisible =true
    },
    getValue(value){
      console.log(value)
      this.babelData.group[3].nodeValue = value

      this.babelData = JSON.parse(JSON.stringify(this.babelData))
      // console.log(this.babelData.group)
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
