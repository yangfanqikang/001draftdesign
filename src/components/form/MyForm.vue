<template>
  <el-form ref="form" :model="form" :rules="rules" size="small" :label-position="'top'">
    <el-row :gutter="20" v-for="(row, i) in columns" :key="i">
      <el-col :span="24 / rowSize" v-for="(x, idx) in row" :key="idx">
        <el-form-item :label="x.label" :prop="x.prop">
          <component v-model.trim="form[x.prop]" v-bind="componentAttrs(x)" class="width100" />
        </el-form-item>
      </el-col>
    </el-row>
    <div class="searchBtn" v-if="footer">
      <el-button class="filter-item" @click="reset">重置</el-button>
      <el-button class="filter-item" type="primary" @click="submit">查询</el-button>
    </div>
  </el-form>
</template>

<script>
// import {fromEntries, chunk} from '@/utils'
import _ from 'lodash'
const chunk = _.chunk
export default {
  props: {
    config: Object
  },
  components: {
    selectBar: {
      functional: true,
      props: {value: String, list: Array, callback: Function},
      render(h, {props: {value = '', list = [], callback}, data: {attrs = {}}, listeners: {input}}) {
        return h(
          'el-select',
          {
            class: 'width-full',
            props: {value, ...attrs},
            on: {
              change(v) {
                input(v)
                callback(v)
              }
            }
          },
          list.map(o => h('el-option', {props: {...o, key: o.value}}))
        )
      }
    },
    checkbox: {
      functional: true,
      props: {value: Boolean, label: String},
      render(h, {props: {value = '', label = ''}, data: {attrs = {}}, listeners: {input}}) {
        return h(
          'el-checkbox',
          {
            props: {value, ...attrs},
            on: {
              change(v) {
                input(v)
              }
            }
          },
          label
        )
      }
    },
    checkboxGroup: {
      functional: true,
      props: {value: Array, list: Array},
      render(h, {props: {value = [], list = []}, data: {attrs = {}}, listeners: {input}}) {
        return h(
          'el-checkbox-group',
          {
            props: {value, ...attrs},
            on: {
              input(v) {
                input(v)
              }
            }
          },
          list.map(o => h('el-checkbox', {props: {...o, label: o.value, key: o.value}}, [o.label]))
        )
      }
    },
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
    const {columns = [], data = {}, rowSize = 3} = this.config || {}

    return {
      TYPE: {
        select: {
          is: 'selectBar',
          clearable: true
        },
        text: {
          is: 'el-input',
          clearable: true
        },
        switch: {
          is: 'el-switch'
        },
        checkbox: {
          is: 'checkbox',
          clearable: true
        },
        checkboxGroup: {
          is: 'checkboxGroup',
          clearable: true
        },
        radioGroup: {
          is: 'radioGroup',
          clearable: true
        },
        daterange: {
          is: 'el-date-picker',
          type: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          editable: false
        },
        date: {
          is: 'el-date-picker',
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          editable: false
        },
        auto: {
          is: 'el-autocomplete'
        }
      },
      //
      form: columns.reduce((r, c) => Object.assign(r, {[c.prop]: data && data[c.prop] ? data[c.prop] : c.is == 'checkboxGroup' ? [] : ''}), {}),
      rules: columns.reduce((r, c) => ({...r, [c.prop]: c.rules ? c.rules : []}), {}),
      // 拆分数组
      columns: chunk(columns, rowSize),
      rowSize
    }
  },
  computed: {
    footer() {
      const {footer = true} = this.config || {}
      return footer
    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    // 绑定组件种类,以及传值
    componentAttrs(item) {
      // is默认为文本,type是type,is是is
      const {is = 'text', label} = item,
        attrs = Object.fromEntries(Object.entries(item).filter(n => !/^(prop|is|rules)/.test(n[0]))),
        placeholder = (/^(select|el-date-picker)/.test(is) ? '请选择' : '请输入') + label
      // 返回一个对象,如果is为password
      return {...attrs, ...this.TYPE[is], placeholder}
    },
    reset() {
      this.$refs.form.resetFields()
    },
    /*
     * 这里区分了两种情况(footer默认为true，代表默认会展示封装的form组件自带的查询、重置按钮)：
     * 1、不使用封装的form组件中自带的查询、重置按钮，则需要使用回调的方式获取form表单的值
     * 2、使用封装的form组件中自带的查询、重置按钮，则需要在使用时通过父组件向封装的form子组件传一个函数submit来获取form表单的值
     */
    submit(cb = () => {}) {
      // 第一种情况
      !this.footer && this.$refs.form.validate(valid => valid && cb(this.form))
      // 第二种情况
      this.footer && this.$refs.form.validate(valid => valid && this.$emit('submit', this.form))
    }
  }
}
</script>

<style lang="scss" scoped>
.width100 {
  width: 100%;
}
</style>
