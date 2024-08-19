<script setup>

//1.组件名称：mt-checkbox
//2.组件功能：多选框
//3.组件参数：
//          label: String/Number, 显示的文字, 默认为checkbox
//          height: Number, 高度, 默认为30
//          width: Number, 宽度, 默认为100
//          双向绑定参数: v-model: Boolen, 是否选中, 默认为false


import { defineModel, defineProps } from 'vue'

const mt_checkbox_data = defineProps({
    'label':{
        type:[Number,String],
        default: 'checkbox'
    },
    'height':{
        type:Number,
        default:30,
    },
    'width':{
        type:Number,
        default:100,
    }
})

const mt_checkbox_isSelect = defineModel({
    type: Boolean,
    default: false
})

const mt_checkbox_create = () =>{
    if(mt_checkbox_isSelect.value){
        const element = document.getElementById("mt_checkbox_box" + mt_checkbox_data.label)
        const right = document.getElementById("mt_checkbox_arrow" + mt_checkbox_data.label)
        element.style.backgroundColor = 'white'
        right.remove()
        mt_checkbox_isSelect.value = false
    }
    else {
        const element = document.getElementById("mt_checkbox_box" + mt_checkbox_data.label)
        const right = document.createElement('div')
        element.style.backgroundColor = "#0080FF"
        right.id = "mt_checkbox_arrow" + mt_checkbox_data.label
        right.style.position='absolute'
        right.style.width= (mt_checkbox_data.height - Math.floor(mt_checkbox_data.height / 20) - 1) * 0.25 + 'px'
        right.style.height= (mt_checkbox_data.height - Math.floor(mt_checkbox_data.height / 20) - 1) * 0.5 + 'px'
        right.style.transform='rotate(45deg)'
        right.style.borderRight= Math.floor(mt_checkbox_data.height / 20) + 1 + 'px solid #fff'
        right.style.borderBottom= Math.floor(mt_checkbox_data.height / 20) + 1 + 'px solid #fff'
        right.style.bottom= (mt_checkbox_data.height - 4)/2.5 + 'px'
        right.style.left= (mt_checkbox_data.height - 4)/2.1 + 'px'
        element.appendChild(right)
        mt_checkbox_isSelect.value = true
    }
}


</script>

<template>
    <div>
        <div id="mt_checkbox" class="mt_checkbox"
            :style="{
                position: 'relative',
                height: height+'px', 
                width: width+'px'
                }" 
                @click="mt_checkbox_create">
            <div :id = "'mt_checkbox_box' + mt_checkbox_data['label']" 
                :style="{
                    width: mt_checkbox_data['height'] + 'px', 
                    height: mt_checkbox_data['height'] + 'px', 
                    borderRadius: mt_checkbox_data['height'] * 0.25 + 'px', 
                    borderWidth: Math.floor( mt_checkbox_data['height'] / 20) + 1 + 'px'
                }"
                style="border-style: solid; border-color: black;"></div>
            <div :id = "'mt_checkbox_data'+ mt_checkbox_data['label']" 
                :style="{
                    height: mt_checkbox_data['height']+'px', 
                    width: mt_checkbox_data['width'] - mt_checkbox_data['height'] - 5 +'px', 
                    left: mt_checkbox_data['height'] + 5 + 'px',
                    lineHeight: mt_checkbox_data['height'] +'px', 
                    fontSize : mt_checkbox_data['height+'] + 'px'
                }"
                style="top: 0px; position: absolute; user-select: none;">{{ label }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>