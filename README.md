# LLM情报机器人

> 作者:`@SouthAki`
>
> 开源协议:`GPL-3.0`

目标:

- [ ] H5页面,微信小程序,Android APK,IOS IPA,Windows EXE多端适配(2025,优先级低)
  - [x] - _H5页面_:`http://localhost:8081`
  - [x] - _微信小程序_
  - [x] - 管理后端页面
  - [x] - _后端_
  - [ ] - ...
- [ ] **主要功能**:(优先级,先行H5)
	- [x] - _订阅管理_:轻松管理和跟踪用户关注的Github仓库.
	- [x] - _更新检索_:自动检索汇总订阅仓库的最新动态,包括提交记录,问题,和拉取请求.
	- [ ] - _通知系统_:通过电子邮件的方式,实时通知订阅者项目的最新进展(**变更为Telegram**)
	- [x] - _报告生成_:基于检索到的更新生成详细的项目进展报告,支持多种格式和模版,满足不同需求

![llmIntelligenceRobot_GraduationProject](https://socialify.git.ci/xieleihan/llmIntelligenceRobot_GraduationProject/image?description=1&font=Source+Code+Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F57227318%3Fv%3D4%26size%3D64&name=1&owner=1&pattern=Floating+Cogs&pulls=1&stargazers=1&theme=Auto)

## 项目技术栈

- ***前端***

  **用户C端:**基于`React`+`SCSS`+`TypeScript`打造

  端口定义:8081

  **管理员B端:**基于`Vue`+`SCSS`+`TypeScript`打造

  <div align="left">
      <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="45" alt="React logo"  />
  	  <img width="6" />
  	  <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="45" alt="Vue3 logo"  />
  	  <img width="6" />
  	  <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" height="45" alt="SCSS logo"  />
  	  <img width="6" />
  	  <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="45" alt="TypeScript logo"  />
  	  <img width="6" />
  	</div>

- ***后端***

  基于Nodejs的`Koa`框架打造

  端口定义:8082

  <div align="left">
  	  <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="45" alt="Nodejs logo"  />
      <img width="6" />
      <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="45" alt="JavaScript logo"  />
  	</div>

- ***数据库***

	经典`MySQL`

	<div align="left">
		  <img src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="45" alt="MySQL logo"  />
		  <img width="6" />
		</div>

## 鸣谢

感谢所有在本项目中运用到的开源项目的开发者!

该项目不声明版权,任何人可基于项目做任何形式开发.

> Copyright© 2025 SouthAki.
>
> 该项目不可用于论文撰写(开发者除外),此项在2026年自动失效