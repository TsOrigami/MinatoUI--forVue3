<script setup>

//1.组件名称：mt-button
//2.组件功能：按钮组件，可以设置按钮的样式、大小、类型、是否禁用等属性
//3.组件属性：
//   disable：是否禁用按钮，可选值：true、false。直接在调用时使用disable属性，默认为false
//   height：按钮高度，可选值：Number、String，默认为100
//   width：按钮宽度，可选值：Number、String，默认为40
//   type：按钮类型，可选值：default、primary、success、info、warning、danger，默认为default
//   round：是否为圆形按钮，可选值：true、false。直接在调用时使用round属性，默认为false
//   plain: 是否为反色按钮，可选值：true、false。直接在调用时使用round属性，默认为false
//5.组件插槽：
//   default：按钮内容，默认为空
//6.组件样式：
//   默认样式：白色背景，黑色边框，黑色字体
//   primary样式：蓝色背景，蓝色边框，白色字体
//   success样式：绿色背景，绿色边框，白色字体
//   info样式：浅蓝色背景，浅蓝色边框，白色字体
//   warning样式：黄色背景，黄色边框，白色字体
//   danger样式：红色背景，红色边框，白色字体
//7.组件示例：
//   <mt-button width="50" height="150">按钮</mt-button>
//   <mt-button type="primary" round>按钮</mt-button>
//   <mt-button type="success" disable>按钮</mt-button>

import { defineProps } from 'vue'

const mt_button_data = defineProps({
    'disable': {
        type: Boolean,
        default: false
    },
    'height': {
        type: [Number, String],
        default :100
    },
    'width': {
        type: [Number, String],
        default: 40
    },
    'type': {
        type: String,
        default: "default"
    },
    'round':{
        type: Boolean,
        default: false
    },
    'plain':{
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div>
        <button id="mt_button_Button" 
            :class ="'mt_button_' + plain ? type + 'Plain' : type" 
            :style="{
                'height': mt_button_data['height'] + 'px', 
                'width': mt_button_data['width'] + 'px', 
                'borderRadius': mt_button_data['round'] ? mt_button_data['height'] * 5 +'px': mt_button_data['height'] * 0.25 + 'px'
            }" :disabled="disable">
            <span v-if="$slots.default" style="font-weight: bold;">
                <slot></slot>
            </span>
        </button>
    </div>
</template>

<style scoped>

.mt_button_default{
    background-color: white;
    border: 1px solid black;
    color: black;
    transition-duration: 0.4s;
}

.mt_button_default:Hover{
    background-color: #66FFFF;
}

.mt_button_primary{
    background-color: #3399FF;
    border: 1px solid #0080FF;
    color: white;
    transition-duration: 0.4s;
}

.mt_button_primary:hover{
    background-color: #66B2FF;
}

.mt_button_success{
    background-color: #00FF00;
    border: 1px solid #00CC00;
    color: white;
    transition-duration: 0.4s;
}

.mt_button_success:hover{
    background-color: #99FF99;
}

.mt_button_info{
    background-color: #808080;
    border: 1px solid gray;
    color: white;
    transition-duration: 0.4s;
}

.mt_button_info:Hover{
    background-color: #A0A0A0;
}

.mt_button_warning{
    background-color: #80FF00;
    border: 1px solid #99FF33;
    color: white;
    transition-duration: 0.4s;
}

.mt_button_warning:hover{
    background-color: #CCFF99;
}

.mt_button_danger{
    background-color: #FF3333;
    border: 1px solid #FF0000;
    color: white;
    transition-duration: 0.4s;
}

.mt_button_danger:hover{
    background-color: #FF9999;
}

.mt_button_defaultPlain{
    background-color: white;
    border: 1px solid black;
    color: black;
    transition-duration: 0.4s;
}

.mt_button_defaultPlain:Hover{
    background-color: white;
    color : #66FFFF;
}

.mt_button_primaryPlain{
    background-color: white;
    border: 1px solid #0080FF;
    color: #66B2FF;
    transition-duration: 0.4s;
}

.mt_button_primaryPlain:hover{
    background-color: #66B2FF;
    color: white;
}

.mt_button_successPlain{
    background-color: white;
    border: 1px solid #00CC00;
    color: #99FF99;
    transition-duration: 0.4s;
}

.mt_button_successPlain:hover{
    background-color: #99FF99;
    color: white
}

.mt_button_infoPlain{
    background-color: white;
    border: 1px solid gray;
    color: #A0A0A0;
    transition-duration: 0.4s;
}

.mt_button_infoPlain:Hover{
    background-color: #A0A0A0;
    color: white
}

.mt_button_warningPlain{
    background-color: white;
    border: 1px solid #99FF33;
    color: #CCFF99;
    transition-duration: 0.4s;
}

.mt_button_warningPlain:hover{
    background-color: #CCFF99;
    color: white
}

.mt_button_dangerPlain{
    background-color: white;
    border: 1px solid #FF0000;
    color: #FF9999;
    transition-duration: 0.4s;
}

.mt_button_dangerPlain:hover{
    background-color: #FF9999;
    color: white
}
</style>