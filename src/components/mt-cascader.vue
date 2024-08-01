<script setup>

//1.组件名称：mt-cascader
//2.组件功能：级联选择器
//3.组件参数：
//   defaultNode: String, 选择为空时显示的节点名称, 默认为Cascader
//   width: Number, 组件宽度, 默认为200
//   height: Number, 组件高度, 默认为50
//   multiple: Boolean, 是否支持多选, 默认为false
//   display: Number, 显示的节点数量, 默认为4
//   options: Array, 节点数据, 默认为空
//   双向绑定参数：data: Array, 返回选中的节点数据


import { ref, defineProps, watch, onMounted, defineModel } from 'vue'

const data = defineProps({
    defaultNode: {
        type:String,
        default:"Cascader"
    },
    width:{
        type:Number,
        default:200
    },
    height:{
        type:Number,
        default: 50
    },
    multiple:{
        type: Boolean,
        default: false
    },
    display: {
        type: Number,
        default: 4
    },
    options: {
        type: Array,
        default: []
    }
})

const mt_backData = defineModel( "data", {
    type: Array ,
    default: [],
})

const mt_Node = ref("")
const mt_colorLock = ref(false)
const mt_showData =ref([])
const mt_ISselect = ref([])
const mt_ISselectTemp = ref([])

onMounted(()=>{
    mt_Node.value = data.defaultNode
    if(mt_Node.value.length > 15) {
            mt_Node.value = mt_Node.value.slice(0,15) + '...'
        }
})

const mt_create = () =>{
    mt_createBoardItem(data.options, 0)
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

const mt_findData = (item) =>{
    for(let i = 0; i < mt_ISselect.value.length; i++) {
        for(let t = 0; t < mt_ISselect.value[i].length; t++) {
            if (mt_ISselect.value[i][t] === item.label) {
                return true
            }
        }
    }
    return false
}

const mt_examineData = (item, boardNum) => {
    mt_ISselectTemp.value[boardNum] = item.label
    mt_ISselectTemp.value.length = boardNum + 1
    if(item.children){
        mt_delectBoard(boardNum + 1)
        mt_createBoardItem(item.children, boardNum + 1)
    } else {
        let mt_index = 0
        if(mt_ISselect.value.length != 0) {
            let flag = true
            for(let i = 0; i< mt_ISselect.value.length; i++) {
                if(mt_ISselectTemp.value.toString() === mt_ISselect.value[i].toString()) {
                    mt_ISselect.value.splice(i, 1)
                    mt_showData.value.splice(i, 1)
                    mt_backData.value.splice(i, 1)
                    flag = false
                    break
                }
            } if(flag) {
                mt_ISselect.value.push(mt_ISselectTemp.value.slice())
                mt_showData.value.push(item.label)
                mt_backData.value.push(item.value)
            }
        } else {
            mt_ISselect.value.push(mt_ISselectTemp.value.slice())
            mt_showData.value.push(item.label)
            mt_backData.value.push(item.value)
        }
        let dataLable = mt_showData.value.join(' / ')
        if(dataLable !== "") {
            mt_Node.value = dataLable
        } else {
            mt_Node.value = data.defaultNode
        }
        if(mt_Node.value.length > 15) {
            mt_Node.value = mt_Node.value.slice(0,15) + '...'
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
    if(mt_findData(item)) {
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
    cascaderBoard.style.height = data.height * data.display+'px';
    cascaderBoard.style.borderRadius = "10px";
    cascaderBoard.style.border = "2px solid blue";
    cascaderBoard.style.backgroundColor = "white";
    cascaderBoard.style.left = boardNum * (data.width + 2) +'px'
    cascaderBoard.style.overflow = "scroll"
    cascaderBoard.style.overflowX = "hidden"
    cascaderBoard.style.scrollbarWidth = "none"
    Selected.after(cascaderBoard)
}

const mt_delectBoard = (mt_boardNum) =>{
    let item = mt_boardNum
    while(document.getElementById("mt_cascaderBoard" + item)){
        document.getElementById("mt_cascaderBoard" + item).remove()
        item ++;
    }
}

</script>

<template>
    <div id="mt_Masklayer" class="mt_Masklayer" @click="mt_delect"></div>
    <div :style="{width: width+'px',height: height+'px'}">
        <div id="mt_ColorExcMain" class="mt_Cascader" @click="mt_create" @mouseover="mt_colorHigh" @mouseleave="mt_colorLow">
            <div id="mt_Selected" class="mt_Selected" :style="{height: height*0.6+'px', lineHeight: height*0.6+'px'}">
                {{mt_Node}}
            </div>
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