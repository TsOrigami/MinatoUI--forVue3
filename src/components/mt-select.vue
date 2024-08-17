<script setup>

//1.组件名称：mt-select
//2.组件功能：选择器
//3.组件参数：
//          可选项: default: Boolen, 普通选择器, 默认为True
//              options: Array, 选项数组, 每个元素包含lable和value两个属性, 默认为空
//              width: Number, 宽度, 默认为200
//              height: Number, 高度, 默认为60
//              display: Number, 显示的选项数量, 默认为5
//              alt: String, 默认显示文字, 默认为"Select"
//              双向绑定参数: v-model, String/Number, 返回选中的选项value属性
//          可选项: time: Boolen, 时间选择器, 默认为false
//              startTime: String, 初始时间, 默认为"00:00"
//              endTime: String, 结束时间, 默认为"24:00"
//              step: Number, 步长, 默认为15
//              display: Number, 显示的选项数量, 默认为5
//              alt: String, 默认显示文字, 默认为"Select"
//              双向绑定参数: v-model, String, 返回选中的时间选项
//          可选项: date: Boolen, 日期选择器, 默认为false
//              双向绑定参数: v-model, String/Number, 返回选中日期选项


import { defineModel, defineProps, ref, onMounted } from 'vue'
const mt_select_data = defineProps({
    'options': {
        type: Array,
        default: []
    },
    'width': {
        type: Number,
        default: 200
    },
    'height': {
        type: Number,
        default: 60
    },
    'display':{
        type: Number,
        default: 5
    },
    'alt':{
        type: String,
        default: "Select"
    },
    'default': {
        type: String,
        default: true
    },
    'startTime':{
        type: String,
        default: '00:00'
    },
    'endTime':{
        type: String,
        default: '24:00'
    },
    'step':{
        type: Number,
        default: 15
    },
    'time':{
        type: Boolean,
        default: false
    },
    'date':{
        type: Boolean,
        default: false
    },
})

const mt_select_sltValue = defineModel({
    type: [String, Number],
    default: null
})

const mt_select_show = ref('')
const mt_select_colorLock = ref(false)
const mt_select_delect_flag = ref(true)
const mt_select_date = ref('2024-6-3')

onMounted(() => {
    mt_select_show.value = mt_select_data.alt
    if(mt_select_data.date) {
        mt_select_create()
    }
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

const mt_select_create = () =>{
    mt_select_colorLock.value = true
    mt_select_colorHigh()
    document.getElementById('mt_select_Arrow').style.transform = 'rotate(180deg)';
    if(document.getElementById('mt_select_board')) return
    const element = document.getElementById('mt_select_ColorExcMain')
    const selectBoard = document.createElement('div')
    selectBoard.id = 'mt_select_board'
    selectBoard.style.zIndex = '10'
    selectBoard.style.position = "absolute"
    selectBoard.style.width = mt_select_data.width +'px' 
    selectBoard.style.margin = "2px 0 0 0"
    selectBoard.style.height = mt_select_data.height * mt_select_data.display+'px';
    selectBoard.style.borderRadius = "10px";
    selectBoard.style.border = "2px solid blue";
    selectBoard.style.backgroundColor = "white";
    selectBoard.style.overflow = "scroll"
    selectBoard.style.overflowX = "hidden"
    selectBoard.style.scrollbarWidth = "none"
    element.after(selectBoard)
    mt_select_createBoardData()
}

const mt_select_createBoardData = () =>{
    if(mt_select_data.time){
        let start = mt_select_data.startTime
        let end = mt_select_data.endTime
        let start_time = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1])
        let end_time = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1])
        let step = mt_select_data.step
        let find_flag = false
        let item_num = 0
        for(let i = start_time,num_of_item = 0; i <= end_time;i += step, num_of_item++){
            let trans = Math.floor(i/60).toString().padStart(2,'0') + ':' + Math.floor(i%60).toString().padStart(2,'0')
            find_flag = mt_select_createItem_time(trans, num_of_item)
            if(find_flag) {
                item_num = num_of_item
            }
        }
        document.getElementById('mt_select_board').scrollTop = item_num * mt_select_data.height
        } else if(mt_select_data.date) {
            if(mt_select_date.value != ''){
                mt_select_createItem_date(mt_select_date.value)
                mt_select_date.value = ''
            } else if(mt_select_sltValue.value == '') {
                mt_select_createItem_date(mt_select_setNowDate())
            } else {
                mt_select_createItem_date(mt_select_sltValue.value)
            }
        } else if(mt_select_data.default) {
        for(let i = 0;i < mt_select_data.options.length; i++){
            mt_select_createItem_normal(mt_select_data.options[i])
        }
    }
    
}

