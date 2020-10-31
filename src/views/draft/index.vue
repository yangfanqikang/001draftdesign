<template>
  <div class="index">
    <div v-for="label in labels" :key="label.style.gridArea" :style="label.style">
      <div :is="label.component.name"></div>
    </div>
  </div>

</template>

<script>
const key = 'demo'
import configData from './config/index'
export default {
  name: "index",
  data() {
    return {
      labels: configData[key]
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  @extend .parent-grid;
  width: 864px;
  margin: 20px auto;
}
</style>
