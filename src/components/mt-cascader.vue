<script setup>

//编写阶段 级联选择器
//2024.7.26更新 能够读取DATA数组,生成一个列表。完成了箭头的翻转。
//          未解决的问题：无法读取className

//2024.7.27更新 不用className了，单独封装了函数
//          点击选择器会直接展开DATA数组

//2024.7.28更新 基本完成 明天写多选


import { ref, defineProps, watch, onMounted } from 'vue'

const data = defineProps({
    defaultNode: {
        type:String,
        default:"Test"
    },
    width:{
        type:Number,
        default:200
    },
    height:{
        type:Number,
        default: 50
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
                children:[
                    {
                        value: "F",
                        label: "Ftest"
                    }   
                ]
            }
        ]
    },
    {
        value: "D",
        label: "Dtest",
        children: [
            {
                value: "E",
                label: "Etest",
            }
        ]
    },
])

const mt_Node = ref("")
const mt_colorLock = ref(false)
const mt_ISselect = ref([])
const mt_ISselectTemp = ref([])

onMounted(()=>{
    mt_Node.value = data.defaultNode
})

const mt_create = () =>{
    mt_createBoardItem(boardData.value, 0)
    mt_createMask()
}

const mt_delect = () =>{
    mt_delectMask()
    mt_delectBoard(0)
    if(mt_Node.value == data.defaultNode){
        mt_ISselect.value = []
    }
}

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

const mt_examineData = (item, boardNum) => {
    mt_ISselectTemp.value[boardNum] = item.label
    mt_ISselectTemp.value.length = boardNum + 1
    if(item.children){
        mt_delectBoard(boardNum + 1)
        mt_createBoardItem(item.children, boardNum + 1)
    } else {
        mt_ISselect.value = mt_ISselectTemp.value.slice()
        let dataLable = ""
        for(let t = 0; t <= boardNum; t++) {
            dataLable += mt_ISselect.value[t]
            if(t != boardNum) dataLable += '/'
        }
        if(mt_Node.value == dataLable){
            mt_Node.value = data.defaultNode
            mt_ISselect.value.length = 0
        } else {
            mt_Node.value = dataLable
        }
        mt_delect()
    }
}

const mt_createBoardSingle = (item, boardNum) =>{
    const boardID = "mt_cascaderBoard" + boardNum
    const mt_div = document.createElement('div');
    mt_div.id = item.value
    mt_div.style.zIndex = '11'
    mt_div.style.width = data.width - 15 + 'px';
    mt_div.style.height = data.height + 'px';
    mt_div.style.lineHeight = data.height + 'px';
    mt_div.style.fontSize = data.height * 0.3 + 'px'
    mt_div.style.fontWeight = 'bold'
    mt_div.innerHTML = item.label
    if(item.label == mt_ISselect.value[boardNum]) {
        mt_div.style.color = "blue"
    }
    mt_div.style.position = "relative";
    mt_div.style.left= "5px";
    document.getElementById(boardID).appendChild(mt_div)
    if(item.children){
        const mt_arrowSmall = document.createElement('div');
        mt_arrowSmall.style.position = "absolute"
        mt_arrowSmall.style.width = data.height * 0.2 +'px'
        mt_arrowSmall.style.height = data.height * 0.2 +'px'
        mt_arrowSmall.style.top = "37.5%"
        mt_arrowSmall.style.right = "5%"
        mt_arrowSmall.style.display = 'inline-block'
        mt_arrowSmall.style.transform = "rotate(45deg)"
        mt_arrowSmall.style.borderStyle = "solid"
        mt_arrowSmall.style.borderBottom = '3px'
        mt_arrowSmall.style.borderLeft = '3px'
        if(item.label == mt_ISselect.value[boardNum]) {
            mt_arrowSmall.style.borderColor = 'blue'
        } else {
            mt_arrowSmall.style.borderColor = 'grey'
        }
        mt_div.append(mt_arrowSmall)
    }
    mt_div.onclick = function(){mt_examineData(item, boardNum)}
}

const mt_createBoardItem = (cascaderData, boardNum) =>{
    let newBoardID = "mt_cascaderBoard" + boardNum
    mt_createBoard("mt_ColorExcMain", newBoardID, boardNum)
    for(let item in cascaderData){
        mt_createBoardSingle(cascaderData[item], boardNum)
        // if(cascaderData[item].children){
        //     mt_createBoardItem(cascaderData[item].children, boardNum + 1)
        // }
    }
}

const mt_createBoard = (oldBoardID, newBoardID, boardNum) =>{
    if(document.getElementById(newBoardID)) return
    const Selected = document.getElementById(oldBoardID)
    const cascaderBoard = document.createElement('div')
    cascaderBoard.id = newBoardID
    cascaderBoard.style.zIndex = '10'
    cascaderBoard.style.position = "absolute"
    cascaderBoard.style.width = data.width +'px' 
    cascaderBoard.style.margin = "2px 0 0 0"
    cascaderBoard.style.height = "auto";
    cascaderBoard.style.borderRadius = "10px";
    cascaderBoard.style.border = "2px solid blue";
    cascaderBoard.style.backgroundColor = "white";
    cascaderBoard.style.left = boardNum * (data.width + 2) +'px'
    Selected.after(cascaderBoard)
}

const mt_delectBoard = (mt_boardNum) =>{
    let item = mt_boardNum
    while(document.getElementById("mt_cascaderBoard" + item)){
        document.getElementById("mt_cascaderBoard" + item).remove()
        item ++;
    }
}

const test = () =>{
    if(mt_ISselect.value.length != 0){
        alert(mt_Node.value)
    } else {
        alert("Error")
    }
}

</script>

<template>
    <button @click="test">test</button>
    <div id="mt_Masklayer" class="mt_Masklayer" @click="mt_delect"></div>
    <div :style="{width: width+'px',height: height+'px'}">
        <div id="mt_ColorExcMain" class="mt_Cascader" @click="mt_create" @mouseover="mt_colorHigh" @mouseleave="mt_colorLow">
            <div id="mt_Selected" class="mt_Selected" :style="{height: height*0.6+'px', lineHeight: height*0.6+'px'}">{{mt_Node}}</div>
            <div id="mt_Arrow" class="mt_RotateArrow" :style="{height: height * 0.3+'px', width: height * 0.3+'px'}">
                <div id="mt_ColorExcArrow" class="mt_Arrow" :style="{height: height*0.3+'px', width: height*0.3+'px' ,top: '20%'}" />
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

.mt_Masklayer{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(0,0,0,0);
    visibility: hidden;
}

.mt_RotateArrow{
    transition-duration:0.2s;
    position:absolute;
    right: 5%;
    top: 35%;

    /* background-color: skyblue;  */
}

.mt_Arrow {
    display: inline-block;
    position: absolute;
    border:4px solid skyblue;
    transition-duration:0.2s;
    box-sizing: border-box;
    border-bottom: 0px;
    border-right: 0px;
    transform: rotate(45deg);

    /* background-color: gray;  */
}

.mt_Selected{
    position:absolute;
    left: 5%;
    right: 15%;
    top: 20%;
    bottom: 20%;
    font-weight: bold;
}

</style>