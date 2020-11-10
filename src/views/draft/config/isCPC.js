export function isCPC(vm, json){
  // console.log('==========',vm)
  return {
    name: '标签名', //标签名
    attrs: {
      title: '名字'
    },
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
          click: (vm) => {
            console.log('>>>>>>>>>')
            vm.$_handleClick()
          }
        },
        nativeOn: {
          click: ()=>{
            vm.$_handleClick()
            // vm.outerVisible = true
          }
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
}
