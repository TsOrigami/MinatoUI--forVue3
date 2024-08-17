<script setup>

// 组件说明
// 1.组件名: mt-btnGroup
// 2.组件功能:按钮组
// 3.组件参数:
//     mt_btnGroup_data['btns']:按钮名称，类型为数组（包含组件名称的字符串数组），默认为空数组
//     width:按钮组宽度，类型为数字，默认为300
//     height:按钮组高度，类型为数字，默认为40
//     method:按钮点击事件，类型为函数，默认为空函数
//     color:按钮组背景颜色，类型为字符串，默认为白色
//     hoverColor:按钮组鼠标悬停背景颜色，类型为字符串，默认为灰色
//     activeColor:按钮组鼠标点击背景颜色，类型为字符串，默认为天蓝色
//     borderColor:按钮组边框颜色，类型为字符串，默认为蓝色
//     activeBorderColor:按钮组鼠标点击边框颜色，类型为字符串，默认为蓝色
//     hoverBorderColor:按钮组鼠标悬停边框颜色，类型为字符串，默认为黑色
// 4.组件参数"method"格式
//    通过判断函数传入值执行函数，传入值为按钮的序号（1-n）
//    例：function All(item){ if(item == 1) function A(); if(item == 2) function B(); ...}

import { defineProps, ref } from 'vue'

const mt_btnGroup_data = defineProps({
    'btns': {
        type: Array,
        default: []
    },
    'width': {
        type: Number,
        default: 300
    },
    'height': {
        type: Number,
        default: 40
    },
    'method': {
        type: Function,
        default: () => { }
    },
    'color': {
        type: String,
        default: 'white'
    },
    'hoverColor': {
        type: String,
        default: 'gray'
    },
    'activeColor': {
        type: String,
        default: 'skyblue'
    },
    'borderColor': {
        type: String,
        default: 'blue'
    },
    'hoverBorderColor': {
        type: String,
        default: 'black'
    },
    'activeBorderColor': {
        type: String,
        default: 'blue'
    }
})

const place = ref(1)
const tempPlace = ref(1)

</script>

<template>
    <div style="position: relative; border-style: solid; border-width: 2px; border-radius: 10px; padding: 5px; 
            display: flex; justify-content: space-between;"
            :style="{
                width: mt_btnGroup_data['width'] + 'px',
                height: mt_btnGroup_data['height'] + 'px',
                backgroundColor: mt_btnGroup_data['color'], 
                borderColor: mt_btnGroup_data['borderColor']
            }">
        <button v-for="(item, index) in mt_btnGroup_data['btns']" style="border-radius: 10px;z-index: 2; "
            :style="{ 
                width: (mt_btnGroup_data['width'] - (mt_btnGroup_data['btns'].length + 1) * 5) / mt_btnGroup_data['btns'].length + 'px' 
            }"
            @click="method(index + 1), place = index + 1, tempPlace = place" 
            @mouseover="tempPlace = index + 1"
            @mouseleave="tempPlace = place">
            {{ item }}</button>
        <div :style="{
                width: ( mt_btnGroup_data['width'] - ( mt_btnGroup_data['btns'].length + 1) * 5) / mt_btnGroup_data['btns'].length + 8 + 'px',
                left: 1 + (( mt_btnGroup_data['width'] - (mt_btnGroup_data['btns'].length + 1) * 5) / mt_btnGroup_data['btns'].length + 4) * (place - 1) + 'px', 
                height: mt_btnGroup_data['height'] - 6 + 'px',
                backgroundColor: mt_btnGroup_data['activeColor'], 
                borderColor: mt_btnGroup_data['activeBorderColor']
            }" 
            style=" border-radius:10px; top: 1px; transition-duration: 0.3s;border-style: solid; border-width: 2px;
            border:2px solid blue; position: absolute; z-index: 1;"></div>
        <div :style="{
                width: ( mt_btnGroup_data['width'] - (mt_btnGroup_data['btns'].length + 1) * 5) / mt_btnGroup_data['btns'].length + 8 + 'px',
                left: 1 + (( mt_btnGroup_data['width']  - (mt_btnGroup_data['btns'].length + 1) * 5) / mt_btnGroup_data['btns'].length + 4) * (tempPlace - 1) + 'px', 
                height: mt_btnGroup_data['height'] - 6 + 'px',
                borderColor: mt_btnGroup_data['hoverBorderColor']
            }" 
            style=" border-radius:10px; top: 1px; transition-duration: 0.3s;border-style: solid; border-width: 2px;
            border:2px solid gray; background-color: gray; position: absolute; z-index: 0;"></div>
    </div>

</template>

<style scoped></style>