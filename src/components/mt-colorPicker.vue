<script setup>

//2024.8.8 没写完 颜色选择器

import { defineModel, defineProps, ref, onMounted } from 'vue'

const color = ref('blue')

const colorBox = (color) => {
    // 底色填充，也就是（举例红色）到白色
    const canvas = document.getElementById("canvasBox")
    const ctx = canvas.getContext('2d')
    const width = 200
    canvas.style.left = - 30  + 1 +'px'
    canvas.style.position = 'absolute'
    canvas.width = '260'
    canvas.height = '200'
    // 底色填充，也就是（举例红色）到白色
    let gradientBase = ctx.createLinearGradient(30, 0, width+30, 0);
    gradientBase.addColorStop(1, color);
    gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradientBase;
    ctx.fillRect(30, 0, width, width);
    // 第二次填充，黑色到透明
    let my_gradient1 = ctx.createLinearGradient(0, 0, 0, width);
    my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
    my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = my_gradient1;
    ctx.fillRect(30, 0, width, width);
}

const colorBar = () =>{
    const canvas = document.getElementById("canvasBar")
    const ctx = canvas.getContext('2d')
    const height = 200

    canvas.style.left = 200 + 20 +'px'
    canvas.style.position = 'absolute'
    canvas.style.top = '1px'
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

const colorTrans = () =>{
    const canvas = document.getElementById("canvasTrans")
    const ctx = canvas.getContext('2d')
    const width = 200

    canvas.style.top = 200 + 20 +'px'
    canvas.style.position = 'absolute'
    canvas.style.left = '1px'
    canvas.width = '200'
    canvas.height = '20'

    let gradientBar = ctx.createLinearGradient(0, 0, width, 0);
    gradientBar.addColorStop(0, 'rgba(0,0,0,0)');
    gradientBar.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = gradientBar;
    ctx.fillRect(0, 0, width, 20);
}


const getRgbaAtBar = (event) => {
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    const canvas = document.getElementById("canvasBar")
    const ctx = canvas.getContext('2d')
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
}

const getRgbaAtBox = (event) => {
    let height = 200
    let pos = {
        'x': event.offsetX,
        'y': event.offsetY
    }
    const canvas = document.getElementById("canvasBox")
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(0, 0, height, height);
    let data = imgData.data;

    let dataIndex = (pos.y + pos.x) * 4;
    
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
    console.log(exc_color)

    document.getElementById('colorPicker').style.backgroundColor = exc_color
}



</script>

<template>
    <div>
        <div id="colorPicker" class="mainboard">
            <canvas id="canvasBox" @click="getRgbaAtBox"></canvas>
            <canvas id="canvasBar" @click="getRgbaAtBar"></canvas>
            <canvas id="canvasTrans"></canvas>
        </div>
        
        <button @click="colorBox(color)">drawbox</button>
        <button @click="colorBar()">drawbar</button>
        <button @click="colorTrans()">drawtrans</button>
    </div>
</template>

<style scoped>

.mainboard{
    width: 300px;
    height: 300px;
    border: 2px solid black;
}

</style>