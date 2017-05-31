# mobx-share

一个关于mobx的研究和分享演示, 在线访问 [https://ckinmind.github.io/mobx-share](https://ckinmind.github.io/mobx-share)


## 技术栈
- React
- Mobx
- d3.js
- antd

## 项目说明
- 本项目是关于mobx的研究, 以ppt的形式展示mobx的各个api以及会遇到的问题
- 项目中的markdown使用的是 `prismjs` 和 `react-markdown`

## 内容说明
- **API**
  - mobx
    - `@observable`
    - `@action`
    - `autorun / when / reaction`
    - `@computed`
    - `intercept & observe`
    - 工具API: `extendObservable, toJS, isObservable`
  - mobx-react
    - `@observer`
    - `Observer`
    - `Provider / inject`
    - `componentWillReact`
    - `PropTypes`

- **Observable类型**
  - object
    - extendObservable
  - array
    - clear/replace/remove方法
    - slice/ toJS方法
    - arrays更新触发
  - maps
    - 两种定义的差别
    - 和ES6map的区别

- **问题**
  - 1. 关于清理autorun
  - 2. 关于触发视图更新的一种方案
  - 3. 关于store的传递 / 单例模式
  - 4. 关于细粒度拆分
  - 5. 关于跨组件触发更新的问题
  - 6. 在async/await中使用runInAction


## 版本更新
- **[v1.0]**: 初始版本，详细更新查看 [issue 2](https://github.com/ckinmind/mobx-share/issues/2)


## 如何开始
```js
> git clone https://github.com/ckinmind/mobx-share.git
> cd mobx-share
> npm install
> npm start
```