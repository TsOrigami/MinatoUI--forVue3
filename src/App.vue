<script setup>

//这个页面用于测试

import { ref, onMounted } from 'vue'

import { get, post, put, del } from './components/axiosBag'
import mt_table from './components/mt-table.vue'
import mt_select from './components/mt-select.vue'
import mt_btnGroup from './components/mt-btnGroup.vue'
import mt_cascader from './components/mt-cascader.vue'
import mt_button from './components/mt-button.vue'
import mt_switch from './components/mt-switch.vue'
import mt_autocomplete from './components/mt-autocomplete.vue'
import mt_checkbox from './components/mt-checkbox.vue'
import mt_checkbox_group from './components/mt-checkbox-group.vue'
import mt_colorPicker from './components/mt-colorPicker.vue'
import mt_slider from './components/mt-slider.vue'
import mt_radio from './components/mt-radio.vue'
import mt_radio_group from './components/mt-radio-group.vue'
import mt_treeSelect from './components/mt-treeSelect.vue'

import axios from 'axios'

const data = ref([])

// const thead = ref([])
// const tbody = ref([])
// const options = ref([])
// const btns = ref([])

const selectValue = ref('')

// const thead = ref(['姓名', '年龄', '性别', '职业'])
// const tbody = ref([
//   { '姓名': '张三', '年龄': 18, '性别': '男', '职业': '学生' },
//   { '姓名': '李四', '年龄': 20, '性别': '女', '职业': '教师' },
//   { '姓名': '王五', '年龄': 22, '性别': '男', '职业': '工程师' },
//   { '姓名': '赵六', '年龄': 24, '性别': '女', '职业': '医生' },
// ])
const options = ref([
  { 'label': '选项1', 'value': '1' },
  { 'label': '选项2', 'value': '2' },
  { 'label': '选项3', 'value': '3' },
  { 'label': '选项4', 'value': '4' },
])
// const btns = ref(['按钮1', '按钮2', '按钮3'])

const boardData = ref([
    {
        value: "A",
        label: "Atest",
    },
    {
        value: "B",
        label: "Btest",
        children: [
            {
                value: "C",
                label: "Ctest",
                children:[
                    {
                        value: "F",
                        label: "Ftest"
                    }   
                ]
            }
        ]
    },
    {
        value: "D",
        label: "Dtest",
        children: [
            {
                value: "E",
                label: "Etest",
            }
        ]
    },
])

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

// const clickBtns = (index) => {
//   console.log(index)
// }

// async function postTest() {
//   await post('/post', { 'num': 1 }).then(response => {
//     console.log(response)
//   })
// }

// const aaa = () =>{
//   alert("AAA")
// }

const cascaderData = ref([])

// const isSwitch = ref(true)

const autoOptions = ref([
  // 'temp', 'accept', 'time', 'manba','a','aa','aaa','aaaa','aaaaa','aaaaaa'
  'temp', 'accept', 'time', 'manba'
])

const message = ref('test')

// const test = () => {
//   console.log(message.value)
// }

const checkbox_test01 = ref()
const checkbox_test02 = ref()
const checkbox_test03 = ref()
const checkbox_test04 = ref()

const checkbox_group_slt = ref([])

const ShowCheakBoxGroup = () =>{
  console.log('slt', checkbox_group_slt.value)
}

const slt_color = ref('')

const mt_slider_data = ref(0)

const mt_radio_group_data = ref(null)

</script>

<template>
  <div class="title">
    <!-- <div style="position: absolute; left: 20%;">
      <mt_table :thead="thead" :tbody="tbody" :width="400" :height="200" />
    </div> -->
    <!-- <div>
      <mt_select v-model="selectValue" :options="options" date />
      <button @click="console.log(selectValue)">Test</button>
    </div> -->
    <!-- <div style="position: absolute; left: 20%;">
      <mt_btnGroup :btns="btns" :method="clickBtns" />
    </div> -->
    <!-- <div style="position: absolute; left: 10%; top: 10%;">
      <mt_cascader defaultNode="Cascader" :options="boardData" :data="cascaderData" multiple />
      <button @click="console.log(cascaderData)">test</button>
    </div> -->
    <!-- <button @click="test">Test</button>
    <button @click="postTest">Post</button> -->
    <!-- <mt_button height='50' width='200' type="success" @click="aaa" round plain>mt_button</mt_button> -->
    <!-- <mt_switch :isSwitch="isSwitch"/> -->
     <!-- <div style="position: absolute; left: 10%; top: 40%;">
        <mt_autocomplete :options="autoOptions" v-model="message"  />
      <button @click="console.log(message)">Test</button>
     </div> -->
     <!-- <div>
      <mt_checkbox_group v-model = "checkbox_group_slt">
        <mt_checkbox label="A" v-model = "checkbox_test01" style="  margin: 2px;" />
        <mt_checkbox label="B" v-model = "checkbox_test02" style="  margin: 2px;" />
        <mt_checkbox label="C" v-model = "checkbox_test03" style="  margin: 2px;" />
      </mt_checkbox_group>
      <mt_checkbox label="D" v-model = "checkbox_test04" style=" position: relative;" />
      <button @click="ShowCheakBoxGroup">ShowCheakBoxGroup</button>
      <button @click="console.log(checkbox_test?'True':'False')">test</button>
    </div> -->
    <!--<div style="position: absolute; left: 100px; top: 100px;">
      <mt_color-picker v-model="slt_color" RGBA></mt_color-picker>
      <button @click="console.log(slt_color)">Show</button>
     </div> -->
     <mt_slider v-model="mt_slider_data" style="position: absolute ; top: 100px; left: 50px;" whenup></mt_slider>
     <button @click="console.log(mt_slider_data)">test</button>
     <!-- <mt_radio_group v-model = "mt_radio_group_data">
      <mt_radio label="test01" style="margin: 10px;"></mt_radio>
      <mt_radio label="test02" style="margin: 10px;"></mt_radio>
      <mt_radio label="test03" style="margin: 10px;"></mt_radio>
     </mt_radio_group>
     <button @click="console.log(mt_radio_group_data)">TEST</button> -->
     <mt_treeSelect :options="boardData" :data="cascaderData"></mt_treeSelect>
  </div>
  <!-- <div class="test"></div> -->
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

.test{
  background-position: 0 0, 0 5px, 5px -5px, -5px 0;
}
</style>