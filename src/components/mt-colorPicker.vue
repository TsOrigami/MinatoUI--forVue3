<script setup>

//1.组件名称：mt-colorPicker
//2.组件功能：颜色选择器
//3.组件参数：
//          宽度: Number, 默认300
//          高度: Number, 默认30
//          色板高度: Number, 默认300
//          色板宽度: Number, 默认300
//          z-index: Number, 默认10
//          RGBA: Boolean, 切换为RGBA模式，支持透明度选择, 默认false
//          双向绑定参数: v-model: String, 选中的颜色, 默认为null



import { defineModel, defineProps, ref, onMounted } from 'vue'

const mt_colorPicker_data = defineProps({
    'width':{
        type:Number,
        default: 300,
    },
    'height':{
        type:Number,
        default: 30
    },
    'boardHeight':{
        type: Number,
        default: 400
    },
    'boardWidth':{
        type: Number,
        default: 400
    },
    'zindex': {
        type: Number,
        default: 10
    },
    'RGBA':{
        type: Boolean,
        default: false
    }
})

const mt_colorPicker_colorPicker_slt_color = defineModel({
    type: String,
    default: null
})

const mt_colorPicker_board_height = ref('0px')
const mt_colorPicker_board_width = ref('0px')
const mt_colorPicker_main_height = ref('0px')
const mt_colorPicker_main_width = ref('0px')
const mt_colorPicker_mainboard_height = ref('0px')
const mt_colorPicker_mainboard_width = ref('0px')
const mt_colorPicker_mainboard_visible = ref('hidden')
const mt_colorPicker_colorPick = ref([255,255,255,1])
const mt_colorPicker_button_showColor = ref('rgba(255,255,255,0)')
const mt_colorPicker_flag = ref(false)
const mt_colorPicker_color = ref(mt_colorPicker_data['RGBA'] ? 'rgba(255,255,255,1)':'#ffffff')
const mt_colorPicker_canvasSize = ref(0)
const mt_colorPicker_sltBox_left = ref('0px')
const mt_colorPicker_sltBox_top = ref('0px')
const mt_colorPicker_sltBox_borderColor = ref('black')
const mt_colorPicker_sltBar_top = ref('0px')
const mt_colorPicker_stopHidden = ref(false)
const mt_colorPicker_sltTrans_left = ref('0px')
const mt_colorPicker_boardWidth = ref('0px')
const mt_colorPicker_borderColor = ref('white')
const mt_colorPicker_showMain = ref(null)

