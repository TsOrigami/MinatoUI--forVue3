<script setup>

// 组件说明
// 1.组件名：mt-select
// 2.组件功能：下拉框
// 3.组件使用说明：
// 在父组件中使用<mt-select ref="selectValue" :options="options" />，其中options为一个数组，每个元素为一个对象，包含value和label两个属性
// 在父组件中可以通过调用子组件的getSelect方法获取当前选中的值
// 4.组件参数：
//    options：必填，下拉框选项，每个选项为一个对象，包含value和label两个属性。类型为数组(Array)
// 5.组件事件说明：
//    举例：
// [HTML] <mt_select ref="selectValue" :options="options" />
// [JavaScript setup]
// const options = [
//     { value: '1', label: '选项1' },
//     { value: '2', label: '选项2' },
//     { value: '3', label: '选项3' },
// ]
// const selectValue = ref(null)
// const getSelectValue = () => {
//     return selectValue.value.getSelect()
// }
// selectValue为子组件的ref，getSelectValue为获取当前选中值的函数


import { defineExpose, ref } from 'vue'

const value = ref("")

const data = defineProps({
    options: {
        type: Array,
        required: true
    }
})

0
const getSelect = () => {
    var myselect = document.getElementById("select")
    var index = myselect.selectedIndex
    var value = myselect.options[index].value;
    return value
}

defineExpose({ getSelect })

</script>

<template>
    <div>
        <select id="select">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped></style>