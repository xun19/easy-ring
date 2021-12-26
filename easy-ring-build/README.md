# ⚙easy-ring-build

### 前言
本项目用于构建打包、发布easy-ring组件的npm包


### 本地调试
开启dev-server
```
npm run dev
```
Notice: 文件发生更新需要重启dev-server。后续通过nodemon实现自动刷新

### 打包发布

构建生产包：
```
npm run build // 打包结果为./easy-ring目录
```

发布
```
npm login // 登录npm
cd ./easy-ring  // 进入./easy-ring目录下
npm publish
```
