<script setup>

//1.组件名称：mt-checkbox
//2.组件功能：单选框
//3.组件参数：
//          label: String/Number, 显示的文字, 默认为checkbox
//          height: Number, 高度, 默认为30
//          width: Number, 宽度, 默认为100
//  *注: 单个单选框不返回是否选中, 使用mt-radui-gruop进行统一返回. 如果需要使用单个选择框, 请使用mt-cheakbox


import { defineProps } from 'vue'

const mt_radio_data = defineProps({
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

const mt_radio_create = () =>{
    if(document.getElementById("mt_radio_arrow" + mt_radio_data.label)){
        const element = document.getElementById("mt_radio_box" + mt_radio_data.label)
        const right = document.getElementById("mt_radio_arrow" + mt_radio_data.label)
        right.remove()
    } else {
        const element = document.getElementById("mt_radio_box" + mt_radio_data.label)

        const backColor = document.createElement('div')
        backColor.id = "mt_radio_arrow" + mt_radio_data.label
        backColor.style.position = 'absolute'
        backColor.style.width = mt_radio_data.height - (Math.floor( mt_radio_data['height'] / 20) + 1 ) * 2 + 'px'
        backColor.style.height = mt_radio_data.height - (Math.floor( mt_radio_data['height'] / 20) + 1 ) * 2 + 'px'
        backColor.style.left= Math.floor( mt_radio_data['height'] / 20) + 1 +'px'
        backColor.style.top = Math.floor( mt_radio_data['height'] / 20) + 1 +'px'
        backColor.style.borderRadius = (mt_radio_data.height - (Math.floor( mt_radio_data['height'] / 20) + 1 ) * 2 ) /2 + 'px'
        backColor.style.backgroundColor = 'skyblue'
        element.after(backColor)
        
        const right = document.createElement('div')
        right.id = "mt_radio_point" + mt_radio_data.label
        right.style.position='absolute'
        right.style.width = mt_radio_data.height / 3 + 'px'
        right.style.height = mt_radio_data.height / 3 + 'px'
        right.style.left= ( mt_radio_data.height - (Math.floor( mt_radio_data['height'] / 20) + 1 ) * 2  ) / 3 +'px'
        right.style.top = ( mt_radio_data.height - (Math.floor( mt_radio_data['height'] / 20) + 1 ) * 2 ) / 3 +'px'
        right.style.borderRadius = mt_radio_data.height / 6 + 'px'
        right.style.backgroundColor = 'white'
        backColor.appendChild(right)
    }
}


</script>

<template>
    <div>
        <div id="mt_radio" class="mt_radio"
            :style="{
                position: 'relative',
                height: height+'px', 
                width: width+'px'
            }" 
            @click="mt_radio_create">
            <div :id = "'mt_radio_box' + mt_radio_data['label']" 
                :style="{
                    width: mt_radio_data['height'] + 'px', 
                    height: mt_radio_data['height'] + 'px', 
                    borderRadius: mt_radio_data['height'] * 0.5 + 'px', 
                    borderWidth: Math.floor( mt_radio_data['height'] / 20) + 1 + 'px'
                }"
                style="border-style: solid; border-color: black;"></div>
            <div :id = "'mt_radio_data'+ mt_radio_data['label']" 
                :style="{
                    height: mt_radio_data['height']+'px', 
                    width: mt_radio_data['width'] - mt_radio_data['height'] - 5 +'px', 
                    left: mt_radio_data['height'] + 5 + 'px',
                    lineHeight: mt_radio_data['height'] +'px', 
                    fontSize : mt_radio_data['height+'] + 'px'
                }" style="top: 0px; position: absolute; user-select: none;">{{ label }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>