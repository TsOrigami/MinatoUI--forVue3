<script setup>

////1.组件名称：mt-slider
//2.组件功能：滑块
//3.组件参数：
//      width: Number，宽度，默认200
//      height: Number，高度，默认10
//      color: String，滑块颜色，默认gray
//      sltColor: String，滑块选中部分颜色 / 滑块浮标边框颜色，默认skyblue
//      point: Number, 固定点的数量, 会将滑块均分。
//      whenup: Boolean, 是否在松开时才返回值, 默认为false
//      双向绑定参数: v-model: Number, 选中部分占比，范围为0-100，保留整数


import {ref, defineProps, defineModel, onMounted, watch} from 'vue'

const mt_slider_data = defineProps({
    'width':{
        type: Number,
        default: 200
    },
    'height':{
        type:Number,
        default: 10
    },
    'color':{
        type: String,
        default: 'gray'
    },
    'sltColor':{
        type: String,
        default: 'skyblue'
    },
    'point': {
        type: Number,
        default: 0
    },
    'whenup':{
        type: Boolean,
        default:false
    }
})

const mt_slider_sltData = defineModel({
    type: Number,
    default: 0
})

const mt_slider_sltData_onUP = ref(0)
const mt_slider_length = ref(0)
const mt_slider_pointNum = ref(0)

const mt_slider_pushSilder = () =>{
    const body = document.body
    body.addEventListener('mousemove',mt_slider_moveSilder)
    body.addEventListener('mouseup', mt_slider_freeSilder)
}

const mt_slider_moveSilder = (event) =>{
    let pos = event.x
    let len = document.getElementById('mt_slider_main').offsetLeft + mt_slider_data['height'] / 2
    if(mt_slider_data['point'] < 2) {
        mt_slider_length.value = ((pos - len) / (mt_slider_data['width'] - mt_slider_data['height'])) * 100
        if(mt_slider_length.value > 100){
            mt_slider_length.value = 100
        } else if(mt_slider_length.value < 0){
            mt_slider_length.value = 0
        }
        if(mt_slider_data['whenup']) mt_slider_sltData_onUP.value = Number(mt_slider_length.value.toFixed(0))
        else mt_slider_sltData.value = Number(mt_slider_length.value.toFixed(0))
    } else {
        let place = ((pos - len) / (mt_slider_data['width'] - mt_slider_data['height'])) * 100
        if( place >= 100) place = 100
        let potNumberFloor = Math.floor(place / (100 / ( mt_slider_data['point'] - 1 )))
        let potNumberCeil = Math.ceil(place / (100 / ( mt_slider_data['point'] - 1 )))
        let potNumber = potNumberFloor
        if( potNumber < mt_slider_pointNum.value ) potNumber = potNumberCeil
        mt_slider_length.value = potNumber * (100 / ( mt_slider_data['point'] - 1 ))
        mt_slider_pointNum.value = potNumber
    }
    
}

const mt_slider_freeSilder = () =>{
    const body = document.body
    body.removeEventListener('mousemove',mt_slider_moveSilder)
    body.removeEventListener('mouseup', mt_slider_freeSilder)
    if(mt_slider_data['whenup']) {
        mt_slider_sltData.value = mt_slider_sltData_onUP.value
    }
}

const mt_slider_moveToSilder = (event) =>{
    let pos = event.x
    let len = document.getElementById('mt_slider_main').offsetLeft + mt_slider_data['height'] / 2
    if(mt_slider_data['point'] < 2) {
        mt_slider_length.value = ((pos - len) / (mt_slider_data['width'] - mt_slider_data['height'])) * 100
        if(mt_slider_length.value > 100){
            mt_slider_length.value = 100
        } else if(mt_slider_length.value < 0){
            mt_slider_length.value = 0
        }
        if(mt_slider_data['whenup']) mt_slider_sltData_onUP.value = Number(mt_slider_length.value.toFixed(0))
        else mt_slider_sltData.value = Number(mt_slider_length.value.toFixed(0))
    } else {
        let place = ((pos - len) / (mt_slider_data['width'] - mt_slider_data['height'])) * 100
        if( place >= 100) place = 100
        let potNumberFloor = Math.floor(place / (100 / ( mt_slider_data['point'] - 1 )))
        let potNumberCeil = Math.ceil(place / (100 / ( mt_slider_data['point'] - 1 )))
        let potNumber = potNumberFloor
        if( potNumber < mt_slider_pointNum.value ) potNumber = potNumberCeil
        mt_slider_length.value = potNumber * (100 / ( mt_slider_data['point'] - 1 ))
        mt_slider_pointNum.value = potNumber
    }
}

const mt_slider_moveToPoint = (potNum) =>{
    mt_slider_length.value = potNum * (100 / ( mt_slider_data['point'] - 1 ))
}

</script>

<template>
    <div id="mt_slider_main">
        <div id="mt_slider_line" 
        @mousedown="mt_slider_moveToSilder"
        style="position: relative; border: 2px solid black;"
        :style="{
            backgroundColor: mt_slider_data['color'],
            width: mt_slider_data['width'] + 'px',
            height: mt_slider_data['height'] + 'px',
            borderRadius: mt_slider_data['height'] / 2 +'px',
        }">
            <div id="mt_slider_isColor" style="position: absolute;"
                :style="{
                    backgroundColor: mt_slider_data['sltColor'],
                    height: mt_slider_data['height'] - 4 +'px',
                    width: mt_slider_length / 100 * (mt_slider_data['width'] - 4) + 'px',
                    borderRadius: (mt_slider_data['height'] - 4) / 2 +'px',
                }"></div>
        </div>
        <div v-if="mt_slider_data['point'] > 1 ">
            <div v-for="pot in mt_slider_data['point']">
                <div :id="'point' + pot - 1" style="position: absolute; user-select: none; background-color: white; top: 0px; border: 1px solid green;"
                    :style="{
                        left: ( pot - 1 ) * ( mt_slider_data['width'] - mt_slider_data['height'] ) / (mt_slider_data['point'] - 1) +'px',
                        height: mt_slider_data['height'] +'px',
                        width: mt_slider_data['height'] +'px',
                        borderRadius: mt_slider_data['height'] / 2 +'px',
                    }"
                    @click="mt_slider_moveToPoint(pot - 1)">
                    {{ pot }}
                </div>
            </div>
        </div>
        <div id="mt_slider_bobber" style="position: absolute; cursor: move; background-color: white; border-style: solid; border-width: 2px;"
            :style="{
                borderColor: mt_slider_data['sltColor'],
                height: mt_slider_data['height'] * 2 + 'px',
                width: mt_slider_data['height'] * 2 + 'px',
                borderRadius: mt_slider_data['height'] + 'px',
                top: - mt_slider_data['height'] * 0.5 +'px',
                left: - mt_slider_data['height'] / 2 + mt_slider_length / 100 * (mt_slider_data['width']  - mt_slider_data['height']) +'px'
            }"
            @mousedown = "mt_slider_pushSilder"></div>
    </div>
</template>

<style>

</style>