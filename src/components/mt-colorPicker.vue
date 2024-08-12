<script setup>

//1.组件名称：mt-colorPicker
//2.组件功能：颜色选择器
//3.组件参数：
//          双向绑定参数: v-model: String, 选中的颜色, 默认为#ffffff

//2024.8.12 在做大小适配


import { defineModel, defineProps, ref, onMounted } from 'vue'

const mt_colorPicker_data = defineProps({
    'width':{
        type:Number,
        default: 200,
    },
    'height':{
        type:Number,
        default: 30
    },
    'boardHeight':{
        type: Number,
        default: 300
    },
    'boardWidth':{
        type: Number,
        default: 300
    },
    'zindex': {
        type: Number,
        default: 10
    }
})

const mt_colorPicker_colorPicker_slt_color = defineModel({
    type: String,
    default: '#ffffff'
})

const mt_colorPicker_board_height = ref('0px')
const mt_colorPicker_board_width = ref('0px')
const mt_colorPicker_main_height = ref('0px')
const mt_colorPicker_main_width = ref('0px')
const mt_colorPicker_mainboard_height = ref('0px')
const mt_colorPicker_mainboard_width = ref('0px')
const mt_colorPicker_mainboard_visible = ref('hidden')
const mt_colorPicker_button_showColor = ref('white')
const mt_colorPicker_flag = ref(false)
const mt_colorPicker_color = ref('#ffffff')
const mt_colorPicker_canvasSize = ref(0)
const mt_colorPicker_sltBox_left = ref('21px')
const mt_colorPicker_sltBox_top = ref('20px')
const mt_colorPicker_sltBox_borderColor = ref('black')
const mt_colorPicker_sltBar_top = ref('20px')
const mt_colorPicker_stopHidden = ref(false)
const mt_colorPicker_showMain = ref(null)

onMounted(()=>{
    mt_colorPicker_main_height.value = mt_colorPicker_data['height'] +'px'
    mt_colorPicker_main_width.value = mt_colorPicker_data['width'] +'px'
    mt_colorPicker_board_height.value = mt_colorPicker_data['height'] +'px'
    mt_colorPicker_board_width.value = mt_colorPicker_data['width'] +'px'
    mt_colorPicker_canvasSize.value = Math.min(mt_colorPicker_data['boardHeight'], mt_colorPicker_data['boardWidth'])
    mt_colorPicker_colorBox('red')
    mt_colorPicker_colorBar()
    // colorTrans()
})

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

const mt_colorPicker_excColorPicker = () =>{
    let mt_colorPicker_button = document.getElementById('mt_colorPicker_colorPickerButton')
    if(mt_colorPicker_flag.value){
        if(mt_colorPicker_showMain.value != null){
            clearTimeout(showMain.value)
            mt_colorPicker_showMain.value = null
        }
        mt_colorPicker_button.style.transitionDuration = '0.5s'
        mt_colorPicker_button.style.top = '0px'
        mt_colorPicker_button.style.left = '0px'
        mt_colorPicker_mainboard_height.value = '0px'
        mt_colorPicker_mainboard_width.value = '0px'
        mt_colorPicker_mainboard_visible.value = 'hidden'
        mt_colorPicker_main_height.value = mt_colorPicker_data['height'] + 'px'
        mt_colorPicker_main_width.value = mt_colorPicker_data['width'] + 'px'
        mt_colorPicker_board_height.value = mt_colorPicker_data['height'] + 'px'
        mt_colorPicker_board_width.value = mt_colorPicker_data['width'] + 'px'
    } else {
        mt_colorPicker_showMain.value = setTimeout(()=>{
            mt_colorPicker_mainboard_visible.value = 'visible'
            mt_colorPicker_showMain.value = null
        },300)
        mt_colorPicker_button.style.transitionDuration = '0.5s'
        mt_colorPicker_button.style.top =  mt_colorPicker_data['boardHeight'] - mt_colorPicker_data['height']  + 'px'
        mt_colorPicker_button.style.left =  mt_colorPicker_data['boardWidth'] - mt_colorPicker_data['width']  + 'px'
        mt_colorPicker_mainboard_height.value = mt_colorPicker_data['boardWidth'] + 'px'
        mt_colorPicker_mainboard_width.value = mt_colorPicker_data['boardHeight'] +'px'
        mt_colorPicker_main_height.value = mt_colorPicker_data['boardHeight'] + 'px'
        mt_colorPicker_main_width.value = mt_colorPicker_data['boardWidth'] + 'px'
        mt_colorPicker_board_height.value = mt_colorPicker_data['boardHeight'] + 'px'
        mt_colorPicker_board_width.value = mt_colorPicker_data['boardWidth'] + 'px'
    }
    mt_colorPicker_flag.value = !mt_colorPicker_flag.value
}

