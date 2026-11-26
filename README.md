# FDE 九阶段全流程实训项目

案例：卡尔德保险 · 首次报案材料分流与服务沟通  
主题：补过材料，为什么还在重复追问？

本仓库保存 FDE（Forward Deployed Engineer，前置部署工程师）九阶段实训的完整交付资料，包括报告、课件、速查页面、公开 Demo、AI 提示词、脱敏协作记录以及外部 Issue/PR 证据。

## 在线地址

- [九阶段项目速查页](https://sonnyboy061117-cmd.github.io/fde-interview-navigator1/)
- [卡尔德保险报案材料核对 Demo](https://calder-claim-material-checker.ochrelynx7.chatgpt.site/)
- [GitHub 仓库](https://github.com/sonnyboy061117-cmd/fde-interview-navigator1)
- [项目验收清单](docs/项目验收清单.md)

## 快速验收

建议按下面顺序查看：

1. 打开九阶段项目速查页，了解问题、方案和九阶段闭环。
2. 打开卡尔德保险 Demo，体验材料已有、缺失、冲突与人工确认状态。
3. 阅读九阶段实训报告，核对业务证据、需求边界和测试方案。
4. 查看项目主提示词与 AI 协作记录，核对开发约束和修改过程。
5. 核验外部 Issue、PR 及仓库内截图证据。

当前状态：**公开仓库、公开站点、公开 Demo、完整资料归档、外部贡献可核验。**

## 目录结构

```text
.
├── README.md
├── index.html                              # GitHub Pages 入口
├── .gitignore
├── site/
│   └── index.html                          # 九阶段速查页原始文件
├── docs/
│   ├── 卡尔德保险-九阶段实训报告.md          # 九阶段报告正文
│   ├── 项目验收清单.md                       # 老师快速验收入口
│   └── evidence/
│       ├── external-issue-1.png            # 外部 Issue 截图
│       └── external-pr-2.png               # 外部 PR 截图
├── assets/
│   └── FDE九阶段流程课件.html               # 课程课件存档
├── prompts/
│   └── 卡尔德保险项目主提示词.md             # 项目主提示词
├── ai-collaboration/
│   └── AI协作记录.md                       # 脱敏整理后的协作过程
└── deliverables/
    └── fde-nine-stage-report.zip           # 原始交付压缩包
```

## 核心判断

> 一线的痛不是“材料不够”，而是“材料散在三个地方，谁也不敢说齐了”。真正该做的不是再加一个填报入口，而是把“已有的、缺的、依据哪来的”拼成一份可核对的材料包，并且只读、不外发，核赔与赔付仍然留在人手里。

## 九阶段速览

| # | 阶段 | 一句话 | 必进实验室 | 必做访谈 |
|---|---|---|---|---|
| 01 | 业务挖掘 | 把“响应慢”拆成“处理慢”和“等待长” | ✅ | 01-2、01-3 |
| 02 | 现场调研 | 状态语义不一致，比材料缺失更要命 | ✅（主战场） | 02-1 六角色 |
| 03 | 需求定义 | 收敛为 4 条需求，每条挂证据编号 | — | 阈值需业务确认 |
| 04 | 方案设计 | 最小试点：报案材料包只读整理 | — | 权限须客户确认 |
| 05 | 构建集成 | 规则 / 模型 / 人工三段分工，六类异常齐备 | — | 缺数据才回现场 |
| 06 | 测试评估 | 按“最昂贵、最危险的失败”反推用例 | — | 修复后请业务评审 |
| 07 | 客户试点 | 让一线独立跑完一单才算过 | — | 07-2 UAT 核心 |
| 08 | 上线交接 | 接手人能复述，才算交完 | — | 08-1、08-3 核心 |
| 09 | 运营迭代 | 规则一改，旧单据必须能重算 | — | 09-2 事件演练 |

## 外部协作证明

### Issue

[gaojiayi0625/fengya-api-relay Issue #1：补充项目状态、安全说明与贡献指引](https://github.com/gaojiayi0625/fengya-api-relay/issues/1)

[![外部 Issue #1 截图](docs/evidence/external-issue-1.png)](https://github.com/gaojiayi0625/fengya-api-relay/issues/1)

### Pull Request

[gaojiayi0625/fengya-api-relay PR #2：完善项目规划、安全策略与贡献指南](https://github.com/gaojiayi0625/fengya-api-relay/pull/2)

[![外部 PR #2 截图](docs/evidence/external-pr-2.png)](https://github.com/gaojiayi0625/fengya-api-relay/pull/2)

## AI 协作资料

- [项目主提示词](prompts/卡尔德保险项目主提示词.md)
- [AI 协作记录（脱敏整理版）](ai-collaboration/AI协作记录.md)

原始会话中曾出现账号凭据，因此不发布原始聊天分享链接。协作记录保留需求、关键决策、修改过程和交付结果，并删除密码、令牌等敏感信息。

## 数据与版权说明

- 案例角色和案件数据均为合成训练内容，不含真实客户信息。
- 项目只进行材料状态核对，不执行核赔、赔付或自动外发。
- 课件版权归课程方所有，此处仅作学习存档。
