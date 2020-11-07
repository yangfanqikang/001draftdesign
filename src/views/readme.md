```vue

<grid-layout
//  作用        数据类型          必填        备注
//===================================================
// 网格初始化布局  数组       必填  每一项都必须具有i、x、y、w和h属性 属性用作什么 见下方
:layout.sync="layout"
// 表示网格有多少列 数字           非必填    默认为12
:col-num="12"
// 表示一行的高度(以像素为单位) 数字     非必填     默认值为150
:row-height="30"
// 表示网格中最大行数 数字          非必填     默认为无穷大
:maxRows="20"
// 表示网格项数是否可以拖动 Boolean        非必填     默认为true
:is-draggable="true"
// 表示网格是否可以改变带大小 Boolean      非必填     默认为true
:is-resizable="true"
// RTL/LTR 的转换 Boolean      非必填 默认为false
:is-mirrored="false"
// 容器是否适应内部变化 Boolean  非必填 默认为 true
:autoSize="ture"
// 垂直方向上 是否应该紧凑布局 Boolean 非必填 默认为true
:vertical-compact="true"
// 网格之间的边距 两个数字组成的数组 第一个数字为水品距离 第二个为垂直距离 非必填 默认值为 [10,10]
:margin="[10, 10]"
// 是否使用css的transforms来排版 非必填 为false时 使用后采用定位方式来布局 默认为true
:use-css-transforms="true"
// 布局是否应响应窗口宽度 非必填 默认false 为true时 会出现一些布局错乱的问题
:responsive="false"
//布局是否应响应为响应布局定义的窗口宽度断点 对象类型 非必填 默认值
// { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
:breakpoints=" { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }"
// 定义每个断点的列数
:cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
// 生命周期

@layout-created="layoutCreatedEvent"  // 布局创建事件
@layout-before-mount="layoutBeforeMountEvent" // 布局安装以前事件
@layout-mounted="layoutMountedEvent"    // 布局安装事件
@layout-ready="layoutReadyEvent"    // 布局准备活动
@layout-updated="layoutUpdatedEvent" // 格子位置 大小更新
>
// 每个单独控制 需要注意的是 每一个属性都要在data中注册一下 不然会导致不能拖拽 或者 不能放大缩小
<!--x,y,w,h-->
<grid-item
  class="echarts_box"
  :x="layoutData[0].x" // 横向距离
:y="layoutData[0].y" // 纵向距离
:w="layoutData[0].w" // 宽度
:h="layoutData[0].h" // 高度
:i="layoutData[0].i" // 唯一值 （重复时设置会导致一块放大或缩小）string类型
@resize="resizeEvent" // 当该元素 被放大缩小触发的事件
@move="moveEvent" // 该元素移动时 触发的事件
@resized="resizedEvent" // 放大缩小结束 触发事件 注意:必须当大小相对上一次发生改变结束时才会触发
@moved="movedEvent" // 移动结束触发 注意:只有当位置相对上一次发生改变才会触发
></grid-item>
// for循环 便利数组中的内容 渲染元素
//
<grid-item v-for="item in layout"
//          :x="item.x"
//           :y="item.y"
//           :w="item.w"
//            :h="item.h"
//          :i="item.i">
//        {{item.i}}
//</grid-item>
</grid-layout>
​
import VueGridLayout from 'vue-grid-layout' //文件引入
const matedata = [
{
i: "0", // 索引值 必填
h: 4,   // 高度   必填
w: 7,   // 宽度   必填
x: 2,   // x 轴距离 必填
y: 0,   // y轴距离 必填
minW:5 // 最小宽度 当 w的值小于minW时 采用minW的值
minH:3 // 同上
maxW:8 // 的最大宽度。如果w大于maxW，那么w将被设置为maxW。
maxH:6 // 同上
isDraggable:true // 单独控制这一个盒子是否可以拖动 未填写 继承父元素的 非必填
isResizable:true // 单独控制这一个盒子是否可以调整大小 未填写 继承父元素的 非必填
static:false // 这个盒子是静态的  不能被其他元素改变位置 会被覆盖在底部
dragIgnoreFrom: '' // 属性这值为css 选择器 项的哪些元素不应触发项的拖动事件// 具体不知道干嘛的 没有用到
dragAllowFrom:'' // 属性这值为css 选择器 项的哪些元素应触发项的拖动事件 // 文档这样写的
resizeIgnoreFrom:''//属性这值为css 选择器 表示项的哪些元素不应触发项的调整大小事件。//来自文档翻译
},
{
h: 1,
i: "1",
w: 1,
x: 0,
y: 1
},
{
h: 1,
i: "2",
w: 1,
x: 0,
y: 2
},
{
h: 1,
i: "3",
w: 1,
x: 0,
y: 3
}
];
export default {
data() {
return {
layoutData: matedata, //  存放布局数据 数据格式如上
};
},
components: {
GridLayout, //注册组件
GridItem // 注册
},
methods: {
// 布局中单元改变事件  i, newX, newY 移动的坐标
//                i, newH, newW, newHPx, newWPx 变化的大小
//newHPx, newWPx 是实际的像素
// newH, newW 是数据中的 以每个单位大小为基准点算
resizeEvent(i, newH, newW, newHPx, newWPx) {
console.log("大小正在改变",i, newH, newW, newHPx, newWPx);
},
moveEvent( i, newX, newY) {
console.log("正在移动",i, newX, newY);
},
resizedEvent(i, newH, newW, newHPx, newWPx) {
console.log("大小改变完了",i, newH, newW, newHPx, newWPx);
},
movedEvent( i, newX, newY) {
console.log("移动结束了", i, newX, newY);
},
// 布局组件的生命周期  参数newLayout=> 布局的数据 每个布局数据
layoutCreatedEvent(newLayout) {
console.log("1Created");
},
layoutBeforeMountEvent(newLayout) {
console.log("2Mount");
},
layoutMountedEvent(newLayout) {
console.log("3Mounted");
},
layoutReadyEvent(newLayout) {
console.log("4Ready");
},
layoutUpdatedEvent(newLayout) {
console.log("Updated");
}
},
created() {
},
mounted() {
};

};
```