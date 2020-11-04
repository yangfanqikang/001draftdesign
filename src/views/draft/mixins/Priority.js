export default {
  data() {
    return {
      list: [
        {
          nodeValue: '是否党委规范性文件',
          style: {
            // grid
          },
        },
        {
          nodeValue: "(",
          style: {
            gridArea: ''
          }
        },
        {
          nodeValue: "",
          style: {
            gridArea: ''
          },
          on: {
            click: ()=>{
              this.$refs.selectBox.outerVisible = true
            }
          }
        },
        {
          nodeValue: ")",
          style: {
            gridArea: ''
          }
        },
      ],
      attrs: {
        title: '是否党委规范性文件'
      }
    }
  },
  methods: {
    getValue(value) {
      console.log(value)
      this.list[2].nodeValue = value
    }
  },
}