onMounted(()=>{
    mt_colorPicker_main_height.value = mt_colorPicker_data['height'] +'px'
    mt_colorPicker_main_width.value = mt_colorPicker_data['width'] +'px'
    mt_colorPicker_board_height.value = mt_colorPicker_data['height'] +'px'
    mt_colorPicker_board_width.value = mt_colorPicker_data['width'] +'px'
    mt_colorPicker_canvasSize.value = Math.min(mt_colorPicker_data['boardHeight'], mt_colorPicker_data['boardWidth'])
    mt_colorPicker_sltBox_left.value = mt_colorPicker_canvasSize.value * 2/30 - 2 + 'px',
    mt_colorPicker_sltBox_top.value = mt_colorPicker_canvasSize.value * 2/30 - 2 + 'px',
    mt_colorPicker_sltBar_top.value = mt_colorPicker_canvasSize.value * 2/30 + 'px',
    mt_colorPicker_boardWidth.value = mt_colorPicker_canvasSize.value * 2/300 + "px"
    mt_colorPicker_sltTrans_left.value = (mt_colorPicker_canvasSize.value * 2/30 + mt_colorPicker_canvasSize.value * 2/3 
                                            - mt_colorPicker_canvasSize.value / 50 + 1) + 'px',
    mt_colorPicker_colorBox('red')
    mt_colorPicker_colorBar()
    mt_colorPicker_colorTrans()
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
    
    const width = Number((canvasWidth * (2/3)).toFixed(0))

    canvas.style.position = 'absolute'
    canvas.style.left = - canvasWidth / 10  + 1 + canvasWidth * (2/30) +'px'
    canvas.style.top = width / 10 +'px'

    canvas.width = canvasWidth * (2/3) + canvasWidth / 10
    canvas.height = canvasWidth * (2/3)
    
    // 底色填充，也就是（举例红色）到白色
    let gradientBase = ctx.createLinearGradient(canvasWidth / 10, 0, width+canvasWidth / 10, 0);
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

    const height = Number((canvasWidth * 2/3).toFixed(0))
    
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
    ctx.fillRect(0, 0, height*0.1, height);
}

const mt_colorPicker_colorTrans = () =>{
    const canvas = document.getElementById("mt_colorPicker_canvasTrans")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;
    const width = Number((mt_colorPicker_canvasSize.value * 2/3).toFixed(0))
    const canvasWidth = mt_colorPicker_canvasSize.value

    canvas.style.top = canvasWidth * 2/3 + canvasWidth * 4/30 +'px'
    canvas.style.position = 'absolute'
    canvas.style.left = canvasWidth * 2/30 + 'px'
    canvas.style.border = '1px solid black'

    canvas.width = canvasWidth * 2/3
    canvas.height = canvasWidth * 2/30

    let gradientBar = ctx.createLinearGradient(0, 0, width, 0);
    gradientBar.addColorStop(0, 'rgba(0,0,0,0)');
    gradientBar.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = gradientBar;
    ctx.fillRect(0, 0, width, width*0.1);
}

const mt_colorPicker_moveGetBar = (event) =>{
    let height = Number((mt_colorPicker_canvasSize.value * 2/3).toFixed(0))
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    if(pos.x <= 0 || pos.x >= height * 0.1 || pos.y <= 0 ||pos.y >= height - mt_colorPicker_canvasSize.value / 100 ) return
    const canvas = document.getElementById("mt_colorPicker_canvasBar")
    const ctx = canvas.getContext('2d')
    ctx.canvas.willReadFrequently = true;

    mt_colorPicker_sltBar_top.value = pos.y + height / 10 - 2 +'px'

    let imgData = ctx.getImageData(0, 0, height*0.1, height);
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

    mt_colorPicker_getExcRgbaAtBox()
}

const mt_colorPicker_getExcRgbaAtBox = () => {
    let height = Number((mt_colorPicker_canvasSize.value * 2/3).toFixed(0))
    let canvasHeight = mt_colorPicker_canvasSize.value
    let sltWidth = Math.ceil(mt_colorPicker_canvasSize.value / 100)
    let pos = {
        'x': Number((parseInt(mt_colorPicker_sltBox_left.value) - (height / 10) + sltWidth).toFixed(0)),
        'y': Number((parseInt(mt_colorPicker_sltBox_top.value) - (height / 10) + sltWidth).toFixed(0))
    }
    const canvas = document.getElementById("mt_colorPicker_canvasBox")
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(canvasHeight / 10, 0, height, height);
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

    mt_colorPicker_colorPick.value[0] = real_data[0]
    mt_colorPicker_colorPick.value[1] = real_data[1]
    mt_colorPicker_colorPick.value[2] = real_data[2]
    if(mt_colorPicker_data['RGBA']){
        exc_color = `rgba(${mt_colorPicker_colorPick.value[0]},${mt_colorPicker_colorPick.value[1]},${mt_colorPicker_colorPick.value[2]},${mt_colorPicker_colorPick.value[3]})`
    }
    mt_colorPicker_button_showColor.value = exc_color
    mt_colorPicker_color.value = exc_color
    mt_colorPicker_colorPicker_slt_color.value = exc_color
    
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
    let height = Number((mt_colorPicker_canvasSize.value * 2/3).toFixed(0))
    let canvasHeight = mt_colorPicker_canvasSize.value
    let sltWidth = Math.ceil(mt_colorPicker_canvasSize.value / 100)
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }

    if(pos.x <= 0 || pos.x > height || pos.y <= 0 || pos.y >= height) return

    mt_colorPicker_sltBox_left.value = pos.x + height / 10 - sltWidth +'px'
    mt_colorPicker_sltBox_top.value = pos.y + height / 10 - sltWidth +'px'

    const canvas = document.getElementById("mt_colorPicker_canvasBox")
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(canvasHeight * 0.1, 0, height, height);
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

    mt_colorPicker_colorPick.value[0] = real_data[0]
    mt_colorPicker_colorPick.value[1] = real_data[1]
    mt_colorPicker_colorPick.value[2] = real_data[2]

    if(mt_colorPicker_data['RGBA']){
        exc_color = `rgba(${mt_colorPicker_colorPick.value[0]},${mt_colorPicker_colorPick.value[1]},${mt_colorPicker_colorPick.value[2]},${mt_colorPicker_colorPick.value[3]})`
    }
    
    mt_colorPicker_button_showColor.value = exc_color
    mt_colorPicker_color.value = exc_color
    mt_colorPicker_colorPicker_slt_color.value = exc_color
}