const mt_select_setNowDate = () =>{
    let date_now = new Date()
    let year = date_now.getFullYear()
    let month = date_now.getMonth() + 1
    let strDate = date_now.getDate() 
    if (month < 10) month = `0${month}` 
    if (strDate < 10) strDate = `0${strDate}` 
    let nowDate = `${year}-${month}-${strDate}`
    return nowDate
}

const mt_select_calculateDate = (item) =>{
    let date = new Date(item);
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    let monthDate = date.getDate()
    const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const weekday = new Date(item).getDay();
    let week = weekdays[weekday];
    let days = {
        'month': monthDate,
        'week': week
    }
    return days
} 

const mt_select_createItem_normal = (item) =>{
    const element = document.getElementById('mt_select_board')
    const mt_item = document.createElement('div');
    mt_item.id = item.value
    mt_item.style.zIndex = '11'
    mt_item.style.width = mt_select_data.width - 15 + 'px';
    mt_item.style.height = mt_select_data.height + 'px';
    mt_item.style.lineHeight = mt_select_data.height + 'px';
    mt_item.style.fontSize = mt_select_data.height * 0.3 + 'px'
    mt_item.style.fontWeight = 'bold'
    mt_item.innerHTML = item.label
    if(mt_select_sltValue.value == item.value) {
        mt_item.style.color = "blue"
    }
    mt_item.style.position = "relative";
    mt_item.style.left= "5px";
    element.appendChild(mt_item)
    mt_item.onclick = function(){
        if( mt_select_sltValue.value == item.value ){
            mt_select_show.value = mt_select_data.alt
            mt_select_sltValue.value = null
        } else {
            mt_select_show.value = item.label
            mt_select_sltValue.value = item.value
        }
    }
}

const mt_select_createItem_time = (item) =>{
    let is_find = false
    const element = document.getElementById('mt_select_board')
    const mt_item = document.createElement('div');
    mt_item.id = item
    mt_item.style.zIndex = '11'
    mt_item.style.width = mt_select_data.width - 15 + 'px';
    mt_item.style.height = mt_select_data.height + 'px';
    mt_item.style.lineHeight = mt_select_data.height + 'px';
    mt_item.style.fontSize = mt_select_data.height * 0.3 + 'px'
    mt_item.style.fontWeight = 'bold'
    mt_item.innerHTML = item
    if(mt_select_sltValue.value == item) {
        mt_item.style.color = "blue"
        is_find = true
    }
    mt_item.style.position = "relative";
    mt_item.style.left= "5px";
    element.appendChild(mt_item)
    mt_item.onclick = function(){
        if( mt_select_sltValue.value == item ){
            mt_select_show.value = mt_select_data.alt
            mt_select_sltValue.value = null
        } else {
            mt_select_show.value = item
            mt_select_sltValue.value = item
        }
    }
    return is_find
}

const mt_select_createItem_date = (item) =>{
    mt_select_createItem_dateTitle(item)
    mt_select_createItem_dateTop(item)
    mt_select_createItem_dateDay(item)
}

