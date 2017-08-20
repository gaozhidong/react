# 增删改查 
## ES 2017
create-react-app 默认的 webpack 配置（位于 node_modules/babel-preset-react-app/index.js）默认开启了对 JS 最新语法的支持。

多新呢？浏览器还没支持的语法你都可以用……而且默认 不 支持 IE 8，只支持 IE 9 以上的版本。


## 虚拟DOM
[官方文档](https://facebook.github.io/react/docs/rendering-elements.html)

[中文文档](https://doc.react-china.org/react/docs/rendering-elements.html)


## 组件
[官方文档](https://facebook.github.io/react/docs/components-and-props.html
[中文文档](https://doc.react-china.org/react/docs/components-and-props.html)

class 和 extends 语法见[ MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

## props
组件不能修改props

## state
this.setState()方法改变state

## 生命周期
mount（挂载）、update（更新）和 unmount（移除）
[生命周期-官方文档](https://facebook.github.io/react/docs/state-and-lifecycle.html)
[生命周期-中文文档](https://doc.react-china.org/react/docs/state-and-lifecycle.html)
1. mount 

mount就是第一次让组件出现在页面中的过程。这个过程的关键就是runder方法。React会将render的返回值（一般是虚拟DOM,也可以是DOM或者null）插入到页面中。

这个过程会暴露几个钩子（hook）方便往里面添加代码
```js
1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()
```
2. update
mount之后，如果数据有任何变动，就会到update过程，这个过程有五个钩子：
```js
1. componentWillReceiveProps(nextProps)  我要读取props了
2. shouldComponentUpdate(nextProps,nextState) 请问要不要更新组件  true/false
3. componentWillUpdate() 我要更新组件了
4. render() 更新
5. componentDidUpdate() 更新完毕了
```
3. unmount

当一个组件将要从页面中移除时，会进入unmount过程，这个过程就一个钩子

```js
1. componentWillUnmount()  
```

## setState放在哪里
```bash
一般只在这几个钩子里 setState：

componentWillMount
componentDidMount
componentWillReceiveProps
componentDidUpdate

```




刷新页面数据就消失了