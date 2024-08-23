<script setup>

//2024/8/22 开始写树形选择器
//2024/8/23 有点事



import { ref, defineProps, watch, onMounted, defineModel } from 'vue'

const mt_treeSelect_data = defineProps({
    'defaultNode': {
        type:String,
        default:"TreeSelect"
    },
    'width':{
        type:Number,
        default:200
    },
    'height':{
        type:Number,
        default: 50
    },
    'multiple':{
        type: Boolean,
        default: false
    },
    'display': {
        type: Number,
        default: 4
    },
    'options': {
        type: Array,
        default: []
    }
})

const mt_treeSelect_backData = defineModel( "data", {
    type: Array ,
    default: [],
})

const mt_treeSelect_Node = ref("")
const mt_treeSelect_colorLock = ref(false)
const mt_treeSelect_showData =ref([])
const mt_treeSelect_ISselect = ref([])
const mt_treeSelect_ISselectTemp = ref([])
const mt_treeSelect_flag = ref(true)

onMounted(()=>{
    mt_treeSelect_Node.value = mt_treeSelect_data.defaultNode
    if(mt_treeSelect_Node.value.length > 15) {
            mt_treeSelect_Node.value = mt_treeSelect_Node.value.slice(0,15) + '...'
        }
})

const mt_treeSelect_create = () =>{
    mt_treeSelect_createBoardItem(mt_treeSelect_data.options, 0)
    mt_treeSelect_createMask()
}

const mt_treeSelect_delect = () =>{
    if(mt_treeSelect_flag.value){
        mt_treeSelect_delectMask()
        mt_treeSelect_delectBoard(0)
        if(mt_treeSelect_Node.value == mt_treeSelect_data.defaultNode){
            mt_treeSelect_ISselect.value = []
        }
    } else {
        mt_treeSelect_flag.value = true
    }
}

const mt_treeSelect_createMask = () =>{
    mt_treeSelect_colorLock.value = true
    mt_treeSelect_colorHigh()
    document.getElementById('mt_treeSelect_Arrow').style.transform = 'rotate(180deg)';
}

const mt_treeSelect_delectMask = () =>{
    mt_treeSelect_colorLock.value = false
    mt_treeSelect_colorLow()
    document.getElementById('mt_treeSelect_Arrow').style.transform = 'rotate(0deg)'
}

const mt_treeSelect_colorHigh = () =>{
    document.getElementById('mt_treeSelect_ColorExcMain').style.borderColor = 'blue'
    document.getElementById('mt_treeSelect_ColorExcArrow').style.borderColor = 'blue'
}

const mt_treeSelect_colorLow = () =>{
    if(!mt_treeSelect_colorLock.value){
        document.getElementById('mt_treeSelect_ColorExcMain').style.borderColor = 'skyblue'
        document.getElementById('mt_treeSelect_ColorExcArrow').style.borderColor = 'skyblue'
    }
}

const mt_treeSelect_findData = (item) =>{
    for(let i = 0; i < mt_treeSelect_ISselect.value.length; i++) {
        for(let t = 0; t < mt_treeSelect_ISselect.value[i].length; t++) {
            if (mt_treeSelect_ISselect.value[i][t] === item.label) {
                return true
            }
        }
    }
    return false
}