const mt_colorPicker_offColorPicker = () =>{
    if( mt_colorPicker_stopHidden.value ) {
        mt_colorPicker_stopHidden.value = false
        return
    }
    mt_colorPicker_flag.value = false
    let mt_colorPicker_button = document.getElementById('mt_colorPicker_colorPickerButton')
    if(mt_colorPicker_showMain.value != null){
            clearTimeout(showMain.value)
            mt_colorPicker_showMain.value = null
    }
    mt_colorPicker_button.style.transitionDuration = '0.5s'
    mt_colorPicker_button.style.top = '0px'
    mt_colorPicker_button.style.left = '0px'
    mt_colorPicker_mainboard_height.value = '0px'
    mt_colorPicker_mainboard_width.value = '0px'
    mt_colorPicker_mainboard_visible.value = 'hidden'
    mt_colorPicker_main_height.value = mt_colorPicker_data['height'] + 'px'
    mt_colorPicker_main_width.value = mt_colorPicker_data['width'] + 'px'
    mt_colorPicker_board_height.value = mt_colorPicker_data['height'] + 'px'
    mt_colorPicker_board_width.value = mt_colorPicker_data['width'] + 'px'
}

const mt_colorPicker_colorBox = (color) => {
    // 底色填充，也就是（举例红色）到白色
    const canvas = document.getElementById("mt_colorPicker_canvasBox")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;
    const canvasWidth = mt_colorPicker_canvasSize.value
    
    const width = canvasWidth * (2/3)

    canvas.style.position = 'absolute'
    canvas.style.left = - 30  + 1 + canvasWidth * (2/30) +'px'
    canvas.style.top = 20 +'px'

    canvas.width = canvasWidth * (2/3) + canvasWidth / 10
    canvas.height = canvasWidth * (2/3)
    
    // 底色填充，也就是（举例红色）到白色
    let gradientBase = ctx.createLinearGradient(canvasWidth / 10, 0, width+30, 0);
    gradientBase.addColorStop(1, color);
    gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradientBase;
    ctx.fillRect(canvasWidth / 10, 0, width, width);
    //第二次填充，黑色到透明
    let my_gradient1 = ctx.createLinearGradient(0, 0, 0, width);
    my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
    my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = my_gradient1;
    ctx.fillRect(canvasWidth / 10, 0, width, width);
}