const mt_select_createItem_dateTitle = (item)=>{
    const element = document.getElementById('mt_select_board')
    let first_date = item.split('-')[0] + '-'+item.split('-')[1] + '-1'
    let day_year = Number(item.split('-')[0])
    let day_month = Number(item.split('-')[1])
    for(let i = 0;i <5;i++) {
        const mt_item = document.createElement('div');
        mt_item.id = 'week-' + i
        mt_item.style.zIndex = '11'
        if(i != 2) mt_item.style.width = (mt_select_data.width - 23)/7 + 'px';
        else mt_item.style.width = (mt_select_data.width - 18)/7 * 3 + 'px';
        mt_item.style.height = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.lineHeight = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.fontSize = (mt_select_data.width)/6 * 0.3 + 'px'
        mt_item.style.fontWeight = 'bold'
        mt_item.style.textAlign = 'center'
        mt_item.style.backgroundColor = 'skyblue'
        mt_item.style.position = "absolute";
        mt_item.style.left= (i < 3 ? i : i + 2) * (mt_select_data.width - 15)/7 + 5 +"px";
        mt_item.style.top = 5 + "px"
        mt_item.style.userSelect = 'none'
        if(i == 0) {
            mt_item.innerHTML = "<<"
            mt_item.onclick=function(){
                day_year --
                let arrow = String(day_year) + '-' + String(day_month) + '-1'
                mt_select_date.value = arrow
                mt_select_delect()
                mt_select_create()
                mt_select_delect_flag.value = false
            }
        }
        else if(i == 1) {
            mt_item.innerHTML = "<"
            mt_item.onclick=function(){
                day_month --
                if(day_month == 0) {
                    day_year --
                    day_month = 12
                }
                let arrow = String(day_year) + '-' + String(day_month) + '-1'
                mt_select_date.value = arrow
                mt_select_delect()
                mt_select_create()
                mt_select_delect_flag.value = false
            }
        }
        else if(i == 2) mt_item.innerHTML = day_year + '-' + day_month
        else if(i == 3) {
            mt_item.innerHTML = ">"
            mt_item.onclick=function(){
                day_month ++
                if(day_month == 13) {
                    day_year ++
                    day_month = 1
                }
                let arrow = String(day_year) + '-' + String(day_month) + '-1'
                mt_select_date.value = arrow
                mt_select_delect()
                mt_select_create()
                mt_select_delect_flag.value = false
            }
        }
        else if(i == 4) {
            mt_item.innerHTML = ">>"
            mt_item.onclick=function(){
                day_year ++
                let arrow = String(day_year) + '-' + String(day_month) + '-1'
                mt_select_date.value = arrow
                mt_select_delect()
                mt_select_create()
                mt_select_delect_flag.value = false
            }
        }
        element.appendChild(mt_item)
    }
}

const mt_select_createItem_dateTop = (item)=>{
    const element = document.getElementById('mt_select_board')
    let first_date = item.split('-')[0] + '-'+item.split('-')[1] + '-1'
    let date_data = mt_select_calculateDate(first_date)
    let week = date_data.week
    let month = date_data.month
    let line = Math.ceil((week + month) / 7)
    let week_name = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    for(let i = 0; i< 7; i++){
        const mt_item = document.createElement('div');
        mt_item.id = 'week-' + i
        mt_item.style.zIndex = '11'
        mt_item.style.width = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.height = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.lineHeight = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.fontSize = (mt_select_data.width)/6 * 0.3 + 'px'
        mt_item.style.fontWeight = 'bold'
        mt_item.style.textAlign = 'center'
        mt_item.innerHTML = week_name[i]
        mt_item.style.backgroundColor = 'skyblue'
        mt_item.style.position = "absolute";
        mt_item.style.left= i * (mt_select_data.width - 15)/7 + 5 +"px";
        mt_item.style.top = (mt_select_data.width - 15 + line)/7 + 5+"px"
        mt_item.style.userSelect = 'none'
        element.appendChild(mt_item)
    }
}

