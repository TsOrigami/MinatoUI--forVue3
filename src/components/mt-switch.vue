<script setup>

//1.组件名称：mt-switch
//2.组件功能：开关按钮
//3.组件参数：
//    height: Number/String, 按钮高度，默认为30
//    width: Number/String, 按钮宽度，默认为100
//    color: String, 开关背景颜色，默认为white
//    ballColor: String, 按钮球颜色，默认为skyblue
//    colorOn: String, 开关打开时背景颜色，默认为yellowgreen
//    双向绑定参数：isSwitch，类型为Boolean
//4.使用用例：
//[Script] const isSwitch = ref(true)
//[HTML] <mt_switch v-model:isSwitch="isSwitch"/>

import {defineModel, defineProps} from 'vue'

const mt_switch_data = defineProps({
    'height':{
        type: [Number, String],
        default: 30
    },
    'width':{
        type: [Number, String],
        default: 100
    },
    'color':{
        type: String,
        default: "white"
    },
    'ballColor':{
        type: String,
        default: "skyblue"
    },
    'colorOn': {
        type: String,
        default: "yellowgreen"
    }
})

const mt_switch_model = defineModel(  "isSwitch", {
        type: Boolean ,
        default: false,
})

const mt_switch_swtichState = () =>{
    if(mt_switch_model.value) {
        mt_switch_model.value = false
    } else { 
        mt_switch_model.value = true
    }
}

</script>

<template>
    <div>
        <div id="mt_switch_switch" 
            :style="{
                height: mt_switch_data['height'] +'px', 
                width: mt_switch_data['width'] +'px', 
                backgroundColor: mt_switch_data['color'], 
                borderRadius: mt_switch_data['height'] / 2 + 'px',
            }"
            style="border: 2px solid black;"
            @click="mt_switch_swtichState">
            <div id="mt_switch_switchBall" 
                :style="{
                    'height': mt_switch_data['height'] * 0.8 + 'px', 
                    'width': mt_switch_data['height'] * 0.8 + 'px',
                    'top': mt_switch_data['height'] * 0.1 + 'px', 
                    'borderRadius': mt_switch_data['height'] * 0.9 /2 + 'px', 
                    'backgroundColor': mt_switch_data['ballColor'],
                    'left': mt_switch_model? mt_switch_data['width']-mt_switch_data['height']+3+'px' : '3px'
                    }"
                style="border: 1px solid black; position: absolute;transition-duration: 0.5s">
            </div>
            <div id="mt_switch_switchBack"
                :style="{
                    'height': mt_switch_data['height'] - 4 +'px', 
                    'backgroundColor': mt_switch_data['colorOn'], 
                    'borderRadius': mt_switch_data['height'] / 2 + 'px',
                    width: mt_switch_model? mt_switch_data['width']-4 +'px': mt_switch_data['height'] - 3 +'px'
                }"
                style="transition-duration: 0.5s">
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>