# 小红书登录二维码获取工具

一个用于获取小红书登录二维码并自动检测扫码状态的 Python 工具。

## 环境依赖

- Python 3.6+
- Node.js (用于生成签名)

## 安装依赖

```bash
pip install requests pillow qrcode loguru
```

## 使用方法

```bash
python xhs_login.py
```

运行后将自动：
1. 生成 webId
2. 获取登录二维码并保存为 `login_qrcode.png`
3. 开始轮询等待扫码

## 项目结构

```
.
├── xhs_login.py        # 主程序
├── js/
│   └── login.js        # 签名生成脚本
└── login_qrcode.png    # 生成的二维码图片
```

## 免责声明

**本工具仅供学习和研究使用，使用者需遵守以下条款：**

1. **合法使用**：使用本工具时必须遵守中华人民共和国相关法律法规以及小红书平台的服务条款和使用协议。

2. **禁止滥用**：严禁将本工具用于任何非法用途，包括但不限于：
   - 未经授权的数据采集
   - 自动化批量注册账号
   - 恶意攻击或干扰平台正常运行
   - 其他违反平台规则的行为

3. **风险自负**：使用本工具可能存在账号风险（如被限制登录、封禁等），使用者需自行承担所有风险和责任。

4. **无担保**：本工具按"原样"提供，不提供任何明示或暗示的担保，包括但不限于适销性、特定用途的适用性和非侵权性的担保。

5. **责任限制**：在任何情况下，作者或版权持有人均不对因使用本工具而产生的任何直接、间接、偶然、特殊或后果性损害承担责任。

6. **个人使用**：建议仅用于个人账号的正常登录操作，不要用于商业用途或大规模自动化操作。

**使用本工具即表示您已阅读、理解并同意遵守上述免责声明的所有条款。如果您不同意这些条款，请不要使用本工具。**

## 开源协议

MIT License

Copyright (c) 2025 cloud-1104

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 作者

cloud-1104

## 贡献

欢迎提交 Issue 和 Pull Request。

## 更新日志

### v1.0.0 (2025-11-06)
- 初始版本发布
- 实现基础登录二维码获取功能
- 集成 loguru 日志系统
- 添加完整的开源协议和免责声明
