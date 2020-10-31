<!--<template>-->
<!--  <div class="ChildEntry">-->
<!--    ChildEntry-->
<!--  </div>-->

<!--</template>-->

<script>
<!--如何配置标签,也变成配置的-->
export default {
  name: "ChildEntry",
  render() {
    const tag = this.$attrs.component.component.name
    console.log(this.$attrs.component.component.name)
    // const tag = 'div'
    return (
      <tag></tag>
    )
  }
}
</script>

<style lang="scss" scoped>

</style>
