# react-todolist
Reactjs版的todolist，仅用于转转前端运营组内分享

## 关于webpack配置

webpack 是一个模块打包工具。它使得模块相互依赖并且可构建等价于这些模块的静态资源。相比于已经存在的模块打包器（module bundler），webpack的开发动机是实现代码分包（Code Splitting ）和通过模块化完成代码的无缝集成。webpack可以根据项目需求合并代码，并且支持按需加载。

参考: 

* (一小时包教会 —— webpack 入门指南)[http://www.w2bc.com/Article/50764]
* (webpack常用配置总结)[http://www.cnblogs.com/zhengjialux/p/5861845.html]



## 关于组件创建
* 无状态组件——不解析this，无state，只通过props来传递数据并进行组装
* React.createClass——尽量不用，除非必须用到mixins（即使用到了，也可以用React.Component的HOC（Higher Order Components）来取代
* 尽量采用React.Component的形式来定义一个有状态组件

## 不错的教程

* 阮一峰老师写的 (《React 入门实例教程》)[http://www.ruanyifeng.com/blog/2015/03/react.html]
* 极客学院的React中文教程 [http://wiki.jikexueyuan.com/project/react/]