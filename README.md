<!-- 请将以下一级标题设为项目名称 -->
# 永辉 React 项目脚手架

![node version][node-version-img] ![npm version][npm-version-img] ![webpack version][webpack-version-img] ![react version][react-version-img]

## 开发

### 开发前准备

> ⚠️ 为保证环境一致，请使用 `node@10.14.2` / `npm@6.4.1`，并使用永辉 npm registry `http://npm.yonghui.cn/repository/npm-group/`


> ⚠️ 如果要集成到 itwork 容器发布，请将 `chart/RENAME-TO-YOUR-PROJECTNAME/Chart.yaml` 中的 `name` 值配置为你的项目名称；并修改 `chart` 目录，将 `RENAME-TO-YOUR-PROJECTNAME` 目录名更新为你的项目名称

推荐使用 [nvm][nvm-link] 进行本地 node 版本管理，[nrm][nrm-link] 进行本地 npm registry 管理：

```bash
npm install -g nvm nrm

nvm install 10.14.2
nvm use 10.14.2

# set v10.14.2 as default node version
# nvm alias default v10.14.2

nrm add yonghui http://npm.yonghui.cn/repository/npm-group/
nrm use yonghui
```

### Scripts

```bash
# dev
npm start
npm run dev

# build for specific environment
npm run build-dev   # 以 production 模式打包出开发环境（API）的包
npm run build-test  # 以 production 模式打包出测试环境（API）的包
npm run build-prod  # 以 production 模式打包出生产环境（API）的包

# lint
npm run lint
```


## 代码与 commit message 规范

项目采用 [Husky][husky-link] 结合 [eslint][eslint-link] / [commitlint][commitlint-link] 进行代码与 Git Commit 规范性强约束，在 commit 前会自动运行 eslint 并尽可能自动修复不规范的代码，同时检查 commit message 是否规范。**请严格遵循 eslint / commitlint 规范约束**，否则将不能进行代码提交。

⚠️ 已知 sourceTree 默认不支持 git hooks，请通过以下方法开启（参考 [SourceTree and pre commit hook][SourceTree-and-pre-commit-hook-link] ）：
1. 打开 `SourceTree -> Preferences -> Git`
2. 在 `Git Version` 块，点击 `Use System Git` 使用系统 git

### React/ JavaScript

请参考 [Airbnb JavaScript Style Guide][airbnb-codestyle-link]

### Commit Message

参考 [Conventional Commits][convertional-commits-link]，与 [Angular Commit Message Guidelines][angular-commit-message-guidelines-link]，Commit Message 格式为：
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

示例:
```
feat(login): add oauth login method

1. oauth redirect url
2. exchange token with oauth code
```

type 可选：
* **build**: 本次提交改变到了打包流程
* **ci**: 本次提交影响到了 CI 脚本
* **docs**: 本次提交更新了文档
* **feat**: 引入了新的功能
* **fix**: 修复 bug
* **perf**: 提升性能
* **refactor**: 既不是新增功能也不是修复 bug
* **style**: 样式修改
* **test**: 测试用例修改

### CSS / LESS

1. 使用中划线命名法，如：`indicator-text`
2. 公共组件命名规则：`comp__<compName>]`，如 `comp__panel` 表示 Panel 公用组件
3. 组件内部样式请置于组件根 class 内部（局部作用）

### 其他约束

1. 推荐使用模块化暴露内部功能（index.js 中导出必要功能）
2. 公共组件请在同级目录书写 `README.md` 文档
3. 模块导入推荐使用 `webpack alias`，参考 `webpack.config/base.js`


## 目录结构说明

```
.
├── Dockerfile                        # 发布相关 docker image 配置
├── README.md
├── babel.config.json                 # babel 配置
├── chart                             # 发布相关 itwork 配置
│   └── space-display-front
│       ├── Chart.yaml
│       ├── README.md
│       ├── templates
│       │   ├── _helpers.tpl
│       │   └── deployment.yaml
│       └── values.yaml
├── default.conf                      # nginx 配置
├── env-config                        # 项目环境配置
│   └── dev.js                        # dev 环境
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.jsx
│   ├── App.less
│   ├── components                    # 公共组件
│   │   ├── HOC                       # 公用高阶组件
│   │   │   └── index.js
│   │   ├── business                  # 公用业务组件
│   │   │   └── index.js
│   │   └── ui                        # 公用 UI 组件
│   │       └── index.js
│   ├── http                          # HTTP 请求封装
│   │   ├── api-config.js             # api 配置
│   │   ├── client.js                 # http client 封装
│   │   ├── index.js
│   │   ├── request.interceptors.js   # axios 请求拦截器集
│   │   └── response.interceptors.js  # axios 响应拦截器集
│   ├── images
│   │   └── logo.svg
│   ├── index.jsx
│   ├── route                         # 路由配置
│   │   └── index.js
│   ├── services                      # 服务封装
│   │   └── index.js
│   ├── redux                         # redux
│   │   └── index.js
│   ├── styles
│   │   └── base.less
│   └── utils                         # 工具集
│       └── index.js
└── webpack-config                    # webpack 配置
    ├── base.js
    ├── dev.js
    └── prod.js
```


## CI 自动化构建

项目采用 gitlab ci 自动构建，主要分为 4 个 stage：

0. **info**：手动触发，打印 node、npm 等环境
1. **install**：手动触发，安装 package 依赖，当有依赖更新时请手动触发，否则可能编译失败
2. **build**：自动触发，根据环境（分支名称）打包
3. **deploy**：自动触发，构建 Docker Image，输出版本号

> build 时 API 环境与分支名称关系：
> - `prod` 环境对应 `master 分支`、`tags`、`release-* 分支`
> - `test` 环境对应 `test-* 分支`
> - `dev` 环境对应 `dev-* 分支`


## 公共组件

<!-- 请将组件说明文档链于此处 -->



[node-version-img]: https://img.shields.io/badge/node-v10.14.2-brightgreen?style=flat-square&logo=node.js
[npm-version-img]: https://img.shields.io/badge/npm-v6.4.1-brightgreen?style=flat-square&logo=npm
[webpack-version-img]: https://img.shields.io/badge/webpack-v5.1.0-brightgreen?style=flat-square&logo=webpack
[react-version-img]: https://img.shields.io/badge/react-v16.13.1-brightgreen?style=flat-square&logo=react

[nvm-link]: https://img.shields.io/badge/node-v10.14.2-brightgreen
[nrm-link]: https://github.com/Pana/nrm
[airbnb-codestyle-link]: https://github.com/airbnb/javascript
[convertional-commits-link]: https://www.conventionalcommits.org/en/v1.0.0/
[husky-link]: https://github.com/typicode/husky
[commitlint-link]: https://commitlint.js.org
[eslint-link]: https://eslint.org
[SourceTree-and-pre-commit-hook-link]: https://medium.com/fantageek/sourcetree-and-pre-commit-hook-52545f22fe10
[angular-commit-message-guidelines-link]: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
