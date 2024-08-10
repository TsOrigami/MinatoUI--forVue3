<script setup>

//2024.8.10 基本完成 透明的换另一种写法。


import { defineModel, defineProps, ref, onMounted } from 'vue'

const mt_colorPicker_slt_color = defineModel({
    type: String,
    default: '#ffffff'
})

onMounted(()=>{
    colorBox('red')
    colorBar()
    // colorTrans()
})

const flag = ref(false)
const color = ref('#ffffff')
const stopHidden = ref(false)

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

const excColorPicker = () =>{
    let element = document.getElementById('colorPicker')
    if(flag.value) element.style.visibility = 'hidden'
    else element.style.visibility = 'visible'
    flag.value = !flag.value
}

const offColorPicker = () =>{
    if( stopHidden.value ) {
        stopHidden.value = false
        return
    }
    flag.value = false
    let element = document.getElementById('colorPicker')
    element.style.visibility = 'hidden'
}

const colorBox = (color) => {
    // 底色填充，也就是（举例红色）到白色
    const canvas = document.getElementById("canvasBox")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;
    const width = 200

    canvas.style.position = 'absolute'
    canvas.style.left = - 30  + 1 + 20 +'px'
    canvas.style.top = 20 +'px'

    canvas.width = '230'
    canvas.height = '200'

    // 底色填充，也就是（举例红色）到白色
    let gradientBase = ctx.createLinearGradient(30, 0, width+30, 0);
    gradientBase.addColorStop(1, color);
    gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradientBase;
    ctx.fillRect(30, 0, width, width);
    //第二次填充，黑色到透明
    let my_gradient1 = ctx.createLinearGradient(0, 0, 0, width);
    my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
    my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = my_gradient1;
    ctx.fillRect(30, 0, width, width);
}

const colorBar = () =>{
    const canvas = document.getElementById("canvasBar")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;
    const height = 200
    
    canvas.style.position = 'absolute'
    canvas.style.left = 240 +'px'
    canvas.style.top = '20px'
    canvas.style.border = '1px solid black'

    canvas.width = '20'
    canvas.height = '200'

    let gradientBar = ctx.createLinearGradient(0, 0, 0, height);
    gradientBar.addColorStop(0, '#f00');
    gradientBar.addColorStop(1 / 6, '#f0f');
    gradientBar.addColorStop(2 / 6, '#00f');
    gradientBar.addColorStop(3 / 6, '#0ff');
    gradientBar.addColorStop(4 / 6, '#0f0');
    gradientBar.addColorStop(5 / 6, '#ff0');
    gradientBar.addColorStop(1, '#f00');

    ctx.fillStyle = gradientBar;
    ctx.fillRect(0, 0, 20, height);
}

// const colorTrans = () =>{
//     const canvas = document.getElementById("canvasTrans")
//     const ctx = canvas.getContext('2d')
//     ctx.canvas.willReadFrequently = true;
//     const width = 200

//     canvas.style.top = 200 + 40 +'px'
//     canvas.style.position = 'absolute'
//     canvas.style.left = '20px'
//     canvas.style.border = '1px solid black'

//     canvas.width = '200'
//     canvas.height = '20'

//     let gradientBar = ctx.createLinearGradient(0, 0, width, 0);
//     gradientBar.addColorStop(0, 'rgba(0,0,0,0)');
//     gradientBar.addColorStop(1, 'rgba(0,0,0,1)');

//     ctx.fillStyle = gradientBar;
//     ctx.fillRect(0, 0, width, 20);
// }

