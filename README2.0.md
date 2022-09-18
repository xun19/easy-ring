### 优化背景
- 原来使用的vue-loader可能版本过旧了，导致打包的.vue文件不能在vue3中使用
- 同时发现了可以写出兼容性更好的方式，使用场景可以不局限于vue（可以在如react等其他框架内，甚至可以是纯js）
- 增加一些参数（loop），从而增加使用场景（如音效）

### 优化方案
- commonEasyRing类：函数调用式的使用风格，实例化后可以在任意架构下使用
- EasyRing for Vue: Vue组件式的使用风格（为了版本兼容性考虑，把原来.vue文件的模板语法写法，换成更通用的渲染函数写法）
- EasyRing for React: React组件式的使用风格