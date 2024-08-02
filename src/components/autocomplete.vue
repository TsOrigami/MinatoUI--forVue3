<script setup>

//2024.2.8 没写完 message的更新会慢一步

import {ref, defineProps, defineModel, onMounted, watch} from 'vue'


const mt_data = defineProps({
    options: {
        type: Array,
        default: []
    },
    height: {
        type: Number,
        default: 40,
    },
    width: {
        type: Number,
        default: 200,
    },
    display: {
        type: Number,
        default: 5,
    }
})

const message = defineModel({
    type: String ,
    default: '',
})



const updateMessage = (event) => {
    message.value = event.target.value;
    message.value = message.value
    mt_createCompleteItem(message.value)
};

const mt_createAutoComplete = () =>{
    mt_autoCompleteShow()
    if(document.getElementById('mt_autoCompleteBoard')) {
        document.getElementById('mt_autoCompleteBoard').remove()
    }
    let element = document.getElementById("mt_autocomplete")
    let board = document.createElement('div')
    board.id = "mt_autoCompleteBoard"
    board.style.zIndex = '10'
    board.style.position = "absolute"
    board.style.width = mt_data.width +'px' 
    board.style.margin = "2px 0 0 0"
    board.style.height = mt_data.height * mt_data.display+'px';
    board.style.borderRadius = "10px";
    board.style.border = "2px solid blue";
    board.style.backgroundColor = "white";
    board.style.left = '0px'
    board.style.overflow = "scroll"
    board.style.overflowX = "hidden"
    board.style.scrollbarWidth = "none"
    element.after(board)
}

const mt_createCompleteItem = (inputed) =>{
    let flag = true
    for(let i of mt_data.options) {
        if((i.toLowerCase()).includes(inputed.toLowerCase())){
            if(flag) {
                mt_createAutoComplete()
                flag = false
            }
            mt_createCompleteData(i)
        }
    }
    if(flag) {
        mt_autoCompleteDelect()
    }
}

const mt_createCompleteData = (inputed) =>{
    const element = document.getElementById('mt_autoCompleteBoard')
    const mt_div = document.createElement('div');
    mt_div.id = inputed
    mt_div.style.zIndex = '11'
    mt_div.style.width = mt_data.width - 15 + 'px';
    mt_div.style.height = mt_data.height + 'px';
    mt_div.style.lineHeight = mt_data.height + 'px';
    mt_div.style.fontSize = mt_data.height * 0.3 + 'px'
    mt_div.style.fontWeight = 'bold'
    mt_div.innerHTML = inputed
    mt_div.style.position = "relative";
    mt_div.style.left= "5px";
    element.appendChild(mt_div)
    mt_div.onclick = function(){
        message.value = inputed
        mt_autoCompleteDelect()
    }
}

const mt_autoCompleteDelect = () =>{
    document.getElementById('mt_Masklayer').style.visibility = "hidden"
    if(document.getElementById('mt_autoCompleteBoard')) {
        document.getElementById('mt_autoCompleteBoard').remove()
    }
}

const mt_autoCompleteShow = () =>{
    document.getElementById('mt_Masklayer').style.visibility = "visible"
}


</script>

<template>
    <div>
        <div id="mt_Masklayer" class="mt_Masklayer" @click="mt_autoCompleteDelect"></div>
        <input id="mt_autocomplete" :value="message" type="text" autocomplete="off" @input="updateMessage" 
        :style="{height: height+'px', width: width+'px'}" />
        <button @click="message += 1">Num++</button>
    </div>
</template>

<style scoped>

.mt_searchData{
    position: absolute;
    left: 0;
    width: 10;
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

</style>