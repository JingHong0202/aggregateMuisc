<!--
 * @Author: your name
 * @Date: 2020-06-29 18:24:47
 * @LastEditTime: 2020-12-02 14:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\README.md
-->
# aggregate-Music
> 技术栈： 
> > Front： D2Admin Vue2.6 VueRouter Vuex element-ui axios  
> > back:  Egg  
> > database:  Mysql  
> > cache:  File-cache 

## Dir
- app/public/music-static Front
- docker*  docker配置文件
- data 数据储存文件

## install
- > 环境： node10+ mysql  
- 更改 config/config.prod.js
- > domain 服务器域名
- > mysql等配置
- 更改 config/config.default.js
- > mailer 邮件配置 （影响注册账号找回功能）
- install node > 10
- install mysql any
- 最后 npm install && npm run start

### 一键安装
- > 前提条件安装docker
- 执行 docker-compose build --pull && docker-compose up -d