const mt_treeSelect_examineData = (item, boardNum) => {
    mt_treeSelect_ISselectTemp.value[boardNum] = item.label
    mt_treeSelect_ISselectTemp.value.length = boardNum + 1
    if(item.children){
        mt_treeSelect_delectBoard(boardNum + 1)
        mt_treeSelect_createBoardItem(item.children, boardNum + 1)
    } else {
        if(mt_treeSelect_ISselect.value.length != 0) {
            let flag = true
            for(let i = 0; i< mt_treeSelect_ISselect.value.length; i++) {
                if(mt_treeSelect_ISselectTemp.value.toString() === mt_treeSelect_ISselect.value[i].toString()) {
                    mt_treeSelect_ISselect.value.splice(i, 1)
                    mt_treeSelect_showData.value.splice(i, 1)
                    mt_treeSelect_backData.value.splice(i, 1)
                    flag = false
                    break
                }
            } if(flag) {
                mt_treeSelect_ISselect.value.push(mt_treeSelect_ISselectTemp.value.slice())
                mt_treeSelect_showData.value.push(item.label)
                mt_treeSelect_backData.value.push(item.value)
            }
        } else {
            mt_treeSelect_ISselect.value.push(mt_treeSelect_ISselectTemp.value.slice())
            mt_treeSelect_showData.value.push(item.label)
            mt_treeSelect_backData.value.push(item.value)
        }
        let dataLable = mt_treeSelect_showData.value.join(' / ')
        if(dataLable !== "") {
            mt_treeSelect_Node.value = dataLable
        } else {
            mt_treeSelect_Node.value = mt_treeSelect_data.defaultNode
        }
        if(mt_treeSelect_Node.value.length > 15) {
            mt_treeSelect_Node.value = mt_treeSelect_Node.value.slice(0,15) + '...'
        }
        mt_treeSelect_delect()
    }
}

const mt_treeSelect_createBoardSingle = (item, boardNum) =>{
    const boardID = "mt_treeSelect_cascaderBoard" + boardNum
    const mt_treeSelect_div = document.createElement('div');
    mt_treeSelect_div.id = item.value
    mt_treeSelect_div.style.zIndex = '11'
    mt_treeSelect_div.style.width = mt_treeSelect_data.width - 15 + 'px';
    mt_treeSelect_div.style.height = mt_treeSelect_data.height + 'px';
    mt_treeSelect_div.style.lineHeight = mt_treeSelect_data.height + 'px';
    mt_treeSelect_div.style.fontSize = mt_treeSelect_data.height * 0.3 + 'px'
    mt_treeSelect_div.style.fontWeight = 'bold'
    mt_treeSelect_div.innerHTML = item.label
    if(mt_treeSelect_findData(item)) {
        mt_treeSelect_div.style.color = "blue"
    }
    mt_treeSelect_div.style.position = "relative";
    mt_treeSelect_div.style.left= "5px";
    document.getElementById(boardID).appendChild(mt_treeSelect_div)
    if(item.children){
        const mt_treeSelect_arrowSmall = document.createElement('div');
        mt_treeSelect_arrowSmall.style.position = "absolute"
        mt_treeSelect_arrowSmall.style.width = mt_treeSelect_data.height * 0.2 +'px'
        mt_treeSelect_arrowSmall.style.height = mt_treeSelect_data.height * 0.2 +'px'
        mt_treeSelect_arrowSmall.style.top = "37.5%"
        mt_treeSelect_arrowSmall.style.right = "5%"
        mt_treeSelect_arrowSmall.style.display = 'inline-block'
        mt_treeSelect_arrowSmall.style.transform = "rotate(45deg)"
        mt_treeSelect_arrowSmall.style.borderStyle = "solid"
        mt_treeSelect_arrowSmall.style.borderBottom = '3px'
        mt_treeSelect_arrowSmall.style.borderLeft = '3px'
        if(item.label == mt_treeSelect_ISselect.value[boardNum]) {
            mt_treeSelect_arrowSmall.style.borderColor = 'blue'
        } else {
            mt_treeSelect_arrowSmall.style.borderColor = 'grey'
        }
        mt_treeSelect_div.append(mt_treeSelect_arrowSmall)
    }
    mt_treeSelect_div.onclick = function(){mt_treeSelect_examineData(item, boardNum)}
}

const mt_treeSelect_createBoardItem = (cascaderData, boardNum) =>{
    let newBoardID = "mt_treeSelect_cascaderBoard" + boardNum
    mt_treeSelect_createBoard("mt_treeSelect_ColorExcMain", newBoardID, boardNum)
    for(let item in cascaderData){
        mt_treeSelect_createBoardSingle(cascaderData[item], boardNum)
    }
}

