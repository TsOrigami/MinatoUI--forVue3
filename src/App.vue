<script setup>

//这个页面用于测试

import { ref, onMounted } from 'vue'
import mt_table from './components/mt-table.vue'
import mt_select from './components/mt-select.vue'
import mt_btnGroup from './components/mt-btnGroup.vue'
import { get, post, put, del } from './components/axiosBag'
import mt_cascader from './components/mt-cascader.vue'
import mt_button from './components/mt-button.vue'
import mt_switch from './components/mt-switch.vue'
import axios from 'axios'

const data = ref([])

const thead = ref([])
const tbody = ref([])
const options = ref([])
const btns = ref([])

const selectValue = ref()

// const thead = ref(['姓名', '年龄', '性别', '职业'])
// const tbody = ref([
//   { '姓名': '张三', '年龄': 18, '性别': '男', '职业': '学生' },
//   { '姓名': '李四', '年龄': 20, '性别': '女', '职业': '教师' },
//   { '姓名': '王五', '年龄': 22, '性别': '男', '职业': '工程师' },
//   { '姓名': '赵六', '年龄': 24, '性别': '女', '职业': '医生' },
// ])
// const options = ref([
//   { 'label': '选项1', 'value': '1' },
//   { 'label': '选项2', 'value': '2' },
//   { 'label': '选项3', 'value': '3' },
//   { 'label': '选项4', 'value': '4' },
// ])
// const btns = ref(['按钮1', '按钮2', '按钮3'])

// onMounted(() => {
//   get('/test', {}).then(response => {
//     thead.value = response.thead
//     tbody.value = response.tbody
//     options.value = response.options
//     btns.value = response.btns
//   }).catch(error => {
//     console.error(error);
//   });
// })

// const test = () => {
//   console.log(selectValue.value.getSelect())
// }

// const clickBtns = (index) => {
//   console.log(index)
// }

// async function postTest() {
//   await post('/post', { 'num': 1 }).then(response => {
//     console.log(response)
//   })
// }

const aaa = () =>{
  alert("AAA")
}

const cascaderData = ref([])

const isSwitch = ref(true)

</script>

<template>
  <div class="title">
    <!-- <div style="position: absolute; left: 20%;">
      <mt_table :thead="thead" :tbody="tbody" :width="1000" />
    </div>
    <mt_select ref="selectValue" :options="options" />
    <div style="position: absolute; left: 20%;">
      <mt_btnGroup :btns="btns" :method="clickBtns" />
    </div> -->
    <div style="position: absolute; left: 10%; top: 10%;">
      <mt_cascader defaultNode="Cascader" :data="cascaderData" multiple />
    </div>
    <!-- <button @click="test">Test</button>
    <button @click="postTest">Post</button> -->
    <!-- <mt_button height='50' width='200' type="success" @click="aaa" round plain>mt_button</mt_button> -->
    <!-- <mt_switch :isSwitch="isSwitch"/> -->
    <button @click="console.log(cascaderData)">test</button>
  </div>
</template>

<style scoped>
.title {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 150%;
  /* background-color: #ccc; */
}
</style>