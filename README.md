<p align="center">
  <img src="https://img.shields.io/badge/vue-ring component---" alt="vue ring component">
  <img src="https://img.shields.io/badge/style-easy---" alt="easy">
</p>

## 语言 / Language
- [中文](#user-content-chinese)
- [English](#user-content-english)

<a name="chinese"></a>

## -中文文档

## 介绍

这是一个简单、通用、酷炫的前端铃声🔔组件～

可用于铃声、消息提示音、交互音效等诸多场景

## 支持功能
- 多种开发环境。可在Vue、React、纯js（ES6+）中使用
- 多种调用风格。Vue/React组件风格、以及js函数调用风格
- 可自定义音频源
- 支持使用简谱来自定义乐曲音效
- 内置默认音效
- 循环播放/单播放

## 参数

| 参数名 | 类型    | 是否必须 | 默认值 | 说明                                                         |
| ------ | ------- | ------ | ------------------ | ------------------------------------------------------------ |
| open   | Boolean | √ | false  | 开启组件。将其设为true是使用本组件的前提 |
| ring   | Boolean | √ |false  | 是否开始播放音效。当设置为false时，则为关闭音效 |
| src    | String  | × | ''    | 铃声音频文件的地址，需传入绝对路径。如果不清楚如何获取绝对路径，可参见下文《关于音效.自定义音频源》一节，这其实非常简单             |
| loop    | Boolean | × |  true    |  是否循环播放。在不同开发环境下使用会有细微差异，详见下文《关于循环播放和单播放》               |
|   defaultMusic  | String  | × |'EZIOS_FAMILY'    | 默认铃声曲目。目前可选值：'LITTLE_STAR' \| 'TWO_TIGERS' \| 'EZIOS_FAMILY' \| 'CASTLE_IN_THE_SKY'               |
|  musicText   | String  | × | ''    |     以简谱来自定义音效。详见下文《关于音效.自定义简谱音效》一节           |
|  log   | Boolean  | × |true    | 是否打印日志               |


## 安装

```javascript
npm i easy-ring
```

## 使用

### 1）在Vue内使用

在.vue文件里引入

```javascript
<template>
    <easy-ring
        :open="open"
        :ring="ring"
        :src="yourAudio"
    />
</template>

<script>
import { EasyRingVueComponent as EasyRing } from 'easy-ring'
import yourAudio from '@/assets/yourAudio.wav'
import msg from 'msg'

export default {
    components: {
        EasyRing
    }
    data() {
        return {
            open: false,
            ring: false
        }
    },
    methods: {
        openCompoent() {
            if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
                this.open = true
            }
        }
    },
    mounted() {
        this.openCompoent()

        msg.listening()

        msg.received(() => {
            this.ring = true
        })

        msg.hasRead(() => {
            this.ring = false
        })
    }
}
</script>

/* in Vue3 */
<script setup>
import { ref } from 'vue'
import { EasyRingVueComponent as EasyRing } from 'easy-ring'
import yourAudio from '@/assets/yourAudio.wav'
import msg from 'msg'

const open = ref(false)
const ring = ref(false)
const openCompoent = () => {
    if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
        open.value = true
    }
}

openCompoent()
msg.listening()
msg.received(() => {
    ring.value = true
})

msg.hasRead(() => {
    ring.value = false
})

</script>
```

让组件响起来：
- ① 开启组件：将open参数设为true。这一步需要放到一个交互里（比如按钮）进行触发，详细原因可参见下文 《关于open参数以及浏览器限制的解释》
- ② 播放音效：将ring参数设为true

让组件静下来：
- ③ 暂停音效：将ring参数设为false

根据自己的需求或效果，自行决定何时播放、暂停音效，在对应的逻辑代码下控制ring参数值的更新即可

### 2）在React内使用
可以参考下面的例子：

```javascript
import React from "react"
import { EasyRingReactComponent as EasyRing } from 'easy-ring'
import msg from 'msg'

export default class Demo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            ring: false,
        }
    }
    getMsg() {
        msg.listening()
        msg.received(() => {
            this.setState({ ring: true })
        })

        msg.hasRead(() => {
            this.setState({ ring: false })
        })
    }
    openComponent() {
        if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
            this.setState({
                open: true
            })
        }
    }
    componentDidMount() {
        this.openComponent()
        this.getMsg()
    }
    render() {
        return (
        <div>
          <EasyRing 
            open={this.state.open} 
            ring={this.state.ring}
          ></EasyRing>
        </div>
        )
    }
}
```
使用方式基本同Vue组件，

让组件响起来：
- ① 开启组件：将open参数设为true。这一步需要放到一个交互里（比如按钮）进行触发，详细原因可参见下文 《关于open参数以及浏览器限制的解释》
- ② 播放音效：将ring参数设为true

让组件静下来：
- ③ 暂停音效：将ring参数设为false

根据自己的需求或效果，自行决定何时播放、暂停音效，在对应的逻辑代码下控制ring参数值的更新即可

### 3）js函数调用的形式
下面代码可供参考：

```javascript
const myEasyring = new CommonEasyRing()  

button.addEventListener('click', () => {
    if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
        myEasyring.open()
    }
})

msg.listening()

msg.received(() => {
    myEasyring.ring()
})

msg.hasRead(() => {
    myEasyring.stop()
})
```

## 关于音效
本组件有三种音效的使用方式：自定义音频源、自定义简谱音效、内置默认音效。可根据需求选择自己喜欢的方式。

这三种音效的播放优先级为: 自定义音频源 > 自定义简谱音效 > 内置默认音效

### 1）自定义音频源
将你的音频文件地址传给组件的src参数，即可使用自定义音频源。

采用的是绝对路径，因为使用相对路径容易在本地构建或者打包过程中出现问题，且作为第三方组件的easy-ring无法从你项目里的相对路径找到音频文件。

获取绝对路径其实非常简单，在Vue或者React环境（可能也包括其他构建环境）中使用下列方式：
```javascript
import yourAudio from '@/assets/yourAudio.wav'
```
此时yourAudio变量就是你音频文件的绝对路径，将这个变量传给src参数即可。

### 2）自定义简谱音效
将一串简谱的字符串传给musicText参数，即可使用自定义简谱音效。

例如下面例子展示了怎么使用《小星星》的音效：
```javascript
    /* in Vue */
    <EasyRing
      :open="open"
      :ring="ring"
      musicText="1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -"
    />

    /* in React */
    <EasyRing
      open={this.state.open}
      ring={this.state.ring}
      musicText="1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -"
    />

    /* in JS */
    const myEasyring = new CommonEasyRing({
        musicText: '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -'
    })
```
musicText参数的值需要是一串字符串，里面主要由数字、"-"组成，并以一个空格进行间隔区分。
| 字符 | 对应| 说明                                                         |
| ------ | ------- | ------ |
| .1 ~ .7  | 低音 | 注意前面的符号是"."  |
| 1 ~ 7  | 中音 |   |
| 1. ~ 7.  | 高音 |  注意前面的符号是"." |
| -  | 一个停顿单位 | 停顿单位连续得越多，代表停顿时间越长。比如： "- - -"代表停顿三个单位 |

下面是目前本组件内置的几首简谱乐曲，可用于参考：
| 曲名 |       musicText值                                           |
| ------ | ------- | ------ |
| 小星星（LITTLE_STAR） | '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -' |
| 两只老虎（TWO_TIGERS） | '1 2 3 1 - 1 2 3 1 - 3 4 5 - 3 4 5 - - 5 6 5 4 3 - 1 - 5 6 5 4 3 - 1 - 2 - .5 - 1 - - 2 - .5 - 1 - - - -' |
| 艾吉奥之家（EZIOS_FAMILY） | '.6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - 6 - 7 - 1. - 2. - 3. - - - - - -' |
| 天空之城（CASTLE_IN_THE_SKY） | '.6 .7 1 - - .7 1 - 3 - .7 - - - - .3 .3 .6 - - .5 .6 - 1 - .5 - - - - .3 .3 .4 - - .3 .4 - 1 - .3 - - - - 1 1 1 .7 - - .4 .4 - .7 - .7 - - - - -' |

这实际上使用了Web Audio API的前端技术。这块要感谢张鑫旭大佬（https://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/） 的启发 、以及前端王睿
大佬（https://www.jianshu.com/p/4f4c8bbd9775、https://www.zhanhu56.com/h5/music_box/、https://github.com/chchlsh/MusicBox） MusicBox组件的功能支持👍，他们的灵感和帮助让这个组件有了更多拓展性和乐趣。

### 3）内置默认音效
如果没有给src参数、musicText参数传递值的时候，组件会使用默认音效。目前的默认音效为《Ezio's Family》，这是游戏《刺客信条》的一首主题曲。

你也可以通过设置defaultMusic的值来更换默认音效曲目，目前支持的可选值为：'LITTLE_STAR'、'TWO_TIGERS'、'EZIOS_FAMILY'、'CASTLE_IN_THE_SKY'。

这实际上跟自定义简谱音效功能的实现使用了同一种技术（Web Audio API）。如果你有更好、更动听的旋律简谱，也欢迎在我的github或者博客里进行分享，后续会考虑将更多内置音效放到组件里。😊

## 关于循环播放和单播放
通过loop参数可以控制音效是循环进行播放、还是仅播放一次就停止。

loop参数的默认值是true，也就是默认为循环播放模式。此时你不需要做任何额外的事情、甚至不需要对组件给予loop参数。

但是如果你需要每次音效只响一次，即如果将loop参数的值设置为了false，则需要一点点额外的操作来让组件能继续流畅地工作下去。

### 1）js函数调用的形式
很幸运，使用这种形式，只要传入的loop参数值为false就可以，你完全不必做任何额外的操作。

```javascript
const myEasyring = new CommonEasyRing({ 
    loop: false  // No looping
})  

button.addEventListener('click', () => {
    if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
        myEasyring.open()
    }
})

msg.received(() => {
    myEasyring.ring()
})

msg.hasRead(() => {
    myEasyring.stop()
})
```

### 2）在Vue中
我们需要在播放完毕之后，将ring参数值重新重置为“false”，以便你在下一次更新ring参数值的时候，能够让组件重新响起来。

这只需要你在使用组件时，对ring参数进行props的双向绑定即可。这在Vue2中是使用.sync修饰符，Vue3中则是使用v-model。

可以参考下面的例子：

```javascript
/* Vue2 */
<template>
    <easy-ring
        :open="open"
        :ring.sync="ring" // 使用.sync修饰符 ｜ set '.sync' here
        :loop="false" // No looping
        :src="yourAudio"
    />
</template>

/* Vue3 */
<template>
    <easy-ring
        :open="open"
        v-model:ring="ring" // 使用v-model ｜ set 'v-model' here
        :loop="false" // No looping
        :src="yourAudio"
    />
</template>
```
### 3）在React中
在React中较为麻烦一些。我们同样需要将ring参数的值重置为false。但是由于React数据的单流向性，easy-ring作为子组件不能直接更改父组件传入的props.ring。所以，只能是由开发者自己进行这一步的操作。

EasyRingReactComponent提供了一个名为ended的事件回调，会在每一次音频播放结束后触发，你可以给这个参数传入一个处理函数endedHandle，并在它里面写入将ring重置的逻辑。

下面是给出的参考例子：

```javascript
import React from "react"
import { EasyRingReactComponent as EasyRing } from 'easy-ring'
import msg from 'msg'

export default class Demo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            ring: false,
        }
        // !! 为了在回调中使用 `this`，这里的绑定是必不可少的
        // !! In order to use 'this' in callbacks, bindings here are essential
        this.endedHandle = this.endedHandle.bind(this)
    }
    getMsg() {
        msg.listening()

        msg.received(() => {
            this.setState({ ring: true })
        })

        msg.hasRead(() => {
            this.setState({ ring: false })
        })
    }
    openComponent() {
      this.setState({
        open: true
      })
    }
    componentDidMount() {
        this.getMsg()
    }
    endedHandle() { // 你的ended回调处理函数 | Your ended callback handler
      this.setState({ ring: false }) // 在这里把ring重置为false ｜ Reset ring to 'false' here
    }
    render() {
        return (
        <div>
          <EasyRing 
            open={this.state.open} 
            ring={this.state.ring} 
            loop={false} // No looping
            ended={this.endedHandle} // 在这里传入回调 | set endedHandle here
          ></EasyRing>
          <button onClick={this.openComponent}>打开铃声|openRing</button>
        </div>
        )
    }
}
```
## 关于open参数以及浏览器限制的解释

当前大多数浏览器不支持自动播放音频，这需要用户自己主动触发交互后才能播放。因此，本组件才会增加一个open参数，用于（提醒开发者）实现这一操作。

我们需要把“将open参数设置为true”的这一控制逻辑，放在触发用户交互行为的事件回调里，例如：按钮的click事件、switch开关的change事件等。

但是，你可以通过一些交互设计来淡化这一过程，从而提升用户体验。比如：
- 在用户点击“登录”按钮时，在click回调里设置open参数为true
- 设置一个音效开关，在change回调里设置open参数为true
- 点击导航菜单的时候，在click回调里设置open参数为true
- 在点击打开消息弹窗时，在click回调里设置open参数为true

上面的例子不太适用于刷新页面后的情况，刷新页面情景下，个人认为较好的方式可能是：
- 弹出一个询问“是否允许开启音效”的弹窗

<a name="english"></a>
## - Document in English 

## Introduction
This is a Vue ringtone 🔔 Components~

## How to use it？
### Installation
```javascript
npm i easy-ring
```
### Register it

#### 1) global use
In the Vue-cli project main.js as a plugin, which can be directly used in Vue SFC.
```javascript

// main. js

import EasyRing from 'easy-ring'

Vue.use(EasyRing)

```



```javascript

<!-- Use directly without introducing -- >

<template>

    <easy-ring

        :open="open"

        :ring="ring"

        :src="src"

    />

</template>



export default {

    ...

}

```



#### 2) import 



use 'import' in Vue SFC



```javascript

<template>

    <easy-ring

        :open="open"

        :ring="ring"

        :src="src"

    />

</template>



import EasyRing from 'easy-ring'

export default {

    components: {

        EasyRing

    }

...

}

```
### make the component work
- Step1: Set the 'open' parameter to 'true' for turning on the bell.
- Step2: Set the ring parameter to true and make the component ring.
- Step3: Set the ring parameter to false for turning off the bell when you want it quite.


PS：

- To start the ringing tone, you need to put it at the buried point under a button to trigger it (see 'explanation on the open parameter' below for the explanation of the reason). In order to improve the use experience of their own products, users can be unaware. For example, when logging in, users can click the "login" button to set the open parameter to true

- Decide when to ring and when to turn off the bell according to your own needs, and put the change of ring parameters under the corresponding logic

### Component's parameters
| name | type    | default | description                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| open   | Boolean | false  | open the component |
| ring   | Boolean | false  | make the component ring |
| src    | String  |  default sound source    |  url/src of your sound source             |

### Use the default sound source

If you want to use the default sound effect, please require the audio source in your Vue project's ./main.js

```

// main. js

require('easy-ring/easy-ring-default.wav')

```



Then merge this code into your vue.config.js configuration:

```

configureWebpack: {

    module: {

        rules: [

            {

                test: /easy-ring-default\. (wav)$/i,

                loader: 'file-loader',

                options: {

                    name: 'media/[name]. [ext]'

                },

            },

        ]

    }

}

```

The reason for adding this configuration is that Vue-cli will add the hash version number to all packaged static resources by default, so easy-ring cannot get the address of the default audio file in your directory.

After adding this file-loader configuration, the default audio file of easy ring will not carry the hash version number, and easy-ring can find it.

### Explanation of the 'open' parameter
Because most browsers currently do not support automatic audio playing, users need to actively trigger audio play. This process needs to be placed in interactive events such as click, so we need a button or something to trigger this behavior.

However, you can design this behavior through some interaction, so as to improve the user experience and even make users unaware of it. For example, during login, when the user clicks the "login" button, set the open parameter to true in the code.