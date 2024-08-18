<script setup>

//1.组件名称：mt-checkbox-group
//2.组件功能：多选框集合
//3.组件参数：
//          height: Number, 高度, 为0时高度为自动, 默认为0
//          width: Number, 宽度, 为0时宽度为自动, 默认为0
//          backgroundColor: String, 背景颜色, 默认为white
//          borderColor: String, 边框颜色, 默认为black
//          双向绑定参数: v-model 包含集合中所有被选中的mt-cheakbox的label属性(显示的文本)的数组

import { defineModel, defineProps, onMounted } from 'vue'

const mt_checkbox_group = defineProps({
    'height': {
        type: Number,
        default: 0
    },
    'width': {
        type: Number,
        default: 0
    },
    'backgroundColor': {
        type: String,
        default: 'white'
    },
    'borderColor': {
        type: String,
        default: 'black'
    }
})

const mt_checkbox_group_isSelect = defineModel({
    type: Array,
    default: []
})

onMounted(()=>{
    getCheckbox()
})

const getCheckbox = () =>{
    const soltBoard = document.getElementById('mt_checkbox_group')
    const elements = soltBoard.getElementsByClassName('mt_checkbox')
    let sltLabels = []
    for(let t=0; t<elements.length; t++) {
        let templabel = elements[t].getElementsByTagName('div')[1].id
        templabel = templabel.replace('mt_checkbox_data', 'False-')
        templabel = templabel.replace('mt_checkbox_arrow', 'True-')
        let label = templabel.split('-')
        if( label[0] == 'True') {
            sltLabels.push(label[1])
        }
    }
    mt_checkbox_group_isSelect.value = sltLabels
}

</script>

<template>
    <div id="mt_checkbox_group" @click="getCheckbox"
        style="position: relative; border-width: 2px; border-style: solid;"
        :style="{
            height: mt_checkbox_group['height'] == 0 ? 'auto': mt_checkbox_group['height'] + 'px',
            width: mt_checkbox_group['width'] == 0 ? 'auto': mt_checkbox_group['width'] + 'px',
            backgroundColor : mt_checkbox_group['backgroundColor'],
            borderColor: mt_checkbox_group['borderColor'],
        }">
        <slot></slot>
    </div>
</template>

<style scoped>

.mt_checkbox_group{
    border: 2px solid black;
}

</style>