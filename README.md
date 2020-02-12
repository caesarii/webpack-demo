
### 使用指南
本文档是 webpack 文档阅读指南

webpack 的文档分为 guides/concepts/configuration/API 等几个部分, 可读性以此降低. 该文档的内容以官方文档英文版为基础, 与中文版也基本对的上.

本文档将 guides/concepts/configuration 内容按主题划分, 聚合在一起, 提供针对每篇文档的概述

当前已完成 guides 的阅读指南

配合 demo 使用

主题列表
* getting started: 基础, 入门
* entry
* output
* loaders
* plugins
* modules: 模块化
* development: 开发相关
* production: 生产环境相关
* developer: 打包工具开发相关
* 其他: 暂时忽略的内容

webpack名词解释
不明白的时候再回来看.

chunk: chunk 有多种. 一是 entry chunk, 由 entry point 决定入口, 然后根据模块的依赖关系确定所有模块, 最终生成一个 bundle, entry属性的 key 就是 chunkName. 二是非 entry chunk, 即不是由 entry point 定义的 chunk, runtimeChunks, splitChunks 等都可以生成 chunk.

runtime: 是指打包结果 bundle 中包含的必要的 webpack 源码

vender: 是指第三方库打包生成的 bundle

### getting started



**concepts-why webpack**
webpack 历史

**concepts-concetps**
概念理解: entry output plugin loader

**guide**
以下内容是一个简单而完整的基础 webpack 项目, 建议完成练习, 不解处不做深究
* installtion: 安装 webpack
* getting-started: 最简 webpack 项目
* asset management: 如何加载 css/images/fonts等, 基本配置
* output management: 基本的 output 配置, 三个插件: html-webpack-plugin, clean-webpack-plugin, webpack-manifest-plugin
* development: 设置 mode, 启用 source map, 使用 dev tool

### entry
**guides-advanced entry**
**config-entry**
**concepts-entry**

Q:
* 哪些配置会新增 bundle: entry point, code splitting, plugins like **

### output
**config-output**
* filename / chunkFilename / path / publicPath

**guides-publicPath**

**guide-caching**
缓存问题是指对打包结果进行部署时, 如果打包文件名字不变而内容发生了变化, 可能会导致服务器或浏览器仍然使用缓存的旧文件. 如果每次打包都生成新文件名但内容可能不变, 这又可能导致服务器或浏览器的缓存失效, 造成资源浪费

1. 使用 contentHash 来定义 output.filename
这样每次内容发生变化时文件名就会发生变化

但问题在于不修改时进行打包 contentHash 也会发生变化(坑爹), 这是因为打包结果中包含了一些 webpack runtime 代码或 manifest, 这些代码每次都会发生变化(??), 所以现在需要将这些代码进行 code splitting

2. 抽取 webpack runtime 和 vendor
* 配置 `optimization.runtimeChunk: single` 可以将 webpack runtime 抽取为单独的 chunk(所以这也是一种 code splitting)

* 配置 optimization.splitChunks 来抽取第三方库代码

3. module.id 问题
在进行了 runtime 和 vendor 抽取之后, 如果新增一个模块, 预期是 main bundle 将发生变化, runtime 也因为新模块的加入而发生变化, 而 vendor 不变, 但实际上 vendro 也会发生变化, 这是因为 module.id 是基于解析顺序增量的, 所以 vendor 的 id 可能会发生变化
解决方法: 使用 optimization.moduleIds 来配置 module.id 的生成算法. hashed 已废弃, 使用 deterministic 代替

**concepts-output**

**manifest**
什么是 webpack runtime / manifest / vendor

### loaders

**concepts-loaders**

### plugins
**concepts-plugins**
**config-plugins**


### modules
**guides-shimming**
shimming 用于处理非 ES module/CommmonJS/AMD 模块的依赖, 比如全局变量依赖等

* 预置全局变量
场景: 第三方库可能以非模块化的依赖全局变量, 比如 jQuery $, lodash _
可以用 webpack.ProvidePlugin 将依赖的模块声明为全局变量, 在这种情况下全局依赖依赖并没有打包到独立的 chunk, 而是在遇到该变量时就自动引入对应模块

也可以按需将依赖中的个别模块设置为全局变量, 需要提供数组形式的模块路径, 这种配置下 chunk 明显变小

