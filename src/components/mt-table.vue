<script setup>

//组件说明
// 1.组件名称: mt-table
// 2.组件功能: 表格组件
// 3.组件参数:
//    thead: 表头数据，类型为数组(字符串数组)，默认为空数组
//    tbody: 表体数据，类型为数组(表单)，默认为空数组
//    width: 表格宽度，类型为数字，默认为200
//    height: 表格高度，类型为数字，默认为200
//    Color: 表格背景颜色，类型为字符串，默认为白色
//    theadColor: 表头背景颜色，类型为字符串，默认为白色
//    tbodyColorS: 表体奇数项背景颜色，类型为字符串，默认为#E0E0E0(较浅的灰色)
//    tbodyColorE: 表体偶数项背景颜色，类型为字符串，默认为白色

import { ref, defineProps, watch, toRefs } from 'vue'

// 获取父组件传回的数据
const data = defineProps({
    thead: {
        type: Array,
        default: []
    },
    tbody: {
        type: Array,
        default: []
    },
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: Number,
        default: 200
    },
    Color: {
        type: String,
        default: 'white'
    },
    theadColor: {
        type: String,
        default: 'white'
    },
    tbodyColorS: {
        type: String,
        default: '#E0E0E0'
    },
    tbodyColorE: {
        type: String,
        default: 'white'
    },
})

// 监听tbody的变化，当tbody发生变化时，移动滚动条到最底部
watch(() => data.tbody, () => {
    setTimeout(() => {
        const tbodyDiv = document.getElementById('tbodyDiv')
        tbodyDiv.scrollTop = tbodyDiv.scrollHeight
    }, 100)
}, {
    deep: true
})
</script>

<template>
    <div :style="{ backgroundColor: Color, width: width + 'px', height: height + 'px' }">
        <div :style="{ backgroundColor: Color }">
            <table :style="{
                backgroundColor: Color
            }">
                <thead>
                    <tr>
                        <!-- 遍历thead，生成表头 -->
                        <th v-for="head in thead"
                            :style="{ width: (width - 10) / thead.length + 'px', backgroundColor: theadColor, height: '20px', padding: '0' }">
                            {{ head }}
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="tbodyDiv"
            :style="{ height: (height - 20) + 'px', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: Color, width: width + 'px' }">
            <table>
                <tbody>
                    <!-- 遍历tbody，生成表格内容 -->

                    <tr v-for="item in tbody.length"
                        :style="{ backgroundColor: item % 2 == 0 ? tbodyColorE : tbodyColorS, padding: '0' }">
                        <td v-for="head in thead"
                            :style="{ width: width / thead.length + 'px', height: '20px', padding: '0' }">
                            {{ tbody[item - 1][head] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
div {
    scroll-behavior: smooth;
    display: block;
    border-spacing: 0;
}

table,
thead,
tbody {
    border-spacing: 0;
    text-align: left;
}

div::-webkit-scrollbar {
    width: 10px;
}

div::-webkit-scrollbar-track {
    background: #f1f1f1;
}

div::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

div::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>