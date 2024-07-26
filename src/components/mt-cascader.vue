<script setup>

//编写阶段 级联选择器
//2024.7.26更新 能够读取DATA数组,生成一个列表。完成了箭头的翻转。
//          未解决的问题：无法读取className

import { ref, defineProps, watch, onMounted } from 'vue'

const data = defineProps({
    defaultNode: {
        type:String,
        default:"Enter"
    },
    width:{
        type:Number,
        default:200
    },
    height:{
        type:Number,
        default:40
    },
})

const boardData = ref([
    {
        value: "A",
        label: "Atest",
    },
    {
        value: "B",
        label: "Btest",
        children: [
            {
                value: "C",
                label: "Ctest",
            }
        ]
    },
    {
        value: "D",
        label: "Dtest",
    },
])

const mt_Node = ref("")
const mt_colorLock = ref(false)

onMounted(()=>{
    mt_Node.value = data.defaultNode
})

const mt_createMask = () =>{
    mt_colorLock.value = true
    mt_colorHigh()
    document.getElementById("mt_Masklayer").style.visibility = "visible"
    document.getElementById('mt_Arrow').style.transform = 'rotate(180deg)';
}

const mt_delectMask = () =>{
    mt_colorLock.value = false
    mt_colorLow()
    document.getElementById("mt_Masklayer").style.visibility = "hidden"
    document.getElementById('mt_Arrow').style.transform = 'rotate(0deg)'
}


const mt_colorHigh = () =>{
    document.getElementById('mt_ColorExcMain').style.borderColor = 'blue'
    document.getElementById('mt_ColorExcArrow').style.borderColor = 'blue'
}

const mt_colorLow = () =>{
    if(!mt_colorLock.value){
        document.getElementById('mt_ColorExcMain').style.borderColor = 'skyblue'
        document.getElementById('mt_ColorExcArrow').style.borderColor = 'skyblue'
    }
}

const mt_createBoardSingle =(item) =>{
    const div = document.createElement('div');
    div.id = item.value
    div.className = 'mt_Border'
    div.style.width = data.width - 15 + 'px';
    div.style.height = data.height + 'px';
    div.innerHTML = item.label;
    document.getElementById("mt_cascaderBoard").appendChild(div)
    console.log(div)
}

const mt_createBoard = (tableData) =>{
    console.log(tableData)
    for(let item in tableData){
        mt_createBoardSingle(tableData[item])
        if(tableData[item].children){
            mt_createBoard(tableData[item].children)
        }
    }
}

const test = () =>{
    const testData = boardData.value
    mt_createBoard(testData)
}

</script>

<template>
    <button @click="test">test</button>
    <div id="mt_Masklayer" class="mt_Masklayer" @click="mt_delectMask"></div>
    <div :style="{width: width+'px',height: height+'px'}">
        <div id="mt_ColorExcMain" class="mt_Cascader" @click="mt_createMask" @mouseover="mt_colorHigh" @mouseleave="mt_colorLow">
            <div id="mt_Selected" class="mt_Selected" :style="{height:height*0.6+'px', lineHeight: height*0.6+'px'}">{{mt_Node}}</div>
            <div id="mt_Arrow" class="mt_RotateArrow" :style="{height: height*0.3+'px', width: height*0.3+'px'}">
            <div id="mt_ColorExcArrow" class="mt_Arrow" :style="{height: height*0.3+'px', width: height*0.3+'px', top:-height*0.1+'px'}" />
            </div>
        </div>
    </div>
    <div id="mt_cascaderBoard" class="mt_cascaderBoard" :style="{width: width+'px'}"/>
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

.mt_Masklayer{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0,0,0,0.2);
    visibility: hidden;
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

.mt_cascaderBoard{
    height: auto;
    border-radius: 10px;
    border: 2px solid blue;
    background-color: white;
}

.mt_Border{
    position : relative;
    left: 5px;
    background :white;
    border-style: solid;
    border-color: blue;
    border-width: 0px 0px 2px 0px;
}
</style>