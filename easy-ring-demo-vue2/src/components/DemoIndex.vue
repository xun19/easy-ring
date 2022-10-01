<template>
    <div>
        <div style="position:absolute; top: 30px; left: 30px;">
        <span style="color:black; margin-right: 10px;">组件风格 | Component</span>
        <el-tooltip :content="'style: ' + value" placement="top">
            <el-switch
            v-model="value"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-value="函数风格 | Function"
            inactive-value="组件风格 | Component"
            />
        </el-tooltip>
        <span style="color:black; margin-left: 10px;">函数风格 | Function</span>
        </div>
        <FunctionDemo v-if="value === '函数风格 | Function'"/>
        <ComponentDemo v-else/>
    </div>
</template>

<script>
import ComponentDemo from './ComponentDemo.vue'
import FunctionDemo from './FunctionDemo.vue'

export default {
    components: {
        ComponentDemo,
        FunctionDemo
    },
    data() {
        return {
            value: '函数风格 | Function'
        }
    }
}
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
    