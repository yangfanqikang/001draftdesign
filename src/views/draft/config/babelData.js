export default {
  name: '', //标签名
  attrs: {},
  group: [
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
        click: () => {
          console.log('>>>>>>>>>>', this)
        }
      },
      nativeOn: {
        click: ()=>{
          console.log()}
      }
    },
    {
      nodeValue: ")",
      style: {
        gridArea: ''
      }
    },
  ]
}