const mt_treeSelect_createBoard = (oldBoardID, newBoardID, boardNum) =>{
    if(document.getElementById(newBoardID)) return
    const Selected = document.getElementById(oldBoardID)
    const cascaderBoard = document.createElement('div')
    cascaderBoard.id = newBoardID
    cascaderBoard.style.zIndex = '10'
    cascaderBoard.style.position = "absolute"
    cascaderBoard.style.width = mt_treeSelect_data.width - (boardNum * (mt_treeSelect_data.width * 0.2))  +'px' 
    cascaderBoard.style.margin = "2px 0 0 0"
    cascaderBoard.style.height = mt_treeSelect_data.height * mt_treeSelect_data.display+'px';
    cascaderBoard.style.borderRadius = "10px";
    cascaderBoard.style.border = "2px solid blue";
    cascaderBoard.style.backgroundColor = "white";
    cascaderBoard.style.left = boardNum * (mt_treeSelect_data.width * 0.2) +'px'
    cascaderBoard.style.overflow = "scroll"
    cascaderBoard.style.overflowX = "hidden"
    cascaderBoard.style.scrollbarWidth = "none"
    Selected.after(cascaderBoard)
    cascaderBoard.onclick = function(){
        mt_treeSelect_flag.value = false
    }
}

const mt_treeSelect_delectBoard = (mt_treeSelect_boardNum) =>{
    let item = mt_treeSelect_boardNum
    while(document.getElementById("mt_treeSelect_cascaderBoard" + item)){
        document.getElementById("mt_treeSelect_cascaderBoard" + item).remove()
        item ++;
    }
}

const vClickOutside = {
    mounted(mt, binding) {
        function eventHandler(e) {
            if (mt.contains(e.target)) {
                return false
            }
            // 如果绑定的参数是函数，正常情况也应该是函数，执行
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e)
            }
        }
        // 用于销毁前注销事件监听
        mt.__click_outside__ = eventHandler
        // 添加事件监听
        document.addEventListener('click', eventHandler)
    },
    beforeUnmount(mt) {
        // 移除事件监听
        document.removeEventListener('click', mt.__click_outside__)
        // 删除无用属性
        delete mt.__click_outside__
    }
}

</script>

<template>
    <div :style="{width: width+'px',height: height+'px'}">
        <div id="mt_treeSelect_ColorExcMain" class="mt_treeSelect_Cascader" @click="mt_treeSelect_create" 
        @mouseover="mt_treeSelect_colorHigh" @mouseleave="mt_treeSelect_colorLow" v-click-outside="mt_treeSelect_delect">
            <div id="mt_treeSelect_Selected" class="mt_treeSelect_Selected" 
                :style="{
                    height: height*0.6+'px', lineHeight: height*0.6+'px'
                }">{{mt_treeSelect_Node}}
            </div>
            <div id="mt_treeSelect_Arrow" class="mt_treeSelect_RotateArrow" 
                :style="{
                        height: mt_treeSelect_data['height'] * 0.3+'px', 
                        width: mt_treeSelect_data['height'] * 0.3+'px'
                    }">
                <div id="mt_treeSelect_ColorExcArrow" class="mt_treeSelect_Arrow" 
                    :style="{
                        height: mt_treeSelect_data['height'] * 0.3+'px', 
                        width: mt_treeSelect_data['height'] * 0.3+'px' ,
                        top: '20%'
                    }" />
            </div>
        </div>
    </div>
</template>

<style scoped>

.mt_treeSelect_Cascader {
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

.mt_treeSelect_Masklayer{
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

.mt_treeSelect_RotateArrow{
    transition-duration:0.2s;
    position:absolute;
    right: 5%;
    top: 35%;

    /* background-color: skyblue;  */
}

.mt_treeSelect_Arrow {
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

.mt_treeSelect_Selected{
    position:absolute;
    left: 5%;
    right: 15%;
    top: 20%;
    bottom: 20%;
    font-weight: bold;
}

</style>