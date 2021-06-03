### 介绍

这是一个简单的Vue铃声组件🔔~

### 安装方法

```javascript
npm i easy-ring
```

### 加载方法

##### 1）全局使用

可以在vue-cli项目main.js上当作插件使用，即可直接在.vue文件里使用<easy-ring>标签

```javascript
// main.js
import EasyRing from 'easy-ring'
Vue.use(EasyRing)
```

```javascript
// YourComponent.vue
<!-- 直接使用 -->
<easy-ring />
```

##### 2）import组件

在.vue文件里import组件

```javascript
// YourComponent.vue
<template>
    ...
		<easy-ring />
	...
</template>

import EasyRing from 'easy-ring'
export default {
    ...
    components: {
        EasyRing
    }
    ...
}
```

### 组件参数

| 参数名   | 类型    | 默认值 | 说明                                                         |
| ------   | ------- | ------ | ------------------------------------------------------------ |
| open     | Boolean | false  | 是否启动。需要启动后再设置ring，铃声才会起效。可以想象为铃声开关。 |
| ring     | Boolean | false  | 是否响铃。设置为true时铃声响起，并对铃声音频循环播放。设置为false时铃声停止。 |
| src      | String  | -      | 目前需要自己指定音频资源。后续尝试加入默认音效               |

### 注意事项

因为当前多数浏览器不支持自动播放音频，因此需要用户先主动播放一次音频。其实也就是需要用户自己去开启铃声（在程序里的表现就是把easy-ring的open属性设为true）。这个过程可以通过在页面上弄一个铃声开关(switch)、或者给用户点击提示按钮等方式实现。

### 项目目录

easy-ring-build: 用于打包组件

easy-ring-demo: 组件的使用demo
