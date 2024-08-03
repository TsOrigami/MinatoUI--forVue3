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

import {ref, defineModel, defineProps, onMounted} from 'vue'

const data = defineProps({
    height:{
        type: [Number, String],
        default: 30
    },
    width:{
        type: [Number, String],
        default: 100
    },
    color:{
        type: String,
        default: "white"
    },
    ballColor:{
        type: String,
        default: "skyblue"
    },
    colorOn: {
        type: String,
        default: "yellowgreen"
    }
})

const model = defineModel(  "isSwitch", {
        type: Boolean ,
        default: false,
})

const swtichState = () =>{
    if(model.value) {
        model.value = false
    } else { 
        model.value = true
    }
}

</script>

<template>
    <div>
        <div id="mt_switch_switch" 
            :style="{height: height +'px', width: width +'px', backgroundColor: color, borderRadius: height/2 + 'px',}"
            style="border: 2px solid black;"
            @click="swtichState">
            <div id="mt_switch_switchBall" 
                :style="{'height': height*0.8 +'px', 'width': height*0.8 +'px','top': height*0.1+'px', 
                    'borderRadius': height*0.9 /2 + 'px', 'backgroundColor': ballColor,
                    'left':model? width-height+3+'px' : '3px'}"
                style="border: 1px solid black; position: absolute;transition-duration: 0.5s">
            </div>
            <div id="mt_switch_switchBack"
                :style="{'height': height-4 +'px', 'backgroundColor': colorOn, 'borderRadius': height/2 + 'px',
                     width: model? width-4 +'px': height-3 +'px'}"
                style="transition-duration: 0.5s">
            </div>
        </div>
        <button @click="console.log(model)">testA</button>
    </div>
</template>

<style scoped>
</style>