const mt_colorPicker_colorBar = () =>{
    const canvas = document.getElementById("mt_colorPicker_canvasBar")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;

    const canvasWidth = mt_colorPicker_canvasSize.value

    const height = canvasWidth * 2/3
    
    canvas.style.position = 'absolute'
    canvas.style.left = canvasWidth * 0.8 +'px'
    canvas.style.top = canvasWidth * (2/30) + 'px'
    canvas.style.border = '1px solid black'

    canvas.width = canvasWidth * (2/30)
    canvas.height = canvasWidth * (2/3)

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

// const mt_colorPicker_colorTrans = () =>{
//     const canvas = document.getElementById("mt_colorPicker_canvasTrans")
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

const mt_colorPicker_moveGetBar = (event) =>{
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    if(pos.x <= 0 || pos.x >= 20 || pos.y <= 0 ||pos.y >= 200) return
    const canvas = document.getElementById("mt_colorPicker_canvasBar")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;

    const arrow = document.getElementById('mt_colorPicker_sltBar')
    arrow.style.top = pos.y + 20 - 2 +'px'

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
    mt_colorPicker_colorBox(exc_color)

    let sltBox_arrow = document.getElementById('mt_colorPicker_sltBox')
    mt_colorPicker_getExcRgbaAtBox(sltBox_arrow.offsetLeft, sltBox_arrow.offsetTop)
}

const mt_colorPicker_getRgbaAtBar = (event) => {
    mt_colorPicker_stopHidden.value = true
    mt_colorPicker_moveGetBar(event)
    let element = document.getElementById('mt_colorPicker_hoverBar')
    element.ondragstart = function() {
        return false;
    };
    element.addEventListener('mousemove', mt_colorPicker_moveGetBar)
}

const mt_colorPicker_removeGetRgbaAtBar = () => {
    let element = document.getElementById('mt_colorPicker_hoverBar')
    element.removeEventListener('mousemove', mt_colorPicker_moveGetBar)
}

const mt_colorPicker_moveGetColor = (event) =>{
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    if(pos.x <= 0 || pos.x >= 200 || pos.y <= 0 || pos.y >= 200) return

    mt_colorPicker_sltBox_left.value = pos.x + 20 - 4 +'px'
    mt_colorPicker_sltBox_top.value = pos.y + 20 - 4 +'px'

    const canvas = document.getElementById("mt_colorPicker_canvasBox")
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
    mt_colorPicker_sltBox_borderColor.value = '#'+ newColor.substring(newColor.length - 6, newColor.length);

    // document.getElementById('mt_colorPicker_sltColor').style.backgroundColor = exc_color
    mt_colorPicker_button_showColor.value = exc_color
    mt_colorPicker_color.value = exc_color
    mt_colorPicker_colorPicker_slt_color.value = exc_color
}

const mt_colorPicker_getRgbaAtBox = (event) => {
    mt_colorPicker_stopHidden.value = true
    mt_colorPicker_moveGetColor(event)
    // let mt_colorPicker_main = document.getElementById('mt_colorPicker_colorPickerMain')
    // mt_colorPicker_main.style.height = mt_colorPicker_data['boardHeight'] +'px'
    // mt_colorPicker_main.style.width = mt_colorPicker_data['boardWidth'] + 'px'

    let element = document.getElementById('mt_colorPicker_hoverBox')
    element.ondragstart = function() {
        return false;
    };
    element.addEventListener('mousemove', mt_colorPicker_moveGetColor)
}

const mt_colorPicker_removeGetRgbaAtBox = () =>{
    let element = document.getElementById('mt_colorPicker_hoverBox')
    element.removeEventListener('mousemove', mt_colorPicker_moveGetColor)
}

const mt_colorPicker_getExcRgbaAtBox = (x, y) => {
    let height = 200
    let pos = {
        'x': x - 20 + 4,
        'y': y - 20 + 4
    }
    const canvas = document.getElementById("mt_colorPicker_canvasBox")
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


    const arrow = document.getElementById('mt_colorPicker_sltBox')
    let oldColor = '0x' + exc_color.replace(/#/g, '');
    let newColor = '000000' + (0xFFFFFF - oldColor).toString(16);
    arrow.style.borderColor =  '#'+ newColor.substring(newColor.length - 6, newColor.length);

    // document.getElementById('mt_colorPicker_sltColor').style.backgroundColor = exc_color
    document.getElementById('mt_colorPicker_colorShow').style.backgroundColor = exc_color
    mt_colorPicker_color.value = exc_color
}

</script>

<template>
    <div id="mt_colorPicker_colorPickerMain" style="position: relative; left: 0px; top: 0px; transition-duration: 0.5s;"
            :style="{height: mt_colorPicker_main_height, width: mt_colorPicker_main_width}">
        <div id="mt_colorPicker_colorPickerButton" style="position: relative; transition-duration: 0.5s;"
            :style="{height: height +'px', width: width +'px', zIndex: zindex + 2 }"
            @click="mt_colorPicker_excColorPicker" v-click-outside="mt_colorPicker_offColorPicker">
            <div style="position: absolute;"
                :style="{left: height*0.25+'px', width:width*0.4+'px' ,height: height*2/3 +'px' ,
                        lineHeight: height*2/3 +'px', top: height/6 +'px'}">选择颜色 :</div>
            <div style="position: absolute; font-weight: bold;"
                :style="{left: width*0.4+'px', width: width/4 + 'px', height: height*2/3 +'px',
                    lineHeight: height*2/3 +'px', top: height/6 +'px'}">{{ mt_colorPicker_color }}</div>
            <div id="mt_colorPicker_colorShow" style="position: absolute; border: 2px solid black;"
                    :style="{left: width*0.75 +'px', top: height/6 +'px', height: height*2/3 +'px', width: height*2/3 +'px',
                        backgroundColor: mt_colorPicker_button_showColor}"></div>
        </div>
        <div id="mt_colorPicker_colorPicker" class="mt_colorPicker_mainboard" @click="mt_colorPicker_stopHidden = true"
            style="position: relative;"
            :style="{height: mt_colorPicker_mainboard_height, width:mt_colorPicker_mainboard_width, borderRadius: height*0.25+'px',
                    visibility: mt_colorPicker_mainboard_visible, zIndex: zindex + 1, top: -height+'px'}">
            <canvas id="mt_colorPicker_canvasBox"></canvas>
            <div id="mt_colorPicker_sltBox" style="border: 2px solid black; position: absolute; "
                :style="{width: mt_colorPicker_canvasSize / 30 +'px' , height: mt_colorPicker_canvasSize / 30 +'px',
                        left: mt_colorPicker_sltBox_left, top: mt_colorPicker_sltBox_top, 
                        borderColor: mt_colorPicker_sltBox_borderColor }"></div>
            <div id="mt_colorPicker_hoverBox" class="mt_colorPicker_hoverBox"  
                @mousedown="mt_colorPicker_getRgbaAtBox" @mouseup="mt_colorPicker_removeGetRgbaAtBox" @mouseleave="mt_colorPicker_removeGetRgbaAtBox"></div>
            <canvas id="mt_colorPicker_canvasBar"></canvas>
            <div id="mt_colorPicker_sltBar" class="mt_colorPicker_sltBar"></div>
            <div id="mt_colorPicker_hoverBar" class="mt_colorPicker_hoverBar"
                @mousedown="mt_colorPicker_getRgbaAtBar" @mouseup="mt_colorPicker_removeGetRgbaAtBar" @mouseleave="mt_colorPicker_removeGetRgbaAtBar"></div>
            <!-- <canvas id="mt_colorPicker_canvasTrans"></canvas> -->
        </div>
        <div id="mt_colorPicker_cpButtonBorder" style="position: absolute; top: 0px; 
                transition-duration: 0.5s; border: 2px solid blue;"
            :style="{height: mt_colorPicker_board_height, width: mt_colorPicker_board_width, zIndex: zindex, borderRadius: height*0.25+'px' }"></div>
    </div>
</template>

<style scoped>

.mt_colorPicker_hoverBox{
    width: 201px;
    height: 201px;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 20.5px;
    top: 19.5px;
    border: 1px solid black;
}

.mt_colorPicker_sltColor{
    width: 22px;
    height: 22px;
    position: absolute;
    left: 240px;
    top: 240px;
    border: 1px solid black;
    background-color: white;
}

.mt_colorPicker_sltBar{
    width: 23.5px;
    height: 5px;
    position: absolute;
    left: 239px;
    top: 20px;
    border: 1.5px solid black;
}

.mt_colorPicker_hoverBar{
    background-color: rgba(0, 0, 0, 0);
    width: 23.5px;
    height: 202px;
    position: absolute;
    left: 239px;
    top: 20px;
}
</style>