# macos-dd-cli
#### 快速管理你的物料

## Install
```
npm i macos-dd-cli -g
// or
yarn global add macos-dd-cli
```

## Usage
##### 1.登录和注销
```
dd-cli login
dd-cli logout
```
##### 2.下载物料
```
dd-cli download <name>

//默认下载到当前目录的packages下, 或许你可以自定义目录：

dd-cli download <name> -p lib
```
##### 3.发布物料
会自动读取当前目录下的package.json 、README.md 、screenshot.png文件。
```
dd-cli publish

// 默认编译文件夹是 dist, 可自定义

dd-cli publish --dist lib


```

## License
Everything is MIT.
