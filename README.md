## 目录结构说明
```
先 npm install
npm run dev	测试环境
npm run build 生产环境

图片引入improt img from "src"
less scss引入 import style from "src"
如果不用此类方式 将config/weboackBase.js下的options下的设置为 modules:false
```
## react规范说明
## 请遵守eslint书写规范

- 组件中处理事件（onClick, onChange等）的方法，命名以handler为前缀；只在组件其他方法中调用的方法，命名以_为前缀；反之需要作为props向子元素传递的方法，不需要_；

- 调用组件，如果需要传递多个属性，则分行显示；同理，import一个文件中多个对象时，同样分行显示；

- actions定义集中在reduxn内

- api接口定义请独立抽离, A.js:处理A页面里面的所有的js请求，B.js：处理B页面的所有请求；以名词+动词形式命名；全部大写，以_为分隔符，如：NAME_GET；

### css class
1. 使用中划线命名法，如：`indicator-text`
2. 公共组件命名规则：`comp__<compName>[__<compElement>]`，如 `comp__panel__tips` 表示 Panel 公用组件的 tips 块

### JS
1. 采用小驼峰命名法，如 `dialogVisible`
2. 对于 Boolean 类型的变量，灵活使用 is、shall、able（如 visible、clickable）等
3. 禁止采用 A、B、C 等不明所以的单词作变量名
4. 事件回调函数加上 'handle' 前缀，如 `handleCurrentRowChange`
5. 导入 src 下的模块时不要使用绝对路径，推荐使用项目中定义的别名 `@`，注意`@`后加`/`，如 '@/public' 编译后为'src/public'
6. 推荐使用 lodash 模块进行对象合并等操作，而非 es6，后者可能有浏览器兼容性问题
7. html 字符串作为变量值时，注意文本的可视化与 html 的结构化，提高阅读性
8. 禁止父组件通过 $refs 直接调用子组件方法、修改数据！

### 模块
```
  以_为分隔符；
  每个页面包括：页面容器container、页面组件components、页面相关actions、页面样式style

  1）container：页面主文件，与页面相关的component和action都会import到container中
  2）components：页面拆分的组件，以拆分的模块功能命名
  3）style：命名与components对应，并统一导入index.less，在container中引用
```


## 常用命令
```
| 命令            | 作用&效果          |
| --------------- | ------------- |
| npm run build   |  打包用于生产环境的代码 |
| npm run dev     | 打包开发环境的代码，未压缩 |
| npm run test   | 打包用于测试环境的代码，项目不同此处自行增加 |
```


## 目录结构说明
```
react 基建项目gutlap下载地址： http://10.0.71.125/xuansb/react-Infrastructure-PC.git
项目可选择UI库为： antd - antd-mobild - material-ui

├─ _test_ # 单元测试地址
├─ config # webpack配置资源地
├─ coverage # 测试用例
├─ node_modules # 利用npm管理的所有包及其依赖
├─ dev # 打包后文件
├─ public # 公共依耐资源
├─ src
	├─ http # 请求地址封装
	├─ images # 静态图片存放地区
	├─ page # 页面
	├─ publics # 公共资源
	├─ redux # redux配置文件
	├─ router # 路由存放地区
	├─ Bundles.js # 按需引入js
	├─ index.js # 入口文件
	├─ api # 处理各页面接口请求
├─ .babelrc # 启动依耐包
├─ packge.json # 启动配置
├─ karma.conf # karma配置区
├─ webpack.config.js # 开发环境配置
├─ webpack.production.config.js # 打包环境配置
```

## 单元测试
```
	使用npm run karma
	测试用例：参考地址: https://mochajs.org/#getting-started

	karma配置测试js的进出口，支持es6
	分别为：
```
```js
	files: [
      './src/http/test.js', //要测试代码的位置
      './_test_/*.js'//测试用例地址
    ],
    preprocessors: {
      './src/http/test.js': ['babel', 'coverage'], //es6编译测试代码的位置
      './_test_/*.js': ['babel'] //es6编译测试用例地址
    },
```	