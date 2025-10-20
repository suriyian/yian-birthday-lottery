# 🚀 GitHub Pages 部署指南

## 📋 部署步骤

### 1. 创建GitHub仓库
1. 登录 [GitHub.com](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称建议：`yian-birthday-lottery`
4. 设置为 **Public**（GitHub Pages 免费版需要公开仓库）
5. **不要**勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

### 2. 推送代码到GitHub
在终端中执行以下命令：

```bash
# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/yian-birthday-lottery.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入您的GitHub仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 4. 等待部署完成
- GitHub Actions 会自动构建和部署
- 在 "Actions" 选项卡中可以查看部署进度
- 部署完成后，您的网站将在以下地址可用：
  ```
  https://YOUR_USERNAME.github.io/yian-birthday-lottery/
  ```

## 🎯 快速部署命令

如果您已经有GitHub账号，只需要执行：

```bash
# 1. 替换下面的YOUR_USERNAME为您的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/yian-birthday-lottery.git

# 2. 推送到GitHub
git branch -M main
git push -u origin main
```

然后在GitHub仓库设置中启用Pages即可！

## 📱 访问您的抽奖页面

部署成功后，您可以通过以下方式访问：
- **电脑浏览器**：直接访问GitHub Pages链接
- **手机/平板**：同样的链接，响应式设计自动适配
- **分享给朋友**：直接发送链接即可

## 🔄 更新网站内容

当您需要更换照片或修改内容时：
1. 在本地修改文件
2. 执行：
   ```bash
   git add .
   git commit -m "更新照片和名单"
   git push
   ```
3. GitHub会自动重新部署

## 💡 小贴士

- 部署通常需要1-5分钟
- 确保仓库是Public的
- 如果遇到问题，检查Actions页面的部署日志
- 网站链接可以直接分享给参加派对的家长们

祝Yian生日快乐！🎉