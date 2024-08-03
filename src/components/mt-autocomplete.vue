<script setup>

//1.组件名称：mt-autocomplete
//2.组件功能：自动补全输入框
//3.组件参数：
//          options：Array, 自动补全的内容， 默认为空
//          height：Number, 输入框的高度， 默认为40
//          width：Number, 输入框的宽度， 默认为200
//          display：Number, 显示的条数， 默认为5
//          双向绑定参数: v-model：String, 输入框的值，默认为空
//4.组件使用：
//          匹配含有该子字符串的选项
//          <mt-autocomplete :options="options" :height="height" :width="width" :display="display" ></mt-autocomplete>


import {ref, defineProps, defineModel, onMounted, watch} from 'vue'


const mt_autocomple_data = defineProps({
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

const mt_autocomple_messages = defineModel({
    type: String ,
    default: '',
})

const updateMessage = (event) => {
    mt_autocomple_messages.value = event.target.value; 
    mt_autocomple_createCompleteItem(event.target.value)
};

const mt_autocomple_createAutoComplete = () =>{
    if(document.getElementById('mt_autocomple_autoCompleteBoard')) {
        document.getElementById('mt_autocomple_autoCompleteBoard').remove()
    }
    let element = document.getElementById("mt_autocomple_input")
    let board = document.createElement('div')
    board.id = "mt_autocomple_autoCompleteBoard"
    board.style.zIndex = '10'
    board.style.position = "absolute"
    board.style.width = mt_autocomple_data.width +'px'
    board.style.margin = "2px 0 0 0"
    board.style.height = mt_autocomple_data.height * mt_autocomple_data.display+'px';
    board.style.borderRadius = "10px";
    board.style.border = "2px solid blue";
    board.style.backgroundColor = "white";
    board.style.left = '0px'
    board.style.overflow = "scroll"
    board.style.overflowX = "hidden"
    board.style.scrollbarWidth = "none"
    element.after(board)
}

const mt_autocomple_createCompleteItem = (inputed) =>{
    let flag = true
    for(let i of mt_autocomple_data.options) {
        if((i.toLowerCase()).includes(inputed.toLowerCase())){
            if(flag) {
                mt_autocomple_createAutoComplete()
                flag = false
            }
            mt_autocomple_createCompleteData(i)
        }
    }
    if(flag) {
        mt_autocomple_autoCompleteDelect()
    }
}

const mt_autocomple_createCompleteData = (inputed) =>{
    const element = document.getElementById('mt_autocomple_autoCompleteBoard')
    const mt_autocomple_div = document.createElement('div');
    mt_autocomple_div.id = inputed
    mt_autocomple_div.style.zIndex = '11'
    mt_autocomple_div.style.width = mt_autocomple_data.width - 15 + 'px';
    mt_autocomple_div.style.height = mt_autocomple_data.height + 'px';
    mt_autocomple_div.style.lineHeight = mt_autocomple_data.height + 'px';
    mt_autocomple_div.style.fontSize = mt_autocomple_data.height * 0.3 + 'px'
    mt_autocomple_div.style.fontWeight = 'bold'
    mt_autocomple_div.innerHTML = inputed
    mt_autocomple_div.style.position = "relative";
    mt_autocomple_div.style.left= "5px";
    element.appendChild(mt_autocomple_div)
    mt_autocomple_div.onclick = function(){
        mt_autocomple_messages.value = inputed
    }
}

const mt_autocomple_autoCompleteDelect = () =>{
    if(document.getElementById('mt_autocomple_autoCompleteBoard')) {
        document.getElementById('mt_autocomple_autoCompleteBoard').remove()
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
    <div>
        <input id="mt_autocomple_input" class="mt_autocomple_input" :value="mt_autocomple_messages" type="text" autocomplete="off" 
        @input="updateMessage" @click="updateMessage" v-click-outside="mt_autocomple_autoCompleteDelect" 
        :style="{height: height+'px', width: width+'px', borderRadius: height*0.25+'px', textIndent: height*0.25+'px'}" />
    </div>
</template>

<style scoped>

.mt_autocomple_searchData{
    position: absolute;
    left: 0;
    width: 10;
}


.mt_autocomple_input{
    border: 2px solid skyblue;
    transition-duration: 0.3s;
    outline: none;
}

.mt_autocomple_input:focus{
    border: 2px solid blue;
}

</style>