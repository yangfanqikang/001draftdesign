<script>
const key = 'demo'
import configData from './config/index'
// <label.component.name component={label} id={label.id} />
export default {
  name: "index",
  components: {ChildEntry},
  data() {
    return {
      labels: configData[key],
      count: 0
    }
  },
  // 1.如果子组件指定emit的方法,那么能够监听然后调用父组件方法,多加一个On
  // 2.如果从参数中传递过来,这样的用处是什么,用来处理什么?
  render() {
    const { onChange,yyy } = this;
    // <ChildEntry component={label}></ChildEntry>
    return (
      <div class="index">
        {this.labels.map(label=>{
          return (
            <div key={label.style.gridArea} style={label.style}>
              <label.component.name component={label} id={label.id} />
            </div>
          )
        })}
      </div>
    )

  },
  methods: {
    onChange(val) {
      console.log('onChange+++++++++++++++',val)
      this.count = val;
    },
    yyy(val){
      console.log(val)
    }
  },
}
</script>

<style lang="scss" scoped>
.index{
  @extend .parent-grid;
  width: 864px;
  margin: 20px auto;
}
</style>
