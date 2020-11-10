<template>
  <div class="ele" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ele"
}
</script>

<style lang="scss" scoped>
.ele {
}
</style>
