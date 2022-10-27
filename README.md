<p align="center">
  <img src="https://img.shields.io/badge/vue-ring component---" alt="vue ring component">
  <img src="https://img.shields.io/badge/style-easy---" alt="easy">
</p>

## Choose Language/选择语言
- [中文](#user-content-chinese)
- [English](#user-content-english)

<a name="chinese"></a>

## -中文文档

## 介绍

这是一个**使用简单、通用、酷炫**的前端铃声🔔组件～

可用于铃声、消息提示音、交互音效等诸多场景。

## 特点
- 支持多种开发环境。可在Vue、React、纯js（ES6+）中使用
- 支持多种调用风格。有Vue组件、React组件、以及js函数调用三种风格
- 可自定义音频源
- 支持使用简谱来自定义乐曲音效
- 内置默认音效
- 循环播放/单播放

## 参数

| 参数名 | 类型    |  必须  | 默认值 | 说明                                                         |
| ------ | ------- | ------- | ------------------ | ------------------------------------------------------------ |
| open   | Boolean | √ | false  | 开启组件。将其设为true是使用本组件的前提 |
| ring   | Boolean | √ |false  | 是否开始播放音效。当设置为false时，则为关闭音效 |
| src    | String  | × | ''    | 铃声音频文件的地址，可以是网络资源或者项目内资源。项目内资源需传入绝对路径。如果不清楚如何获取绝对路径，可参见下文《关于音效.自定义音频源》一节，这其实非常简单             |
| loop    | Boolean | × |  true    |  是否循环播放               |
|   defaultMusic  | String  | × |'EZIOS_FAMILY'    | 默认铃声曲目。目前可选值：'LITTLE_STAR' \| 'TWO_TIGERS' \| 'EZIOS_FAMILY' \| 'CASTLE_IN_THE_SKY'               |
|  musicText   | String  | × | ''    |     以简谱来自定义音效。详见下文《关于音效.自定义简谱音效》一节           |
|  log   | Boolean  | × |true    | 是否打印日志               |
|  ended   | Function  | × |function() {}   | 音频（一次）播放结束事件回调              |
|  setRing   | Function  | √ (React) | -   | 对于React组件为必传。传入的值为使用useState Hook后，ring所对应的状态更新函数。具体可参考《使用.React组件形式》里的例子              |


## 安装

```javascript
npm i easy-ring
```

## 使用
使用easy-ring只需要简单的三个操作，
- ① 开启组件。
- ② 播放音效。可以让组件开始响起。
- ③ 暂停音效。可以让组件安静下来。

不同风格的使用方式基本都遵循这三个操作，只是在使用细节上有一些差异。

### 1）Vue组件形式
当作一般的Vue组件引入、使用即可。主要通过open、ring参数进行控制。

- ① 开启组件：将open参数设置为true。
***PS：这一步需要放到一个交互（比如：按钮点击）里进行触发，这是为了规避目前浏览器的限制。详细可参见下文 《关于open参数以及浏览器限制的解释》一章***
- ② 播放音效：将ring参数设置为true
- ③ 暂停音效：将ring参数设置为false

根据自己的需求和想要的效果，自行决定何时播放、暂停音效，只需在对应的逻辑代码下控制ring参数值的更新即可

这里分别提供了Vue2、Vue3的例子进行参考：

#### Vue2的写法

```javascript
<template>
    <easy-ring
        :open="open"
        :ring.sync="ring" // 注意：这里需要使用双向绑定 
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
        openComponent() {
            if (confirm('我们需要您同意开启声音')) {
                this.open = true // ① 开启组件
            }
        }
    },
    mounted() {
        this.openComponent()

        msg.listening()

        msg.onReceived(() => {
            this.ring = true // ② 播放音效
        })

        msg.onRead(() => {
            this.ring = false // ③ 暂停音效
        })
    }
}
</script>
```
#### Vue3的写法
```javascript
<template>
    <easy-ring
        :open="open"
        v-model:ring="ring" // 注意：这里需要使用双向绑定 
        :src="yourAudio"
    />
</template>

<script setup>
import { ref } from 'vue'
import { EasyRingVueComponent as EasyRing } from 'easy-ring'
import yourAudio from '@/assets/yourAudio.wav'
import msg from 'msg'

const open = ref(false)
const ring = ref(false)
const openComponent = () => {
    if (confirm('我们需要您同意开启声音')) {
        open.value = true // ① 开启组件
    }
}

openComponent()
msg.listening()
msg.onReceived(() => {
    ring.value = true // ② 播放音效
})

msg.onRead(() => {
    ring.value = false // ③ 暂停音效
})

</script>
```
Vue2 DEMO项目地址：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-vue2
Vue3 DEMO项目地址：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-vue3

### 2）React组件形式
当作一般的React组件引入、使用即可。主要通过open、ring参数进行控制。

- ① 开启组件：将open参数设置为true。
***PS：这一步需要放到一个交互（比如：按钮点击）里进行触发，这是为了规避目前浏览器的限制。详细可参见下文 《关于open参数以及浏览器限制的解释》一章***
- ② 播放音效：将ring参数设置为true
- ③ 暂停音效：将ring参数设置为false

根据自己的需求和想要的效果，自行决定何时播放、暂停音效，只需在对应的逻辑代码下控制ring参数值的更新即可

PS: 另外，不要忘记传入一个setRing参数，它实际就是ring参数所对应的状态更新函数，easy-ring将用它来做一些状态自动更新的操作。这将让easy-ring使用起来更傻瓜、更自动化。

这里提供了一个可供参考的例子：

```javascript
import { useState, useEffect } from 'react'
import { EasyRingReactComponent as EasyRing } from 'easy-ring'
import msg from 'msg'

export default Demo = () => {
    const [open, setOpen] = useState(false)
    const [ring, setRing] = useState(false)

    const getMsg = () => {
        msg.listening()
        msg.onReceived(() => {
            setRing(true) // ② 播放音效
        })

        msg.onRead(() => {
            setRing(false) // ③ 暂停音效
        })
    }
    const openComponent = () => {
        if (confirm('我们需要您同意开启声音')) {
            setOpen(true) // ① 开启组件
        }
    }

    useEffect(() => {
        this.openComponent()
        this.getMsg()
    }, [])

    return (
        <div>
          <EasyRing 
            open={this.state.open} 
            ring={this.state.ring}
            setRing={setRing} //  注意：请记得传入这个参数
          ></EasyRing>
        </div>
    )
}
```
DEMO项目地址：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-react
### 3）js函数调用的形式
easy-ring提供了一个CommonEasyRing类，该类的实例有4个方法：open( )、ring( )、stop( )、close( )，分别用于开启组件、播放音效、暂停音效、关闭组件。

- ① 开启组件：open( )
***PS：这一步需要放到一个交互（比如：按钮点击）里进行触发，这是为了规避目前浏览器的限制。详细可参见下文 《关于open参数以及浏览器限制的解释》一章***
- ② 播放音效：ring( )
- ③ 暂停音效：stop( )
- ④ 关闭组件：close( )

下面是一个可供参考的例子：

```javascript
const myEasyring = new CommonEasyRing()  

button.addEventListener('click', () => {
    if (confirm('我们需要您同意开启声音 ｜ We need your consent to turn on sound')) {
        myEasyring.open() // ① 开启组件
    }
})

msg.listening()

msg.onReceived(() => {
    myEasyring.ring() // ② 播放音效
})

msg.onRead(() => {
    myEasyring.stop() // ③ 暂停音效
})

msg.onUnmount(() => {
    myEasyring.close() // ④ 关闭组件
})
```

## 关于音效
本组件有三种音效的使用方式：自定义音频源、自定义简谱音效、内置默认音效。可根据需求选择自己喜欢的方式。

这三种音效的播放优先级为: 自定义音频源 > 自定义简谱音效 > 内置默认音效

### 1）自定义音频源
将你的音频文件地址传给组件的src参数，即可使用自定义音频源。可以是网络资源或者项目内资源。

项目内资源采用的是绝对路径，因为使用相对路径容易在本地构建或者打包过程中出现问题，且作为第三方组件的easy-ring无法从你项目里的相对路径找到音频文件。

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
| ------ | ------- |
| 小星星（LITTLE_STAR） | '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -' |
| 两只老虎（TWO_TIGERS） | '1 2 3 1 - 1 2 3 1 - 3 4 5 - 3 4 5 - - 5 6 5 4 3 - 1 - 5 6 5 4 3 - 1 - 2 - .5 - 1 - - 2 - .5 - 1 - - - -' |
| 艾吉奥之家（EZIOS_FAMILY） | '.6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - 6 - 7 - 1. - 2. - 3. - - - - - -' |
| 天空之城（CASTLE_IN_THE_SKY） | '.6 .7 1 - - .7 1 - 3 - .7 - - - - .3 .3 .6 - - .5 .6 - 1 - .5 - - - - .3 .3 .4 - - .3 .4 - 1 - .3 - - - - 1 1 1 .7 - - .4 .4 - .7 - .7 - - - - -' |


### 3）内置默认音效
如果没有给src参数、musicText参数传递值的时候，组件会使用默认音效。目前的默认音效为《Ezio's Family》，这是游戏《刺客信条》的一首主题曲。

你也可以通过设置defaultMusic的值来更换默认音效曲目，目前支持的可选值为：'LITTLE_STAR'、'TWO_TIGERS'、'EZIOS_FAMILY'、'CASTLE_IN_THE_SKY'。

这实际上跟自定义简谱音效功能的实现使用了同一种技术（Web Audio API）。如果你有更好、更动听的旋律简谱，也欢迎在我的github或者博客里进行分享，后续会考虑将更多内置音效放到组件里。😊
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

## 感谢
自定义简谱音效功能的实现，要感谢张鑫旭大佬【https://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/ 】的启发 、以及王睿
大佬【https://www.jianshu.com/p/4f4c8bbd9775、https://www.zhanhu56.com/h5/music_box/、https://github.com/chchlsh/MusicBox 】MusicBox组件的功能支持👍，他们的灵感和帮助让这个组件有了更多拓展性和乐趣。

## 项目地址
https://github.com/xun19/easy-ring

如果你觉得本组件给你带来了帮助，欢迎来给个Star~ 😊 也欢迎提供宝贵意见


<a name="english"></a>
## - Document in English 

## Introduction
This is a **general, versatile** and **cool** front-end sound 🔔 component~

It can be used in many scenarios such as ringtones, message sounds, interactive sounds, and so on.

## Feature
- Multiple development environments. Available in **Vue, React, VanillaJS/Native JS (ES6+)**.
- Multiple styles for using. You can use this component as **a Vue Component , React Component, and even a JS Object**.
- Customizable audio source.
- Support for **using NMN（Numbered musical notation） to customize song sounds.**
- Built-in default sound effects.
- Loop and non-loop playing.

## params


| name | type    | required | default | remark                                                         |
| ------ | ------- | ------ | ------------------ | ------------------------------------------------------------ |
| open   | Boolean | √ | false  | Open the component. Setting it to 'true' is a prerequisite for using this component. |
| ring   | Boolean | √ |false  | Whether to start playing the sound effect. When set to 'false', the sound effect will turn off. |
| src    | String  | × | ''    |  The src of the audio file, which can be a network resource or an intra-project resource. Resources in the project need provide a absolute path. If you are not sure how to get the absolute path, please read the section "About Sound Effects - Custom Audio Source".You will find that it's very easy.             |
| loop    | Boolean | × |  true    |  Whether to loop or not.               |
|   defaultMusic  | String  | × |'EZIOS_FAMILY'    | The default sound effect which you can use  directly. Currently an optional value：'LITTLE_STAR' \| 'TWO_TIGERS' \| 'EZIOS_FAMILY' \| 'CASTLE_IN_THE_SKY'               |
|  musicText   | String  | × | ''    |     Customize the sound effects with useing a NMN（Numbered musical notation）string. Read the section "About Sound Effects - Custom NMN（Numbered musical notation） Sound Effects" for more details.          |
|  log   | Boolean  | × |true    | Whether to output the log.               |
|  ended   | Function  | × |function() {}   | A function which be called when the audio end playing ( This refers to the termination of each  playing round of the \<audio />, not the end of the component ).        |
|  setRing   | Function  | √(React) | -   | Required for React components. The value is the state-updating function corresponding to the 'ring' variable after using the React Hook 'useState'. For more details, please refer to the section "Use as a React Component"              |


## Installation
```javascript
npm i easy-ring
```
## Usage
Using easy-ring requires only 3 easy operations,
- ① Open the component.
- ② Play the sound effect. Lets the component start ringing.
- ③ Pause the sound effect. Quiets the component.

Different styles of use basically follow these 3 operations, but there are some differences in the details of use.

### 1）Use as an Vue Component
It can be imported and used as a general Vue component. It is mainly controlled by the 'open' and 'ring' parameters.

- ① Open component: Set the 'open' to true.
***PS: This step needs to be triggered in an interaction (e.g. button click), which is to circumvent the limitations of the current browser. See the chapter "Explanation of the open parameter and browser limitations" below for details.***
- ② Play Sound Effect: Set the 'ring' to true

- ③ Pause Sound Effect: Set the 'ring' to false

According to your own needs or effects, decide when to play and pause the sound effect, and control the update of the 'ring' parameter value under the corresponding logic code

Here are examples in Vue2 and Vue3 for reference:
#### Vue2

```javascript
<template>
    <easy-ring
        :open="open"
        :ring.sync="ring" // Note: Bidirectional binding is required here 
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
        openComponent() {
            if (confirm('We need your consent to turn on sound')) {
                this.open = true // ① Open the component.
            }
        }
    },
    mounted() {
        this.openComponent()

        msg.listening()

        msg.onReceived(() => {
            this.ring = true // ② Play Sound Effect.
        })

        msg.onRead(() => {
            this.ring = false // ③ Pause Sound Effect.
        })
    }
}
</script>
```
#### Vue3
```javascript
<template>
    <easy-ring
        :open="open"
        v-model:ring="ring" // Note: Bidirectional binding is required here 
        :src="yourAudio"
    />
</template>

<script setup>
import { ref } from 'vue'
import { EasyRingVueComponent as EasyRing } from 'easy-ring'
import yourAudio from '@/assets/yourAudio.wav'
import msg from 'msg'

const open = ref(false)
const ring = ref(false)
const openComponent = () => {
    if (confirm('We need your consent to turn on sound')) {
        open.value = true // ① Open the component.
    }
}

openComponent()
msg.listening()
msg.onReceived(() => {
    ring.value = true // ② Play Sound Effect.
})

msg.onRead(() => {
    ring.value = false // ③ Pause Sound Effect.
})

</script>
```
Vue2 DEMO：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-vue2
Vue3 DEMO：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-vue3

### 2）Use as a React Component
It can be imported and used as a general React component. It is mainly controlled by the 'open' and 'ring' parameters.

- ① Open component: Set the 'open' to true.
***PS: This step needs to be triggered in an interaction (e.g. button click), which is to circumvent the limitations of the current browser. See the chapter "Explanation of the open parameter and browser limitations" below for details.***
- ② Play Sound Effect: Set the 'ring' to true

- ③ Pause Sound Effect: Set the 'ring' to false

According to your own needs or effects, decide when to play and pause the sound effect, and control the update of the ring parameter value under the corresponding logic code

PS: Don't forget to provide a 'setRing' parameter, which is actually the state-updating function corresponding to the 'ring' parameter, and easy-ring will use it to do some automatic state-updating operations. This will make easy-ring more Fool-style and automated.

Refer to the following example:

```javascript
import { useState, useEffect } from 'react'
import { EasyRingReactComponent as EasyRing } from 'easy-ring'
import msg from 'msg'

export default Demo = () => {
    const [open, setOpen] = useState(false)
    const [ring, setRing] = useState(false)

    const getMsg = () => {
        msg.listening()

        msg.onReceived(() => {
            setRing(true) // ② Play Sound Effect.
        })
        msg.onRead(() => {
            setRing(false) // ③ Pause Sound Effect.
        })
    }
    const openComponent = () => {
        if (confirm('We need your consent to turn on sound')) {
            setOpen(true) // ① Open the component.
        }
    }

    useEffect(() => {
        this.openComponent()
        this.getMsg()
    }, [])

    return (
        <div>
          <EasyRing 
            open={this.state.open} 
            ring={this.state.ring}
            setRing={setRing} // NOTE: Remember provide this prop.
          ></EasyRing>
        </div>
    )
}
```
DEMO：https://github.com/xun19/easy-ring/tree/master/easy-ring-demo-react

### 3）Use with Javascript Function
easy-ring provides a CommonEasyRing class with 4 methods: open( ), ring( ), ,stop ( ) and close( ), which are used to open the component, play the sound effect, pause the sound effect and close the component.

- ① Open component: open( )
***PS: This step needs to be triggered in an interaction (e.g. button click), which is to circumvent the limitations of the current browser. See the chapter "Explanation of the open parameter and browser limitations" below for details.***
- ② Play Sound Effect: ring( )

- ③ Pause Sound Effect: stop ( )

- ④ Close the component: close( )

Refer to the following example:

```javascript
const myEasyring = new CommonEasyRing()  

button.addEventListener('click', () => {
    if (confirm('We need your consent to turn on sound')) {
        myEasyring.open() // ① Open the component.
    }
})

msg.listening()

msg.onReceived(() => {
    myEasyring.ring() // ② Play Sound Effect.
})

msg.onRead(() => {
    myEasyring.stop() // ③ Pause Sound Effect.
})

msg.onUnmount(() => {
    myEasyring.close() // ④ Close the component.
})
```

## About sound effects
This component has three ways to use sound effects: **Custom Audio Source**, **Custom NMN（Numbered musical notation） Sound Effects**, and **Built-in default sounds**. You can choose your favorite way according to your needs.

The playback priorities for these three sound effects are: **Custom Audio Source > Custom NMN（Numbered musical notation） Sound Effects > Built-in default sounds**

### 1）Custom Audio Source
Pass your audio file address to the component's src parameter to use a custom audio source.

Absolute paths are used because using relative paths is prone to problems during local builds or packaging, and easy-ring, as a third-party component, cannot find audio files from relative paths in your project.

Getting the absolute path is actually quite straightforward, using the following methods in a Vue or React environment (and possibly other build environments):
```javascript
import yourAudio from '@/assets/yourAudio.wav'
```
At this point, the yourAudio variable is the absolute path to your audio file, and you can pass this variable to the src parameter.

### 2）Custom NMN（Numbered musical notation） Sound Effects
Pass a string of NMN（Numbered musical notation） to the musicText parameter to use a custom notation sound effect.

For example, the following example shows how to use the sound effects of Little Star:
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
The value of the musicText parameter needs to be a string consisting mainly of numbers, "-", and spaced by a space.
| character | interpretation | remark                                                         |
| ------ | ------- | ------ |
| .1 ~ .7  | bass | Note that the preceding symbol is "."  |
| 1 ~ 7  | mediant |   |
| 1. ~ 7.  | treble |  Note that the preceding symbol is "." |
| -  | A paused unit | The more consecutive pause units there are, the longer the pause time. For example: "---" represents a pause of three units. |

Here are a few of the notation songs currently built into this component for reference:
| name |       musicText                                          |
| ------ | ------- |
| 小星星（LITTLE_STAR） | '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -' |
| 两只老虎（TWO_TIGERS） | '1 2 3 1 - 1 2 3 1 - 3 4 5 - 3 4 5 - - 5 6 5 4 3 - 1 - 5 6 5 4 3 - 1 - 2 - .5 - 1 - - 2 - .5 - 1 - - - -' |
| 艾吉奥之家（EZIOS_FAMILY） | '.6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - 6 - 7 - 1. - 2. - 3. - - - - - -' |
| 天空之城（CASTLE_IN_THE_SKY） | '.6 .7 1 - - .7 1 - 3 - .7 - - - - .3 .3 .6 - - .5 .6 - 1 - .5 - - - - .3 .3 .4 - - .3 .4 - 1 - .3 - - - - 1 1 1 .7 - - .4 .4 - .7 - .7 - - - - -' |

### 3）Built-in default sound effects
If no value is passed to the src parameter or the musicText parameter, the component will use the default sound effect. The current default sound effect is Ezio's Family, a theme song for the game Assassin's Creed.

You can also change the default sound track by setting the default Music value, the currently supported optional values are: 'LITTLE_STAR', 'TWO_TIGERS', 'EZIOS_FAMILY', 'CASTLE_IN_THE_SKY'.

This is actually the same technology used in the implementation of the custom notation sound function (the Web Audio API). If you have a better, more beautiful melodic notation, please feel free to share it on my github or blog, and consider putting more built-in sound effects into the component in the future. 😊
## Explanation of the open parameter and browser limitations

Most browsers do not currently support autoplay audio, which requires the user to actively trigger the interaction before it can be played. Therefore, the component adds an open parameter to (remind the developer) to do this.

We need to put the control logic of "setting the open parameter to true" in the event callback that triggers the user's interaction behavior, such as the click event of the button, the change event of the switch switch, and so on.

However, you can play down this process with some interaction design to improve the user experience. Like what:
- When the user clicks the "Login" button, set the open parameter to true in the click callback
- Set a sound switch and set the open parameter to true in the change callback
- When clicking on the navigation menu, set the open parameter to true in the click callback
- When clicking to open the message pop-up, set the open parameter to true in the click callback.

The above example is not very suitable for the situation after refreshing the page, in the case of refreshing the page, I personally think that the better way may be:
- Show a dialog asking for "Allow me to turn on sound effects?"

## Thanks
The implementation of the custom sheet music effect is thanks to the inspiration of Zhang Xinxu 【https://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/ 】and Wang Rui
who supports the MusicBox component 👍 【 https://www.jianshu.com/p/4f4c8bbd9775, https://www.zhanhu56.com/h5/music_box/, https://github.com/chchlsh/MusicBox 】, and their inspiration and help make this component more expansive and fun.

## github
https://github.com/xun19/easy-ring

If you think this component has brought you help, welcome to star and provide valuable advice ~ 😊