如何把站点部署到 Vercel

以下步骤有两种方式：Web UI（推荐）和 CLI（可选）。仓库已包含 `vercel.json`，并在 `package.json` 中提供了 `build` 脚本，Vercel 会运行 `npm run build` 并从 `docs/.vitepress/dist` 发布。

1) 通过 Vercel Web UI（推荐）

- 登录并访问 https://vercel.com
- 点击 "New Project" -> "Import Git Repository" -> 选择 "GitHub" 并授权 Vercel 访问您的仓库 `lentoo/biu`。
- 在 Import 项目设置页面：
  - Framework Preset: 选择 "Other" 或 "Static"
  - Build Command: `npm run build`
  - Output Directory: `docs/.vitepress/dist`
- 点击 Deploy。部署完成后 Vercel 会给出一个默认域名（例如 `biu-username.vercel.app`），在项目设置里可以绑定自定义域名。

2) 使用 Vercel CLI（在本机运行）

- 安装并登录：

```bash
# 安装（如果未安装）
npm i -g vercel
# 登录
vercel login
```

- 在项目根目录运行一次构建并部署：

```bash
npm run build
vercel --prod --confirm
```

- 或使用 `package.json` 中的脚本（已添加）：

```bash
npm run vercel:deploy
```

3) 其它说明

- `vercel.json` 已包含静态构建配置，指定 `distDir: docs/.vitepress/dist`。如果您更喜欢在 Vercel UI 中手动填写 Build Command 与 Output Directory，也可以不使用 `vercel.json`。
- 如果您需要自动化变量（如 PRIVATE keys），可以在 Vercel 项目 Settings → Environment Variables 中添加。

如需我在本地生成部署包或进一步帮助（例如设置自定义域、HTTPS 或环境变量），告诉我您需要哪项，我可以接着执行。