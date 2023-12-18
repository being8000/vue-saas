# Vue 3 + TypeScript + Vite

## 基于Vue实现的Sass系统

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

### TODO 阶段3 Stage 3

- 完成左侧组件控制面板 develop left side Component Controller
- 完成右侧组件样式控制面板 develop
- 优化floating bar 样式， enhance Floating bar style
