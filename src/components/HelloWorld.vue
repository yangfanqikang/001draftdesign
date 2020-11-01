<template>
  <div class="hello">
    <div class="container">
      <h1>Draft Design <br>tool for <br>everyone</h1>
      <p>
        1.标签设计
        2.稿纸设计
        3.表单设计
        4.页面设计
        5.部件设计</p>
      <el-button type="primary" @click="$router.push('/DesignCenter')">开始设计</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/home.svg") no-repeat center center / 50% content-box content-box;
  background-size: cover;
  overflow: hidden;
  text-align: left;
  >.container{
    padding-top: 250px;
    width: 1200px;
    margin: 0 auto;
    >h1{
      font-size: 72px;
      line-height: 1.5em;
    }
    p{
      font-size: 18px;
      color: gray;
      margin-bottom: 50px;
    }
  }

}
</style>
