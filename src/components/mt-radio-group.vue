<script setup>

//1.组件名称：mt-radio-group
//2.组件功能：单选框集合
//3.组件参数：
//          height: Number, 高度, 为0时高度为自动, 默认为0
//          width: Number, 宽度, 为0时宽度为自动, 默认为0
//          backgroundColor: String, 背景颜色, 默认为white
//          borderColor: String, 边框颜色, 默认为black
//          双向绑定参数: v-model, 集合中选中的mt-radio的label属性(显示的文本)

import { defineModel, defineProps, onMounted, ref } from 'vue'

const mt_radio_group = defineProps({
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

const mt_radio_group_isSelect = defineModel({
    type: String,
    default: null
})

const mt_radio_group_member = ref(null)

const getRadio = () =>{
    const soltBoard = document.getElementById('mt_radio_group')
    const elements = soltBoard.getElementsByClassName('mt_radio')
    let sltIndex = []
    for(let t=0; t<elements.length; t++) {
        let templabel = elements[t].getElementsByTagName('div')[1].id
        templabel = templabel.replace('mt_radio_data', 'False-')
        templabel = templabel.replace('mt_radio_arrow', 'True-')
        let label = templabel.split('-')
        if( label[0] == 'True') {
            sltIndex.push(t)
        }
    }
    
    if( mt_radio_group_member.value == null ){
        mt_radio_group_member.value = sltIndex[0]
    } else {
        let templabel = elements[mt_radio_group_member.value].getElementsByTagName('div')[1]
        if( sltIndex.length == 0 ){
            mt_radio_group_member.value = null
        } else {
            templabel.remove()
            mt_radio_group_member.value = mt_radio_group_member.value == sltIndex[0] ? sltIndex[1] : sltIndex[0]
        }
    }

    if(mt_radio_group_member.value != null) {
        let templabel = elements[ mt_radio_group_member.value ].getElementsByTagName('div')[1].id
        templabel = templabel.replace('mt_radio_data', 'False-')
        templabel = templabel.replace('mt_radio_arrow', 'True-')
        mt_radio_group_isSelect.value = templabel.split('-')[1]
    } else {
        mt_radio_group_isSelect.value = null
    }
}

</script>

<template>
    <div id="mt_radio_group" @click="getRadio"
        style="position: relative; border-width: 2px; border-style: solid;"
        :style="{
            height: mt_radio_group['height'] == 0 ? 'auto': mt_radio_group['height'] + 'px',
            width: mt_radio_group['width'] == 0 ? 'auto': mt_radio_group['width'] + 'px',
            backgroundColor : mt_radio_group['backgroundColor'],
            borderColor: mt_radio_group['borderColor'],
        }">
        <slot></slot>
    </div>
</template>

<style scoped>

.mt_radio_group{
    border: 2px solid black;
}

</style>