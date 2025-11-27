# 建筑模型公司网站 - 发布与内容管理指南

## 网站概述

这是一个现代化的建筑模型公司网站，包含公司介绍、作品集展示、资料上传、自动整理和AI智能模型预览等功能。网站采用响应式设计，支持中英文双语切换，并集成了Three.js实现3D模型预览功能。

## 网站发布方法

### 1. 静态网站托管服务

#### Netlify
1. 注册Netlify账号并登录
2. 将项目代码上传到GitHub仓库
3. 在Netlify中选择"New site from Git"
4. 连接你的GitHub仓库
5. 配置构建命令（如需要）：`npm run build`（如果使用了构建工具）
6. 点击"Deploy site"按钮部署网站

#### Vercel
1. 注册Vercel账号并登录
2. 将项目代码上传到GitHub仓库
3. 在Vercel中选择"New Project"
4. 导入你的GitHub仓库
5. 配置项目设置（通常默认设置即可）
6. 点击"Deploy"按钮部署网站

#### GitHub Pages
1. 将项目代码上传到GitHub仓库
2. 在仓库设置中找到"GitHub Pages"选项
3. 选择要部署的分支（通常是main或gh-pages）
4. 选择根目录或/docs文件夹作为网站根目录
5. 点击"Save"按钮，GitHub将自动部署你的网站

### 2. 传统服务器部署

1. 准备一个支持HTML/CSS/JavaScript的Web服务器（如Nginx、Apache）
2. 使用FTP工具（如FileZilla）将网站文件上传到服务器
3. 配置服务器以正确解析HTML文件
4. 访问你的域名查看网站

## 内容管理系统

### 使用Static CMS（推荐）

Static CMS是一个基于Git的开源内容管理系统，适合静态网站使用。

#### 安装步骤：
1. 在项目根目录创建`admin`文件夹
2. 在`admin`文件夹中创建`index.html`文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
    <script src="https://cdn.jsdelivr.net/npm/static-cms@3.0.0/dist/static-cms-app.js"></script>
  </head>
  <body>
    <script>
      CMS.init({
        config: {
          backend: {
            name: 'git-gateway',
            branch: 'main',
          },
          media_folder: 'images/uploads',
          public_folder: '/images/uploads',
          collections: [
            {
              name: 'projects',
              label: '项目案例',
              folder: '_projects',
              create: true,
              fields: [
                { name: 'title', label: '标题', widget: 'string' },
                { name: 'description', label: '描述', widget: 'text' },
                { name: 'image', label: '图片', widget: 'image' },
                { name: 'category', label: '类别', widget: 'select', options: ['real-estate', 'urban-planning', 'commercial'] },
                { name: 'scale', label: '比例', widget: 'string' },
                { name: 'date', label: '日期', widget: 'date' }
              ]
            },
            {
              name: 'team',
              label: '团队成员',
              folder: '_team',
              create: true,
              fields: [
                { name: 'name', label: '姓名', widget: 'string' },
                { name: 'position', label: '职位', widget: 'string' },
                { name: 'bio', label: '简介', widget: 'text' },
                { name: 'image', label: '照片', widget: 'image' }
              ]
            }
          ]
        }
      });
    </script>
  </body>
</html>
```

3. 配置Netlify身份服务：
   - 在Netlify控制台中，转到"Identity"选项卡
   - 点击"Enable Identity"按钮
   - 在"Registration preferences"中选择"Invite only"
   - 邀请用户访问CMS

4. 访问`yourdomain.com/admin`登录CMS管理内容

### 使用其他CMS选项

#### WordPress + WP REST API
如果你需要更强大的后端功能，可以使用WordPress作为后端，通过REST API为前端提供数据。

#### Contentful
Contentful是一个云内容管理平台，提供API访问内容，适合需要频繁更新内容的网站。

## 多语言维护

### 语言文件结构
网站使用JSON格式的语言文件存储翻译内容：
- `lang/zh.json` - 中文翻译
- `lang/en.json` - 英文翻译

### 添加新语言
1. 在`lang`文件夹中创建新的语言文件（如`fr.json`）
2. 复制现有语言文件的结构，替换为新语言的翻译内容
3. 在`js/i18n.js`中添加新语言的支持
4. 在HTML的语言切换器中添加新语言选项

### 更新翻译内容
1. 直接编辑对应的语言JSON文件
2. 修改后保存文件
3. 重新部署网站使更改生效

### 最佳实践
- 使用描述性的键名，如`"about.title"`而不是`"title1"`
- 保持语言文件的结构一致
- 定期检查并更新翻译内容
- 使用翻译管理工具（如Crowdin、Transifex）协作管理多语言内容

## 3D模型管理

### 添加新的3D模型
1. 将模型文件（.glb或.gltf格式）上传到`models`文件夹
2. 在`js/model-viewer.js`中添加新模型的配置
3. 更新HTML中的模型缩略图和选择器

### 优化3D模型
- 使用Blender等工具优化模型，减少多边形数量
- 压缩纹理图片，使用适当的分辨率
- 考虑使用LOD（细节层次）技术提高性能

## 网站维护与更新

### 定期维护任务
- 检查并更新依赖库到最新版本
- 优化网站性能（图片压缩、代码压缩）
- 备份网站文件和数据
- 监控网站访问统计和错误日志

### 添加新功能
1. 在开发环境中实现新功能
2. 测试功能在不同浏览器和设备上的兼容性
3. 部署到生产环境前进行充分测试
4. 部署新功能并监控性能

## 常见问题解决

### 多语言切换不工作
- 检查语言文件路径是否正确
- 确保语言文件的JSON格式正确
- 检查浏览器控制台是否有JavaScript错误

### 3D模型无法加载
- 检查模型文件路径是否正确
- 确保模型文件格式支持（推荐使用.glb或.gltf）
- 检查模型文件是否损坏
- 查看浏览器控制台的错误信息

### 网站在某些设备上显示异常
- 使用响应式设计测试工具检查不同屏幕尺寸
- 检查CSS媒体查询是否正确
- 确保图片和其他资源使用相对单位

## 联系与支持

如有任何问题或需要进一步的帮助，请联系网站管理员或开发团队。