const mt_select_createItem_dateDay = (item)=>{
    const element = document.getElementById('mt_select_board')
    let first_date = item.split('-')[0] + '-'+item.split('-')[1] + '-1'
    let date_data = mt_select_calculateDate(first_date)
    let week = date_data.week
    let month = date_data.month

    let day_year = Number(item.split('-')[0])
    let day_month = Number(item.split('-')[1])

    let line = Math.ceil((week + month) / 7)
    let week_name = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    for(let i = 1,t = week, l = 1;i <= month;i++,t++) {
        if(t >= 7) {
            t = 0
            l ++
        }
        const mt_item = document.createElement('div');
        mt_item.id = 'date-' + i
        mt_item.style.zIndex = '11'
        mt_item.style.width = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.height = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.lineHeight = (mt_select_data.width - 23)/7 + 'px';
        mt_item.style.fontSize = (mt_select_data.width)/4 * 0.3 + 'px'
        mt_item.style.fontWeight = 'bold'
        mt_item.style.textAlign = 'center'
        mt_item.innerHTML = i
        mt_item.style.backgroundColor = 'skyblue'
        let temp_slt = String(day_year) + '-' + (day_month<10 ? '0':'') + String(day_month) 
                            + '-' +(i<10 ? '0':'') + String(i)
        if(mt_select_sltValue.value == temp_slt) {
            mt_item.style.color = "blue"
        }
        mt_item.style.position = "absolute";
        mt_item.style.left= t * (mt_select_data.width - 15)/7 + 5 +"px";
        mt_item.style.top = (l+1) * (mt_select_data.width - 15 + line)/7 + 5 + "px"
        mt_item.style.userSelect = 'none'
        element.appendChild(mt_item)
        mt_item.onclick = function(){
            if(mt_select_sltValue.value != temp_slt){
                mt_select_show.value = temp_slt
                mt_select_sltValue.value = temp_slt
            } else {            
                mt_select_sltValue.value =  ''
                    mt_select_show.value = mt_select_data.alt
            }
        }
    }
    mt_select_createItem_date_lastDay(item, line)
}

const mt_select_createItem_date_lastDay = (item, line) =>{
    const element = document.getElementById('mt_select_board')
    let now_date = item.split('-')[0] + '-'+item.split('-')[1] + '-' + '1'
    let now_data = mt_select_calculateDate(now_date)
    let last_year = Number(item.split('-')[0])
    let last_month = Number(item.split('-')[1])
    last_month -- 
    if(last_month == 0) {
        last_month = 12
        last_year --
    }
    let last_date = String(last_year) + '-' + (last_month<10?'0':'') + String(last_month) + '-' + '01'
    let last_data = mt_select_calculateDate(last_date) 
    let next_year = Number(item.split('-')[0])
    let next_month = Number(item.split('-')[1])
    next_month ++
    if(next_month == 13) {
        next_month = 1
        next_year ++
    }
    let next_date = String(next_year) + '-' + (next_month<10?'0':'') + String(next_month) + '-' + '01'
    let next_data = mt_select_calculateDate(next_date) 
    if(now_data.week != 0) {
        for(let i=1;i<=now_data.week;i++){
            console.log(last_data.month - now_data.week + i)
            const mt_item = document.createElement('div');
            mt_item.id = 'date-' + i
            mt_item.style.zIndex = '11'
            mt_item.style.width = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.height = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.lineHeight = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.fontSize = (mt_select_data.width)/4 * 0.3 + 'px'
            mt_item.style.fontWeight = 'bold'
            mt_item.style.textAlign = 'center'
            mt_item.innerHTML = last_data.month - now_data.week + i
            mt_item.style.backgroundColor = '#ccc'
            mt_item.style.color = "gray"
            let temp_slt = String(last_year) + '-' + (last_month<10 ? '0':'') + String(last_month) 
                                + '-' + String(last_data.month - now_data.week + i)
            if(mt_select_sltValue.value == temp_slt) {
                mt_item.style.color = "skyblue"
            }
            mt_item.style.position = "absolute";
            mt_item.style.left= (i-1) * (mt_select_data.width - 15)/7 + 5 +"px";
            mt_item.style.top = 2 * (mt_select_data.width - 10 )/7 + 5 + "px"
            mt_item.style.userSelect = 'none'
            element.appendChild(mt_item)
            mt_item.onclick = function(){
                if(mt_select_sltValue.value != temp_slt){
                    mt_select_show.value = temp_slt
                    mt_select_sltValue.value = temp_slt
                } else {            
                    mt_select_sltValue.value =  ''
                    mt_select_show.value = mt_select_data.alt
                }
            }
        }
    }
    if((now_data.week + now_data.month) % 7 != 0 ){
        console.log((now_data.week + now_data.month) % 7)
        for(let t = (now_data.week + now_data.month) % 7, i=1; t<7; t++, i++){
            const mt_item = document.createElement('div');
            mt_item.id = 'date-' + i
            mt_item.style.zIndex = '11'
            mt_item.style.width = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.height = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.lineHeight = (mt_select_data.width - 23)/7 + 'px';
            mt_item.style.fontSize = (mt_select_data.width)/4 * 0.3 + 'px'
            mt_item.style.fontWeight = 'bold'
            mt_item.style.textAlign = 'center'
            mt_item.innerHTML = i
            mt_item.style.backgroundColor = '#ccc'
            mt_item.style.color = "gray"
            let temp_slt = String(next_year) + '-' + (next_month<10 ? '0':'') + String(next_month) 
                                + '-' +'0' + String(i)
            if(mt_select_sltValue.value == temp_slt) {
                mt_item.style.color = "skyblue"
            }
            mt_item.style.position = "absolute";
            mt_item.style.left= t * (mt_select_data.width - 15)/7 + 5 +"px";
            mt_item.style.top = (line + 1) * (mt_select_data.width - 15 +line )/7 + 5 + "px"
            mt_item.style.userSelect = 'none'
            element.appendChild(mt_item)
            mt_item.onclick = function(){
                if(mt_select_sltValue.value != temp_slt){
                    mt_select_show.value = temp_slt
                    mt_select_sltValue.value = temp_slt
                } else {            
                    mt_select_sltValue.value =  ''
                    mt_select_show.value = mt_select_data.alt
                }
            }
        }
    }
    element.style.height = (mt_select_data.width) /7 * (line + 2) + 'px';
}