const moveGetBar = (event) =>{
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    if(pos.x <= 0 || pos.x >= 20 || pos.y <= 0 ||pos.y >= 200) return
    const canvas = document.getElementById("canvasBar")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;

    const arrow = document.getElementById('sltBar')
    sltBar.style.top = pos.y + 20 - 2 +'px'

    let imgData = ctx.getImageData(0, 0, 20, height);
    let data = imgData.data;

    let dataIndex = (pos.y * imgData.width + pos.x) * 4;
    
    let real_data = [
                    data[dataIndex],
                    data[dataIndex + 1],
                    data[dataIndex + 2],
                    (data[dataIndex + 3] / 255).toFixed(2)
                ]
    let exc_color_1 = real_data[0].toString(16)
    if(exc_color_1.length == 1) exc_color_1 = '0' + exc_color_1
    let exc_color_2 = real_data[1].toString(16)
    if(exc_color_2.length == 1) exc_color_2 = '0' + exc_color_2
    let exc_color_3 = real_data[2].toString(16)
    if(exc_color_3.length == 1) exc_color_3 = '0' + exc_color_3

    let exc_color = "#" + exc_color_1 + exc_color_2 + exc_color_3
    colorBox(exc_color)

    let sltBox_arrow = document.getElementById('sltBox')
    getExcRgbaAtBox(sltBox_arrow.offsetLeft, sltBox_arrow.offsetTop)
}

const getRgbaAtBar = (event) => {
    moveGetBar(event)
    let element = document.getElementById('hoverBar')
    element.ondragstart = function() {
        return false;
    };
    element.addEventListener('mousemove', moveGetBar)
}

const removeGetRgbaAtBar = () => {
    let element = document.getElementById('hoverBar')
    element.removeEventListener('mousemove', moveGetBar)
}

