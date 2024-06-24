# hnsw-uniapp

`uni-app`框架示例，一套代码，同时发行到iOS、Android、H5、小程序等多个平台，请使用手机在下方扫码快速体验`uni-app`的强大功能。[官方文档](https://uniapp.dcloud.net.cn/)

### 通过 vue-cli 创建

```
npm install -g @vue/cli
```

#### 创建uni-app

**使用正式版**（对应HBuilderX最新正式版）

```
vue create -p dcloudio/uni-preset-vue my-project
```

**使用alpha版**（对应HBuilderX最新alpha版）

```
vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project
```

此时，会提示选择项目模板，选择 `hello uni-app` 项目模板，如下所示：


创建好后，进入项目目录
```
cd my-project
```

执行该命令运行到 h5 端
```
npm run dev:h5
```