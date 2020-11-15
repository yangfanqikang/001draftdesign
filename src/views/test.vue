<template>
  <div class="test">
    <el-form :model="form">
      <el-form-item :prop="form[li.prop]" v-for="li in list" :label="li.label" :key="li.label">
        <component v-model.trim="form[li.prop]" v-bind="componentAttrs(li)"></component>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'test',
  components: {
    radioGroup: {
      functional: true,
      props: {value: String, list: Array},
      render(h, {props: {value = '', list = []}, data: {attrs = {}}, listeners: {input}}) {
        return h(
          'el-radio-group',
          {
            props: {value, ...attrs},
            on: {
              input(v) {
                input(v)
              }
            }
          },
          list.map(o => h('el-radio', {props: {...o, key: o.label}}, [o.value]))
        )
      }
    }
  },
  data() {
    return {
      form: {},
      // 数据
      list: [
        {
          prop: 'labelKey',
          label: '标签key',
          is: 'el-input'
        },
        {
          prop: 'keyWidth',
          label: '宽度',
          is: 'el-input'
        },
        {
          prop: 'showTitle',
          label: '标题',
          is: 'radio-group',
          list: [
            {label: '1',value: '展示'},
            {label: '2',value: '同样展示'},
          ]
          // prop: 'gender',
          // label: '性别',
          // is: 'radioGroup',
          // list: [
          //   {label: 'male', value: '男'},
          //   {label: 'famale', value: '女'}
          // ]
        }
      ]
    }
  },
  mounted() {
    // 这个不是响应式的对象
    this.list.forEach(item=>{
      // this.form = Object.assign(this.form, {[item.prop]: ''})
      // this.form[item.prop] = ''
      this.$set(this.form, item.prop, '')
    })
    // for (let i = 0; i < this.list.length; i++) {
    //   this.form[this.list[i].prop] = ''
    //   this.$set(this.form, indexOfItem, newValue);
    // }
    // this.form = this.list.reduce((r, c) => Object.assign(r, {[c.prop]: ''}), {})
    console.log(this.form)
  },
  methods: {
    submit() {
      console.log(this.form)
    },
    componentAttrs(item) {
      let obj = _.omit(item, ['prop', 'label'])
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
}
</style>
