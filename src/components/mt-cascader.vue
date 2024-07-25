<script setup>

//编写阶段 级联选择器

import { ref, defineProps, watch, toRefs } from 'vue'

const data = defineProps({})

const rotateValue = ref(0)
const wid = ref(200)
const hei = ref(40)

const testNode = ref("A test")

const test = () => {
    rotateValue.value = (rotateValue.value + 1) %2
    if(rotateValue.value == 1) document.getElementById('mt_Arrow').style.transform = 'rotate(180deg)'
    else document.getElementById('mt_Arrow').style.transform = 'rotate(0deg)'
}

const colorHigh = () =>{
    document.getElementById('mt_ColorExcMain').style.borderColor = 'blue'
    document.getElementById('mt_ColorExcArrow').style.borderColor = 'blue'
}

const colorLow = () =>{
    document.getElementById('mt_ColorExcMain').style.borderColor = 'skyblue'
    document.getElementById('mt_ColorExcArrow').style.borderColor = 'skyblue'
}

</script>

<template>
    <div :style="{width: wid+'px',height: hei+'px'}">
        <div id="mt_ColorExcMain" class="mt_Cascader" @click="test" @mouseover="colorHigh" @mouseleave="colorLow">
            <div id="mt_Selected" class="mt_Selected" :style="{height:hei*0.6+'px', lineHeight: hei*0.6+'px'}">{{testNode}}</div>
            <div id="mt_Arrow" class="mt_RotateArrow" :style="{height: hei*0.3+'px', width: hei*0.3+'px'}">
            <div id="mt_ColorExcArrow" class="mt_Arrow" :style="{height: hei*0.3+'px', width: hei*0.3+'px', top:-hei*0.1+'px'}" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.mt_Cascader {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border: 2px solid skyblue;
    background-color: white;
    transition-duration:0.6s;
}

.mt_RotateArrow{
    transition-duration:0.3s;
    position:absolute;
    right: 5%;
    top: 35%;
}

.mt_Arrow {
    display: inline-block;
    transform: rotate(45deg);
    position: relative;
    border-style: solid;
    border-width: 3px 0px 0px 3px;
    border-color: skyblue;
    transition-duration:0.6s;
}

.mt_Selected{
    position:absolute;
    left: 5%;
    right: 15%;
    top: 20%;
    bottom: 20%;
}
</style>