* 预置个别变量
某些模块中可能隐含了某个变量就是某个值的依赖, 而当前这种依赖关系已经不成立了
比如在非模块代码中顶层代码的 this 应该指向 window, 但在模块化的代码中不成立了, 这就需要预置 this 的值
使用 imports-loader 可以预置个别变量的值, 该 loader 的作用为指定文件引入指定变量

*使用 imports-loader 修改模块的 this 后再 import 其他模块会编译失败, 所以预置 this 应该是个馊主意*

* 将模块全局导出
全局导出是指将某个模块中未 export 创建为全局变量, 然后就可以像变量导出了一样来引入

* 加载 polyfill
使用 polyfill 的最佳实践是同步加载所有 polyfill 不考虑造成的 bundle 体积问题

如果不在意上述最佳实践就可以将 polyfill 作为单独的 bundle, 在 index.html 条件性的加载该 bundle

**concepts-modules**
什么是 webpack module
webapck module 与 nodejs module / ES module 的关系



**module resolution**
什么是 resolver, enhanced-resolve

**concepts-dependency graph**

**config-module**
* module属性: 配置如何处理项目中的不同 module
* rules属性: 配置 module 如何创建
* Rule: 
    * Rule 就是如何处理 module 的一条规则, 包含条件和输出两部分
    * 条件定义了 Rule 要应用的目标文件, 也就是 resource, resource 是目标文件的绝对路径, test/include/exclude/resource(忽略) 这些属性跟 resource 进行正则匹配, 从而确定是否适用当前规则
    * 输出定义了要对条件匹配的文件进行的操作, 输出的值是要使用的 loader 和对 loader 的配置, 这些值包含在 loader(忽略), options, use 属性中
    
* Rule.test: 语义是匹配, 其值是 Condition
* Rule.include: 语义是匹配,其值是 Condition
* Rule.exclude: 语义是不匹配, 其值是 Condition
* Rule.use: 其值是 UseEntry[]

* Condition: 其值可以是 string / RegExp / function / Condition[] / { test/include/exclude: Condition }

* UseEntry: { loader: string; options: object; }

**config-resolve**
resolve 属性: 配置模块解析
module 属性更常用, 但 resolve 是 module 属性的基础

extensions: 配置一个扩展名列表, 在import 时如果省略扩展名将按照该列表的顺序进行解析
alias: 为路径创建别名,以方便import, alias 解析优先于其他模块解析规则
resolveLoader: 如何解析 loader module
modules: 指定模块解析时要查询的目录列表
要理解 modules 属性需要了解 webpack 的模块解析规则, 以下是 nodejs 的模块解析规则, 这里的 modules 配置就是 loadNodeModules 时查询的目录

```js
以 import 'X' 为例
1. X 是 nodejs 内置模块, done or next (webpack module 应该没有这一步, 这一步应该是 alias)
2. X 是绝对路径, done or next
3. X 是相对路径
    3.1 loadAsFile(X) done or next
    3.2 loadAsDir(X) done or next
4. loadNodeModules(X) done or next
5. not found

loadAsFile(x): 尝试将 X 作为文件载入
    假定 extensions = ['.js', '.json'], 依次将扩展名带入, 即尝试将 'X', 'X.js', 'X.json' 作为文件载入
 
loadAsDir(X): 尝试将 X 作为目录载入
    1. 如果 X/package.json 存在实现尝试将 X 作为库, 使用 M = package.main/X 作为路径尝试 loadAsFile(M) 和 loadIndex(M)
    
    2. 尝试 loadIndex(X)
    
loadIndex(X): 将 x 视为目录, 解析其中 index, 根据 extensions 依次尝试, 'X/index.js', 'X/index.json' 

loadNodeModules: 在 node_modules 中查找 (webpack 中应该查看 resolve.modules 指定的目录)

```

### development


**guides-build performance**
包含一些构建/编译性能优化技巧
带 todo 标签的表示需要进一步解释

*同时适用于开发环境和生产环境的技巧*
* 更新到 webpack 最新版
* 缩小应用 loader 的文件范围: include 的例子
* loader 和 plugin 都需要启动时间, 越少越好
* 模块解析相关的优化: todo
* 使用 DllPlugin: todo
* 尽量减小打包结果的体积
* 使用 thread-load 将 loader 分流到 worker pool: todo
* 使用 cache-loader 启用持久化缓存, 使用 package.postinstall 清空缓存: todo
* 优化自定义 plugin 和 loader 的性能

