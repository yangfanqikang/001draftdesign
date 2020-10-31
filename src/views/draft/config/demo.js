export default [
  // 一个标签的这些属性可以决定是哪种标签,用什么方式渲染
  {
    key: "1",
    type: '',
    component: {
      name: "ISCPCRule",
      title: "是否党委规范性文件",
      props: {
        editable: true
      },
    //  可以包含vm所有api
    },
    style: {
      gridArea: "1/1/2/25",
      textAlign: "right"
    },
    id: 'idSelector',
    // :class
    class: '',
    // html 属性
    attrs: {},
    // 组件属性
    props: {},
    // dom属性
    domProps: {
      innerHeight: 'draft'
    },
    // 事件监听,在on内
    on: {
      xxx: (val) => {
        console.log('>>>>XXXXXXX',val)
      }
    },
  //  vm.$emit触发
    nativeOn: {
      try(){
        console.log('>>>>')
      }
    },
    directives: {},
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其他组件的子组件
    slot: 'name of slot',
    // 多个同名,变数组
    ref: '',

  },
  {
    key: "2",
    component: {
      name: "MainTitle",
      title: "中共中国银行保险监督管理委员会发文稿纸",
      props: {
        editable: true
      }
    },
    style: {
      gridArea: "2/1/4/19",
      lineHeight: "100px",
      fontSize: '32px',
      color: 'red'
    }
  },
  {
    key: "1",
    component: {
      name: 'Security'
    },
    style: {
      gridArea: "2/19/3/25",
    }
  },
  {
    key: "1",
    component: {
      name: 'Priority'
    },
    style: {
      gridArea: "3/19/4/25",
    }
  }
];