const mt_select_delect = () =>{
    if(mt_select_delect_flag.value) {
        if(document.getElementById('mt_select_board')) {
        document.getElementById('mt_select_board').remove()
    }
    mt_select_colorLock.value = false
    mt_select_colorLow()
    document.getElementById('mt_select_Arrow').style.transform = 'rotate(0deg)';
    console.log("DEL")
    } else {
        mt_select_delect_flag.value = true
    }
}

const mt_select_colorHigh = () =>{
    document.getElementById('mt_select_ColorExcMain').style.borderColor = 'blue'
    document.getElementById('mt_select_ColorExcArrow').style.borderColor = 'blue'
}

const mt_select_colorLow = () =>{
    if(mt_select_colorLock.value) return
    document.getElementById('mt_select_ColorExcMain').style.borderColor = 'skyblue'
    document.getElementById('mt_select_ColorExcArrow').style.borderColor = 'skyblue'
}

</script>

<template>
    <div  :style="{
                height: mt_select_data['height'] +'px', 
            width: mt_select_data['width'] +'px'
            }">
        <div id="mt_select_ColorExcMain" class="mt_select_Select" @click="mt_select_create" 
            @mouseover="mt_select_colorHigh" 
            @mouseleave="mt_select_colorLow" 
            v-click-outside="mt_select_delect">
            <div id="mt_select_Selected" class="mt_select_Selected" 
                :style="{
                    height: mt_select_data['height'] * 0.6 + 'px', 
                    lineHeight: mt_select_data['height'] * 0.6 + 'px'
                }">{{ mt_select_show }}
            </div>
            <div id="mt_select_Arrow" class="mt_select_RotateArrow" 
                :style="{
                    height: mt_select_data['height'] * 0.3+'px', 
                    width: mt_select_data['height'] * 0.3+'px'
                }">
                <div id="mt_select_ColorExcArrow" class="mt_select_Arrow" 
                    :style="{
                        height: mt_select_data['height'] * 0.3 + 'px', 
                        width: mt_select_data['height'] * 0.3 + 'px' ,
                        top: '20%'
                    }"/>
            </div>
        </div>
    </div>
</template>

<style scoped>


.mt_select_Select {
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


.mt_select_RotateArrow{
    transition-duration:0.2s;
    position:absolute;
    right: 5%;
    top: 35%;

    /* background-color: skyblue;  */
}

.mt_select_Arrow {
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

.mt_select_Selected{
    position:absolute;
    left: 5%;
    right: 15%;
    top: 20%;
    bottom: 20%;
    font-weight: bold;
}

</style>