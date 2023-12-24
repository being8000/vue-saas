# 低代码，高性能自定义装修商城系统

> [外网点击预览](https://vue-sass-iwzh.vercel.app/)

> 境内地址暂未配置
## 主要功能

- 容器的添加，修改，删除，以及复制
- 可在容器中添加自定义组件
- 可动态编辑容器等自定义组件的基础样式
- 可动态配置开发自定义组件，并且可灵活配置对应组件的属性编辑面板
- 可拖拽根容器排序
- 目前提供4个基本测试组件

## 后续功能

- 开发定制初套商城组件模型，以及对应的属性编辑器开发
- 开发模拟活动编辑也，活动组件
- 开发商品列表页，商品组件等
- 开发商城预览功能
- 开发模板保存，导入功能


## 基于Vue实现的SaaS系统

### 2023-12-26

1. added Virtual Dom Basic node render
2. added component add neibornode feature
3. added component delete feature
4. added "add neighbor" and "delete" features history storage and undo feature

### 2023-12-27

1. change design pattern to composition patter.
2. revamp code, refactor all code
3. fixed history operation bugs
4. added copy feature

### 12/18/2023  Done

1. develop component select feature
2. develop component toolbar.
3. enhance component type. limit component type

#### Component Type

- Root - Level 1 Component
- RootContainer - Level 2 Component
- Container - Level 3 Component
- CustomComponent - Level 4 Component

> **Root** <br>
> 根节点， 只允许新增 RootContainer <br>
> **RootContainer** <br>
> 根容器， 允许添加 子容器 或者 设置为自定义组<br>
> **ChildContainer** <br>
> 子容器， 允许 添加一个自定义组件<br>
> **CustomComponent**  <br>
> 自定义组件，为最后一级，无法新增下级容器

### 12/18/2023  Done

- 使用媒体模式或者中间件模式或者订阅者模式，来进行主Application 和 Floatingbar 和 StylePannel之间进行通信

- 12/18 结果，引用了观察者模式，实现了 不同组件之间的同行，
- 12/18 应用了状态模式来控制主面板的选中，取消选中，以后等其他状态。

### Done 阶段3 Stage 3

- 完成左侧组件控制面板 develop left side Component Controller
- 完成右侧组件样式控制面板 develop
- 优化floating bar 样式， enhance Floating bar style

### Done 12/20/2023 阶段3
- 确认属性面板和组件直接得关系，如何在两则之间建立联系，交互，如何
- 开发属性面板，定义好 属性类型，需要开发一个动态表单来动态设置组件属性


### 12/23/2023
- 开发vue插件 给绑定的组件新增生命周期和方法来和主应用进行通信。这是一个理想的idea. 
