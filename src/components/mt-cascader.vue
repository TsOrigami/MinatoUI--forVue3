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

const mt_cascader_data = defineProps({
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

const mt_cascader_backData = defineModel( "data", {
    type: Array ,
    default: [],
})

const mt_cascader_Node = ref("")
const mt_cascader_colorLock = ref(false)
const mt_cascader_showData =ref([])
const mt_cascader_ISselect = ref([])
const mt_cascader_ISselectTemp = ref([])

onMounted(()=>{
    mt_cascader_Node.value = mt_cascader_data.defaultNode
    if(mt_cascader_Node.value.length > 15) {
            mt_cascader_Node.value = mt_cascader_Node.value.slice(0,15) + '...'
        }
})

const mt_cascader_create = () =>{
    mt_cascader_createBoardItem(mt_cascader_data.options, 0)
    mt_cascader_createMask()
}

const mt_cascader_delect = () =>{
    mt_cascader_delectMask()
    mt_cascader_delectBoard(0)
    if(mt_cascader_Node.value == mt_cascader_data.defaultNode){
        mt_cascader_ISselect.value = []
    }
}

const mt_cascader_createMask = () =>{
    mt_cascader_colorLock.value = true
    mt_cascader_colorHigh()
    document.getElementById("mt_cascader_Masklayer").style.visibility = "visible"
    document.getElementById('mt_cascader_Arrow').style.transform = 'rotate(180deg)';
}

const mt_cascader_delectMask = () =>{
    mt_cascader_colorLock.value = false
    mt_cascader_colorLow()
    document.getElementById("mt_cascader_Masklayer").style.visibility = "hidden"
    document.getElementById('mt_cascader_Arrow').style.transform = 'rotate(0deg)'
}

const mt_cascader_colorHigh = () =>{
    document.getElementById('mt_cascader_ColorExcMain').style.borderColor = 'blue'
    document.getElementById('mt_cascader_ColorExcArrow').style.borderColor = 'blue'
}

const mt_cascader_colorLow = () =>{
    if(!mt_cascader_colorLock.value){
        document.getElementById('mt_cascader_ColorExcMain').style.borderColor = 'skyblue'
        document.getElementById('mt_cascader_ColorExcArrow').style.borderColor = 'skyblue'
    }
}

const mt_cascader_findData = (item) =>{
    for(let i = 0; i < mt_cascader_ISselect.value.length; i++) {
        for(let t = 0; t < mt_cascader_ISselect.value[i].length; t++) {
            if (mt_cascader_ISselect.value[i][t] === item.label) {
                return true
            }
        }
    }
    return false
}

const mt_cascader_examineData = (item, boardNum) => {
    mt_cascader_ISselectTemp.value[boardNum] = item.label
    mt_cascader_ISselectTemp.value.length = boardNum + 1
    if(item.children){
        mt_cascader_delectBoard(boardNum + 1)
        mt_cascader_createBoardItem(item.children, boardNum + 1)
    } else {
        let mt_cascader_index = 0
        if(mt_cascader_ISselect.value.length != 0) {
            let flag = true
            for(let i = 0; i< mt_cascader_ISselect.value.length; i++) {
                if(mt_cascader_ISselectTemp.value.toString() === mt_cascader_ISselect.value[i].toString()) {
                    mt_cascader_ISselect.value.splice(i, 1)
                    mt_cascader_showData.value.splice(i, 1)
                    mt_cascader_backData.value.splice(i, 1)
                    flag = false
                    break
                }
            } if(flag) {
                mt_cascader_ISselect.value.push(mt_cascader_ISselectTemp.value.slice())
                mt_cascader_showData.value.push(item.label)
                mt_cascader_backData.value.push(item.value)
            }
        } else {
            mt_cascader_ISselect.value.push(mt_cascader_ISselectTemp.value.slice())
            mt_cascader_showData.value.push(item.label)
            mt_cascader_backData.value.push(item.value)
        }
        let dataLable = mt_cascader_showData.value.join(' / ')
        if(dataLable !== "") {
            mt_cascader_Node.value = dataLable
        } else {
            mt_cascader_Node.value = mt_cascader_data.defaultNode
        }
        if(mt_cascader_Node.value.length > 15) {
            mt_cascader_Node.value = mt_cascader_Node.value.slice(0,15) + '...'
        }
        mt_cascader_delect()
    }
}

const mt_cascader_createBoardSingle = (item, boardNum) =>{
    const boardID = "mt_cascader_cascaderBoard" + boardNum
    const mt_cascader_div = document.createElement('div');
    mt_cascader_div.id = item.value
    mt_cascader_div.style.zIndex = '11'
    mt_cascader_div.style.width = mt_cascader_data.width - 15 + 'px';
    mt_cascader_div.style.height = mt_cascader_data.height + 'px';
    mt_cascader_div.style.lineHeight = mt_cascader_data.height + 'px';
    mt_cascader_div.style.fontSize = mt_cascader_data.height * 0.3 + 'px'
    mt_cascader_div.style.fontWeight = 'bold'
    mt_cascader_div.innerHTML = item.label
    if(mt_cascader_findData(item)) {
        mt_cascader_div.style.color = "blue"
    }
    mt_cascader_div.style.position = "relative";
    mt_cascader_div.style.left= "5px";
    document.getElementById(boardID).appendChild(mt_cascader_div)
    if(item.children){
        const mt_cascader_arrowSmall = document.createElement('div');
        mt_cascader_arrowSmall.style.position = "absolute"
        mt_cascader_arrowSmall.style.width = mt_cascader_data.height * 0.2 +'px'
        mt_cascader_arrowSmall.style.height = mt_cascader_data.height * 0.2 +'px'
        mt_cascader_arrowSmall.style.top = "37.5%"
        mt_cascader_arrowSmall.style.right = "5%"
        mt_cascader_arrowSmall.style.display = 'inline-block'
        mt_cascader_arrowSmall.style.transform = "rotate(45deg)"
        mt_cascader_arrowSmall.style.borderStyle = "solid"
        mt_cascader_arrowSmall.style.borderBottom = '3px'
        mt_cascader_arrowSmall.style.borderLeft = '3px'
        if(item.label == mt_cascader_ISselect.value[boardNum]) {
            mt_cascader_arrowSmall.style.borderColor = 'blue'
        } else {
            mt_cascader_arrowSmall.style.borderColor = 'grey'
        }
        mt_cascader_div.append(mt_cascader_arrowSmall)
    }
    mt_cascader_div.onclick = function(){mt_cascader_examineData(item, boardNum)}
}

const mt_cascader_createBoardItem = (cascaderData, boardNum) =>{
    let newBoardID = "mt_cascader_cascaderBoard" + boardNum
    mt_cascader_createBoard("mt_cascader_ColorExcMain", newBoardID, boardNum)
    for(let item in cascaderData){
        mt_cascader_createBoardSingle(cascaderData[item], boardNum)
    }
}

const mt_cascader_createBoard = (oldBoardID, newBoardID, boardNum) =>{
    if(document.getElementById(newBoardID)) return
    const Selected = document.getElementById(oldBoardID)
    const cascaderBoard = document.createElement('div')
    cascaderBoard.id = newBoardID
    cascaderBoard.style.zIndex = '10'
    cascaderBoard.style.position = "absolute"
    cascaderBoard.style.width = mt_cascader_data.width +'px' 
    cascaderBoard.style.margin = "2px 0 0 0"
    cascaderBoard.style.height = mt_cascader_data.height * mt_cascader_data.display+'px';
    cascaderBoard.style.borderRadius = "10px";
    cascaderBoard.style.border = "2px solid blue";
    cascaderBoard.style.backgroundColor = "white";
    cascaderBoard.style.left = boardNum * (mt_cascader_data.width + 2) +'px'
    cascaderBoard.style.overflow = "scroll"
    cascaderBoard.style.overflowX = "hidden"
    cascaderBoard.style.scrollbarWidth = "none"
    Selected.after(cascaderBoard)
}

const mt_cascader_delectBoard = (mt_cascader_boardNum) =>{
    let item = mt_cascader_boardNum
    while(document.getElementById("mt_cascader_cascaderBoard" + item)){
        document.getElementById("mt_cascader_cascaderBoard" + item).remove()
        item ++;
    }
}

</script>

<template>
    <div id="mt_cascader_Masklayer" class="mt_cascader_Masklayer" @click="mt_cascader_delect"></div>
    <div :style="{width: width+'px',height: height+'px'}">
        <div id="mt_cascader_ColorExcMain" class="mt_cascader_Cascader" @click="mt_cascader_create" @mouseover="mt_cascader_colorHigh" @mouseleave="mt_cascader_colorLow">
            <div id="mt_cascader_Selected" class="mt_cascader_Selected" :style="{height: height*0.6+'px', lineHeight: height*0.6+'px'}">
                {{mt_cascader_Node}}
            </div>
            <div id="mt_cascader_Arrow" class="mt_cascader_RotateArrow" :style="{height: height * 0.3+'px', width: height * 0.3+'px'}">
                <div id="mt_cascader_ColorExcArrow" class="mt_cascader_Arrow" :style="{height: height*0.3+'px', width: height*0.3+'px' ,top: '20%'}" />
            </div>
        </div>
    </div>
</template>

<style scoped>

.mt_cascader_Cascader {
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

.mt_cascader_Masklayer{
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

.mt_cascader_RotateArrow{
    transition-duration:0.2s;
    position:absolute;
    right: 5%;
    top: 35%;

    /* background-color: skyblue;  */
}

.mt_cascader_Arrow {
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

.mt_cascader_Selected{
    position:absolute;
    left: 5%;
    right: 15%;
    top: 20%;
    bottom: 20%;
    font-weight: bold;
}

</style>