*适用于开发环境的技巧*
* 增量编译: 使用 watch mode
* 内存编译: webapck-dev-server/webpack-hot-middleware/webpack-dev-middleware 等工具在内存中编译和 serve 资源, 不会输出到磁盘
* stats.toJson: todo
* devtool: 几个选项的区别, 最佳是 cheap-module-eval-source-map
* 避免使用生产环境才必要的工具
    TerserPlugin: 压缩和混淆
    ExtractTextPlugin
    [hash]/[chunkhash]
    AggressiveSplittingPlugin
    AggressiveMergingPlugin
    ModuleConcatenationPlugin
* 最小化 entry chunk: 
* 去掉优化: webpack 会对输出结果的体积和加载进行优化, 这只适用于小型项目, 对于大型项目应该关闭
* 去掉打包结果中的路径信息: `output.pathinfo: false`
* node 8.9.10 ~ 9.11.1 版本存在性能问题应避免使用
* ts-loader 优化: 开启 transpileOnly 和 experimentalWatchApi 选项

*适用于生产环境的技巧*
* 多编译时: 使用 parallel-webpack 和 cache-loader
* 考虑是否真的需要 source map
* 可能会影响性能的工具问题
    babel: 尽量减少 preset 和 plugins
    typescript
    saas

**guides-HMR**
HMR 就是在运行时替换模块, 无需刷新浏览器

基于 webpack-dev-server 使用 HMR
* 配置 devServer.hot, 添加 HotModuleReplacementPlugin 插件
* 修改引用热更模块的宿主模块, 使其在模块热更时接受更新
* 尽管宿主模块可以接收到新代码, 但在初始时使用热更模块的代码组件现在仍在使用旧版, 需要手动卸载旧组件挂载新实例
* 配合 react-hot-loader, vue-loader 实现视图组件的自动热更

css 的热更
* style loader 基于 module.hot.accept 实现了 css 的热更, 会将修改更新到 <style> 标签, 不需要额外配置


**concepts-HMR**

**API-HMR**

**config-devServer**
dev server

**config-devTool**
配置source map 如何生成


### production
**guides-code splitting**
什么是 code splitting: 如果不进行额外的配置, wepback 会将所有代码打包到一个 bundle, 所谓 code splitting 就是分别将代码打包到多个 bundle. 

code splitting 的目的有多种, 手段也有多种.

1.entry points
通过配置多个 entry points 就可以生成多个 bundle.
但这种方式存在问题, 如果不同 entry points 之间用重复依赖, 这些会被重复打包到各个 bundle

2. SplitChunksPlugin
使用 SplitChunksPlugin 可以将不同 entry points 依赖的公共模块提取出来
提取出来的公共模块可以放置到某个 entry 的 bundle 中, 也可以生成一个新 bundle

SplitChunksPlugin 的提取规则以及配置需要参考 **plugin-SplitChunksPlugin**, 结合其中 Examples 理解

默认情况下(不配置splitChunks)该插件只影响按需加载的模块, 如果模块同时符合以下条件会被抽取为 chunk
* 该模块在多个模块之间共享, 或者模块来自 node_modules
* 模块大于 30kb, before min+gz
* 在按需加载模块时并发加载的模块数 <=5 : 解释一下, 假定原先按需加载一个模块a, 现在从 a 的依赖中抽取了若干公共模块, 那现在加载 a 时, 抽取这些公共模块是跟 a 并发加载的(原来是加载完了 a 之后才开始加载的), 所以这些公共模块+a的并发总量要小于某个值
* 在页面初始加载时并发加载量 <= 3
以上规则务必结合 Default: Examples 1/2 理解

3. dynamic import
使用 ES 动态 import 语法引入的模块也会被创建为独立的 chunk
该语法需要 babel 插件支持

4. webpack prefetch/preload
通过 webpack prefetch/preload 引入的模块也会输出到独立的 chunk, 通过 <link> 引入
了解即可

这里提到了 *bundle 分析*, 重要. 待深入

这里用到了 chunkFilename, 参考 **config-output**

**guides-lazy loading**
在 **guides-code splitting** 中实现了模块的动态引入
这里所说的懒加载将动态引入与用户交互结合在一起, 在特定交互时动态引入模块

