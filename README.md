
# writing a loader

./loaders 目录中是 style-loader 和 css-loader 的源码, 要直接引用本地 loader 首先要对两个 loader 进行 `npm install` 和 `npm run build`, 打包出 dist

三种本地开发测试方法
* 匹配单个本地loader: module.rule.Rule.use.loader 直接指定路径
* 匹配多个本地loader: 