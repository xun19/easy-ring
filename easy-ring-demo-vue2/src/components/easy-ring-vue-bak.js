import { h, createElement } from 'vue'

/*
  h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。
  这个名字来源于许多虚拟 DOM 实现默认形成的约定。一个更准确的名称应该是 createVnode()，但当你需要多次使用渲染函数时，一个简短的名字会更省力。
*/

/*
    这些框架自身在构建vdom的时候就是基于渲染函数。只不过把这层底层暴露出来给开发者也能使用了
*/

// 第一步：创建vnode // h函数实际上是创建了一个vnode。还得把vnode进行挂载。h函数还不是渲染函数

// vnode不能写在外面？

// const vnode = h( // 这种传参方式挺烦的，不能直接传一个对象么。。 // h函数实际上是创建了一个vnode。还得把vnode进行挂载
//   'div', // type
//   { id: 'foo', class: 'bar' }, // props
//   [
//     /* children */
//   ]
// )

// 第二步：声明渲染函数

export default {
  name: 'EasyRingVue',
  data() {
    return {
      msg: 'hello'
    }
  },
  render() {
    // 渲染函数实际上是就是组件的一个属性/方法。到了这一层，实际上已经跟react一摸一样了（都有一个render方法，里面都是return 节点）。
    // 只不过react倾向于写jsx，而vue倾向于写template。这也不过是语法上的不同罢了
    // 本质上它们都是把组件当成了一个（带render方法的）对象，这才是它们组件的本来面目
    // 如果到了这一层，觉得这种写法更灵活自由的话，就可以转向react了。
    return createElement('div', {
      id: 'testRender'
    }, [
      createElement('span'),
      createElement('a')
    ])
  }
}