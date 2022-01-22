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

这是一个Vue铃声🔔组件~

## 组件使用


### 安装

```javascript
npm i easy-ring
```

### 加载

#### 1）全局使用

在vue-cli项目main.js上当作插件使用，即可直接在vue单文件组件使用

```javascript
// main.js
import EasyRing from 'easy-ring'
Vue.use(EasyRing)
```

```javascript
<!-- 直接使用，无需引入 -->
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

#### 2）import方式

在vue单文件组件里引入

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

### 组件生效
- 第一步. 开启铃声：将open参数设为true
- 第二步. 响铃：将ring参数设为true
- 第三步. 关铃：将ring参数设为false

PS：
- 开启铃声这一步，需要放到一个按钮下埋点进行触发（原因解释见下文 "关于open参数的解释"）。为了提升自己产品的使用体验，可以做到用户无感知，例如在登录时，用户点击“登录”按钮即可设置open参数为true
- 根据自己的需求自行决定何时响铃、何时关铃，将ring参数的更改放到对应逻辑下即可


### 组件参数

| 参数名 | 类型    | 默认值 | 说明                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| open   | Boolean | false  | 开启铃声 |
| ring   | Boolean | false  | 是否响铃 |
| src    | String  |  默认铃声    | 铃声音频文件地址               |

### 使用默认音效
若想使用默认音效，请在./main.js文件中引入默认音效
```
// main.js
require('easy-ring/easy-ring-default.wav')
```

然后将这段代码合并到你的vue.config.js配置中:
```
configureWebpack: {
        module: {
            rules: [
                {
                    test: /easy-ring-default\.(wav)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[ext]'
                    },
                },
          ]
        }
    }
```
需要添加这个配置的原因是，vue-cli默认会对所有打包的静态资源加上hash版本号，这样easy-ring就无法获取到你目录下的默认音频文件的地址。

加上这一项file-loader的配置后，easy-ring的默认音频文件就不会带上hash版本号，easy-ring就能找到它。

### 关于open参数的解释

因为当前多数浏览器不支持自动播放音频，需要用户自己主动触发播放音频才行。这一过程需要放在诸如click的交互事件里，因此我们需要一个按钮之类的东西来触发这一行为。

但是，你可以通过一些交互来设计这一行为，从而提升用户体验，甚至让用户对此无感知。例如：在登录时，在用户点击“登录”按钮时，在代码里设置open参数为true。

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