const moveGetColor = (event) =>{
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    if(pos.x <= 0 || pos.x >= 200 || pos.y <= 0 || pos.y >= 200) return

    const arrow = document.getElementById('sltBox')
    arrow.style.left = pos.x + 20 - 4 +'px'
    arrow.style.top = pos.y + 20 - 4 +'px'

    const canvas = document.getElementById("canvasBox")
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(30, 0, height, height);
    let data = imgData.data;

    let dataIndex = (pos.x + pos.y * height) * 4;

    let real_data = [
                    data[dataIndex],
                    data[dataIndex + 1],
                    data[dataIndex + 2],
                    (data[dataIndex + 3] / 255).toFixed(2)
                ]
    let exc_color_1 = real_data[0].toString(16)
    if(exc_color_1.length == 1) exc_color_1 = '0' + exc_color_1
    let exc_color_2 = real_data[1].toString(16)
    if(exc_color_2.length == 1) exc_color_2 = '0' + exc_color_2
    let exc_color_3 = real_data[2].toString(16)
    if(exc_color_3.length == 1) exc_color_3 = '0' + exc_color_3

    let exc_color = "#" + exc_color_1 + exc_color_2 + exc_color_3


    let oldColor = '0x' + exc_color.replace(/#/g, '');
    let newColor = '000000' + (0xFFFFFF - oldColor).toString(16);
    arrow.style.borderColor =  '#'+ newColor.substring(newColor.length - 6, newColor.length);

    // document.getElementById('sltColor').style.backgroundColor = exc_color
    document.getElementById('colorShow').style.backgroundColor = exc_color
    color.value = exc_color
    mt_colorPicker_slt_color.value = exc_color
}

const getRgbaAtBox = (event) => {
    moveGetColor(event)
    let element = document.getElementById('hoverBox')
    element.ondragstart = function() {
        return false;
    };
    element.addEventListener('mousemove', moveGetColor)
}

const removeGetRgbaAtBox = () =>{
    let element = document.getElementById('hoverBox')
    element.removeEventListener('mousemove', moveGetColor)
}

const getExcRgbaAtBox = (x, y) => {
    let height = 200
    let pos = {
        'x': x - 20 + 4,
        'y': y - 20 + 4
    }

    const canvas = document.getElementById("canvasBox")
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(30, 0, height, height);
    let data = imgData.data;

    let dataIndex = (pos.x + pos.y * height) * 4;
    
    let real_data = [
                    data[dataIndex],
                    data[dataIndex + 1],
                    data[dataIndex + 2],
                    (data[dataIndex + 3] / 255).toFixed(2)
                ]
    let exc_color_1 = real_data[0].toString(16)
    if(exc_color_1.length == 1) exc_color_1 = '0' + exc_color_1
    let exc_color_2 = real_data[1].toString(16)
    if(exc_color_2.length == 1) exc_color_2 = '0' + exc_color_2
    let exc_color_3 = real_data[2].toString(16)
    if(exc_color_3.length == 1) exc_color_3 = '0' + exc_color_3

    let exc_color = "#" + exc_color_1 + exc_color_2 + exc_color_3


    const arrow = document.getElementById('sltBox')
    let oldColor = '0x' + exc_color.replace(/#/g, '');
    let newColor = '000000' + (0xFFFFFF - oldColor).toString(16);
    arrow.style.borderColor =  '#'+ newColor.substring(newColor.length - 6, newColor.length);

    // document.getElementById('sltColor').style.backgroundColor = exc_color
    document.getElementById('colorShow').style.backgroundColor = exc_color
    color.value = exc_color
}

</script>

<template>
    <div>
        <div class="colorPickerButton" @click="excColorPicker" v-click-outside="offColorPicker">
            <div class="buttonAlt">选择颜色 :</div>
            <div class="butttonColor">{{ color }}</div>
            <div id="colorShow" class="buttonShow"></div>
        </div>
        <div id="colorPicker" class="mainboard" @click="stopHidden = true">
            <div id="casvasBoxBoder" class="casvasBoxBoder"></div>
            <canvas id="canvasBox"></canvas>
            <div id="sltBox" class="sltBox"></div>
            <div id="hoverBox" class="hoverBox"  
                @mousedown="getRgbaAtBox" @mouseup="removeGetRgbaAtBox" @mouseleave="removeGetRgbaAtBox"></div>
            <canvas id="canvasBar"></canvas>
            <div id="sltBar" class="sltBar"></div>
            <div id="hoverBar" class="hoverBar"
                @mousedown="getRgbaAtBar" @mouseup="removeGetRgbaAtBar" @mouseleave="removeGetRgbaAtBar"></div>
            <!-- <canvas id="canvasTrans"></canvas>
            <div id="sltColor" class="sltColor"> </div> -->
        </div>
    </div>
</template>

<style scoped>

.colorPickerButton{
    position: relative;
    width: 200px;
    height: 30px;
    border: 2px solid blue;
    border-radius: 7.5px;
}

.buttonAlt{
    position: absolute;
    left: 7.5px;
    width: 80px;
    height: 20px;
    top: 3px;
    line-height: 20px;
}

.butttonColor{
    position: absolute;
    left: 77.5px;
    width: 50px;
    height: 20px;
    top: 3px;
    line-height: 20px;
    font-weight: bold;
}

.buttonShow{
    position: absolute;
    top: 3px;
    left: 142.5px;
    background-color: white;
    border: 2px solid black;
    height: 20px;
    width: 20px;
}

.mainboard{
    position: relative;
    top: 2px;
    width: 290px ;
    height: 250px;
    /* height: 300px; */
    border: 2px solid blue;
    border-radius: 20px;
    visibility: hidden;
}

.sltBox{
    width: 9px;
    height: 9px;
    border: 2px solid black;
    position: absolute;
    left: 21px;
    top: 20px;
}

.hoverBox{
    width: 201px;
    height: 202px;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 20px;
    top: 19px;
}

.casvasBoxBoder{
    width: 201px;
    height: 201px;
    border: 1px solid black;
    position: absolute;
    left: 20.5px;
    top: 19.5px;
}

.sltColor{
    width: 22px;
    height: 22px;
    position: absolute;
    left: 240px;
    top: 240px;
    border: 1px solid black;
    background-color: white;
}

.sltBar{
    width: 23.5px;
    height: 5px;
    position: absolute;
    left: 239px;
    top: 20px;
    border: 1.5px solid black;
}

.hoverBar{
    background-color: rgba(0, 0, 0, 0);
    width: 23.5px;
    height: 202px;
    position: absolute;
    left: 239px;
    top: 20px;
}

</style>