const mt_colorPicker_getRgbaAtBox = (event) => {
    mt_colorPicker_stopHidden.value = true
    mt_colorPicker_moveGetColor(event)
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

const mt_colorPicker_getRgbaAtTrans = (event) =>{
    mt_colorPicker_stopHidden.value = true
    mt_colorPicker_moveGetTrans(event)
    let element = document.getElementById('mt_colorPicker_hoverTrans')
    element.ondragstart = function() {
        return false;
    };
    element.addEventListener('mousemove', mt_colorPicker_moveGetTrans)
}

const mt_colorPicker_moveGetTrans = (event) => {
    let width = Number((mt_colorPicker_canvasSize.value * 2/3).toFixed(0))
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    let sltWidth = Math.ceil(mt_colorPicker_canvasSize.value / 100)
    const mt_colorPicker_Trans_color = 255* (pos.x / width)
    mt_colorPicker_sltTrans_left.value = pos.x + width/10 - sltWidth +'px'
    mt_colorPicker_borderColor.value = 'rgba(' + mt_colorPicker_Trans_color +',' + mt_colorPicker_Trans_color +','
                                        + mt_colorPicker_Trans_color +',1)'

    mt_colorPicker_colorPick.value[3] = Number((pos.x/width).toFixed(2))
    
    const exc_color = `rgba(${mt_colorPicker_colorPick.value[0]},${mt_colorPicker_colorPick.value[1]},${mt_colorPicker_colorPick.value[2]},${mt_colorPicker_colorPick.value[3]})`
    
    mt_colorPicker_button_showColor.value = exc_color
    mt_colorPicker_color.value = exc_color
    mt_colorPicker_colorPicker_slt_color.value = exc_color

}

const mt_colorPicker_removeGetRgbaAtTrans = () =>{
    let element = document.getElementById('mt_colorPicker_hoverTrans')
    element.removeEventListener('mousemove', mt_colorPicker_moveGetTrans)
}

</script>

<template>
    <div style="position: relative;" :style="{ height:height +'px',width:width+'px' }"></div>
    <div id="mt_colorPicker_colorPickerMain" 
            style="position: absolute; left: 0px; top: 0px; transition-duration: 0.5s; background-color: white;"
            :style="{
                height: mt_colorPicker_main_height, 
                width: mt_colorPicker_main_width
                }">
        <div id="mt_colorPicker_colorPickerButton" style="position: relative; transition-duration: 0.5s;"
            :style="{
                height: height +'px', width: width +'px', zIndex: zindex + 2 
                }"
            @click="mt_colorPicker_excColorPicker" v-click-outside="mt_colorPicker_offColorPicker">
            <div style="position: absolute; width: 70px;user-select: none;"
                :style="{
                    left: height*0.25+'px',height: height*2/3 +'px' ,
                    lineHeight: height*2/3 +'px', top: height/6 +'px',
                    fontSize: height/2 +'px'
                    }">选择颜色 :</div>
            <div style="position: absolute; font-weight: bold;"
                :style="{
                    left: height / 2 * 5 + 2  +'px',
                    width: width * 0.6 + 'px', 
                    height: height*2/3 +'px',
                    fontSize: height/2 +'px',
                    lineHeight: height*2/3 +'px', top: height/6 +'px'
                    }" >{{ mt_colorPicker_color }}</div>
            <div id="mt_colorPicker_colorBack" class="mt_colorPicker_colorBack"
                    :style="{
                        left: width*0.9 +'px', top: height/6 +'px', height: height*2/3 +'px', width: height*2/3 +'px',
                        backgroundPosition: `0 0, 0 ${height/8}px, ${height/8}px -${height/8}px, -${height/8}px 0`,
                        backgroundSize: `${height/4}px ${height/4}px`
                        }"></div>
            <div id="mt_colorPicker_colorShow" style="position: absolute; border: 2px solid black;"
                    :style="{
                        borderWidth: mt_colorPicker_boardWidth,
                        left: width*0.9 +'px', top: height/6 +'px', height: height*2/3 +'px', width: height*2/3 +'px',
                        backgroundColor: mt_colorPicker_button_showColor
                        }"></div>
        </div>
        <div id="mt_colorPicker_colorPicker" class="mt_colorPicker_mainboard" @click="mt_colorPicker_stopHidden = true"
            style="position: relative;"
            :style="{
                height: mt_colorPicker_mainboard_height, width:mt_colorPicker_mainboard_width, borderRadius: height*0.25+'px',
                visibility: mt_colorPicker_mainboard_visible, zIndex: zindex + 1, top: -height+'px'
                }">
            <canvas id="mt_colorPicker_canvasBox"></canvas>
            <div id="mt_colorPicker_sltBox" style="border: 2px solid black; position: absolute; "
                :style="{
                    borderWidth: mt_colorPicker_boardWidth,
                    width: mt_colorPicker_canvasSize / 30 +'px' , 
                    height: mt_colorPicker_canvasSize / 30 +'px',
                    left: mt_colorPicker_sltBox_left, top: mt_colorPicker_sltBox_top, 
                    borderColor: mt_colorPicker_sltBox_borderColor 
                    }"></div>
            <div id="mt_colorPicker_hoverBox" 
                style="border: 1px solid black; background-color: rgba(0, 0, 0, 0); position: absolute;"
                :style="{
                    width: mt_colorPicker_canvasSize*2/3 + 1 +'px',
                    height: mt_colorPicker_canvasSize*2/3 + 1 +'px',
                    left: mt_colorPicker_canvasSize*2/30 + 0.5 +'px',
                    top: mt_colorPicker_canvasSize*2/30 - 0.5 +'px'
                }"
                @mousedown="mt_colorPicker_getRgbaAtBox" 
                @mouseup="mt_colorPicker_removeGetRgbaAtBox" 
                @mouseleave="mt_colorPicker_removeGetRgbaAtBox"></div>
            <canvas id="mt_colorPicker_canvasBar"></canvas>
            <div id="mt_colorPicker_sltBar" style="position: absolute; border: 1.5px solid black;"
                :style="{
                    height: mt_colorPicker_canvasSize / 50 +'px',
                    borderWidth: mt_colorPicker_boardWidth,
                    top: mt_colorPicker_sltBar_top,
                    width: mt_colorPicker_canvasSize * 2/30 + 4 +'px',
                    left: mt_colorPicker_canvasSize * 2/3 + mt_colorPicker_canvasSize * 4/30 -1 +'px',
                }"></div>
            <div id="mt_colorPicker_hoverBar"
                style="background-color: rgba(0, 0, 0, 0); position: absolute;"
                :style="{
                    top: mt_colorPicker_canvasSize*2/30 +'px',
                    left: mt_colorPicker_canvasSize *0.8 - 1 +'px',
                    width: mt_colorPicker_canvasSize * 0.08 +'px',
                    height: mt_colorPicker_canvasSize * 2/3 + 2 +'px'
                }"
                @mousedown="mt_colorPicker_getRgbaAtBar" 
                @mouseup="mt_colorPicker_removeGetRgbaAtBar" 
                @mouseleave="mt_colorPicker_removeGetRgbaAtBar"></div>
            <div id="mt_colorPicker_canvasTrans_back" class="mt_colorPicker_colorBack"
            :style="{
                top : mt_colorPicker_canvasSize * 2/3 + mt_colorPicker_canvasSize * 4/30 + 1+'px',
                left: mt_colorPicker_canvasSize * 2/30 + 1 +'px',
                width: mt_colorPicker_canvasSize * 2/3 +'px',
                height: mt_colorPicker_canvasSize * 2/30 +'px',
                backgroundPosition: `0 0, 0 ${height/8}px, ${height/8}px -${height/8}px, -${height/8}px 0`,
                backgroundSize: `${height/4}px ${height/4}px`,
                visibility: RGBA ? '' : 'hidden'
            }"></div>
            <canvas id="mt_colorPicker_canvasTrans" :style="{visibility: RGBA ? '' : 'hidden'}"></canvas>
            <div id="mt_colorPicker_sltTrans" style="position: absolute; border: 2px solid black;"
                :style="{
                    borderWidth: mt_colorPicker_boardWidth,
                    top : mt_colorPicker_canvasSize * 2/3 + mt_colorPicker_canvasSize * 4/30 -1 +'px',
                    height: mt_colorPicker_canvasSize * 2/30 + 4 +'px',
                    width: mt_colorPicker_canvasSize / 50 +'px',
                    left: mt_colorPicker_sltTrans_left,
                    borderColor: mt_colorPicker_borderColor,
                    visibility: RGBA ? '' : 'hidden'
                }"></div>
            <div id="mt_colorPicker_hoverTrans" style="position: absolute; background-color: rgba(0, 0, 0, 0);"
                :style="{
                    top : mt_colorPicker_canvasSize * 2/3 + mt_colorPicker_canvasSize * 4/30 + 1 +'px',
                    left: mt_colorPicker_canvasSize * 2/30 + 1 +'px',
                    width: mt_colorPicker_canvasSize * 2/3 +'px',
                    height: mt_colorPicker_canvasSize * 2/30 +'px',
                    visibility: RGBA ? '' : 'hidden'
                }"
                @mousedown="mt_colorPicker_getRgbaAtTrans" 
                @mouseup="mt_colorPicker_removeGetRgbaAtTrans" 
                @mouseleave="mt_colorPicker_removeGetRgbaAtTrans"></div>
        </div>
        <div id="mt_colorPicker_cpButtonBorder" style="position: absolute; top: 0px; 
                transition-duration: 0.5s; border: 2px solid blue;"
            :style="{height: mt_colorPicker_board_height, width: mt_colorPicker_board_width, zIndex: zindex, borderRadius: height*0.25+'px' }"></div>
    </div>
</template>

<style scoped>

.mt_colorPicker_colorBack{
    position: absolute; 
    background-image: linear-gradient(45deg, #8d8b8b 25%, transparent 0),
                      linear-gradient(-45deg, #8d8b8b 25%, transparent 0),
                      linear-gradient(45deg, transparent 75%, #8d8b8b 0),
                      linear-gradient(-45deg, transparent 75%, #8d8b8b 0);
}

</style>