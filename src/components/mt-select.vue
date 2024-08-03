<script setup>

//2024.3.8更新 等待重写以统一设计

import { defineModel, defineProps, ref } from 'vue'
const data = defineProps({
    options: {
        type: Array,
        required: true
    },
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: Number,
        default: 50
    },
    borderColor: {
        type: String,
        default: "skyblue"
    },
    focusColor: {
        type: String,
        default: "blue"
    }
})

const mt_select_sltValue = defineModel({
    type: [String, Number],
    default: null
})

const mt_select_getValue = () =>{
    let mt_select = document.getElementById('mt_select_Select')
    let mt_index = mt_select.selectedIndex
    let mt_value = mt_select.options[mt_index].value
    mt_select_sltValue.value = mt_value
}

</script>

<template>
    <div>
        <select id="mt_select_Select" @change="mt_select_getValue"
            :style="{'height': height+ 'px', 'width': width +'px', 'borderRadius': height*0.25+'px', 'borderColor': borderColor}"
            class="mt_select_Select">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>

.mt_select_Select{
    outline: none;
    border-style: solid;
    border-width: 2px
}

</style>