rect/vue 的懒加载



**guides-tree shaking**
tree shaking 是指删除 dead-code. dead-code 特指被 export 但没有被 import 的代码, 所以依赖于 ES module 语法

webpack 如何实现 tree shaking
* 识别未使用的 export: webpack 内置识别未使用的 export 的能力, 配置 `optimization.usedExports` 即可在打包结果结果中标识出 未使用的 export, 注意只是标识, 并未删除
* 标记无副作用: 
    虽然已经识别出了未使用的 export, 却不能直接删除, 因为有些代码尽管没有 import 却是具有副作用的代码, 删除会导致问题.
    明显 webpack 不具备识别哪些模块具有副作用的能力, 这就需要手动标记, 在 package.json.sideEffects (或者 module.rules.sideEffects)可以标记项目中的哪些文件有副作用, 典型的有副作用的文件是 .css
    
* 在识别出未使用的 export, 并排除其中有副作用的文件后, 剩下就是可以删除的 dead-code, 删除的方式就是设置 `mode: production`

实现 tree shaking 的注意事项
* 只有使用 ES module 的代码才能 tree shaking
* @babel/preset-env 默认会将 ES module 转化为 CommonJS 模块, 所以需要关闭该配置 https://babel.docschina.org/docs/en/babel-preset-env#modules

**guides-production**
由开发环境到生产环境需要进行哪些配置

1.添加生产环境配置文件, 抽取开发环境和生产环境公共配置, 并用 webpack-merge 合并

`mode: development`  与 `mode: production` 的区别
* production 启用了 TerserPlugin

2. 分别为两个环境添加 npm scripts

3. 配置 `mode: production`, webpack DefinePlugin 会自动将 mode 设置到 process.env.NODE_ENV, 所有 src 中的文件都可以访问到该值
参考 **guides-environment variables**
参考 webpack DefinePlugin

4. 配置 `mode: production` 后会开启代码压缩(TerserPlugin)/改变 devtool 选项/压缩css
更多 development 与 production 的区别参见 **concepts-mode**

**guides-environment variables**
* 这个功能叫环境变量非常具有误导性, 因为它跟环境变量无直接关系, 环境选项的用途是用于从 CLI 向运行时的配置文件传递参数
* 通过命令行参数 --env 传入环境选项: `webpack --env.arguments=xxx`
* 将 cofig 修改为函数, 通过函数参数接受环境变量

webpack 环境变量与操作系统的环境变量(以下简称环境变量)不是一回事. 

1. 在 nodejs 中 `process.env` 的值就是操作系统环境变量, 其值可以通过 node 进程中通过赋值进行修改, 但这种修改不会影响操作系统的环境变量配置也不会影响其他 node 线程. 
对环境变量的修改要通过操作系统命令来进行, 而且不同平台有差别, cross-env 这个库提供兼容各平台的设置命令, 使用方式如下
```js
  "dev": "cross-env NODE_ENV=development webpack-dev-server,
  "build": "cross-env NODE_ENV=production webpack --progress,
```

2. process.env.NODE_ENV 是一个很多库都会依赖的自定义变量, 用来表示环境(development or  production), 库会根据其值改变行为. 但是其值不能在 webpack.config.js 中通过赋值修改(why: 在config 中修改时当前 node 进程的 process.env, 不影响编译时???), 但在 webpack 中设置 mode 后无论是 development 还是  production, DefinePlugin 都会将其值设置到 process.env.NODE_ENV, 所有 src 中的文件都可以访问到该值. (这里仍有一些不清楚的地方)


打印一下就会发现没有 process.env.NODE_ENV 这个变量. 因为这是一个用户自定义的环境变量, 很多库都会基于其值(development or production)改变库的行为

**concepts-targets**
**config-target**




**config-optimization**
splitChunks

**config-external**

### 其他
**concepts-configuration**: 这个 configuration 是指 webpack配置对象, 而不是某个属性的配置

**guides-typescript**
**guides-PWA**
**guides-asset modules**
**guides-vagrant**
**guides-content security policy**
**guides-dependency management**
**guides-integration**


### developer
**guides-scaffolding**
**library**

## concepts
### entry points
optimization.splitChunks
CommonsChunkPlugin
### output  
publicPath
    
### loader
write a loader
    
### plugins

