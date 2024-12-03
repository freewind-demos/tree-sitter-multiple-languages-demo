# Tree-sitter 多语言解析演示

这个项目演示了如何使用 Tree-sitter 解析不同编程语言的语法结构。Tree-sitter 是一个增量式解析器生成器，可以为多种编程语言生成高效、可靠的解析器。

## 功能特点

- 支持多种编程语言的解析（Python、Rust、JavaScript）
- 识别每种语言的特殊语法结构
- 生成详细的抽象语法树（AST）
- 使用TypeScript提供类型安全

### 支持的语言特性

1. **Python**
   - 装饰器（Decorators）
   - 列表推导式（List Comprehensions）
   - with语句（Context Managers）

2. **Rust**
   - 生命周期标注（Lifetimes）
   - 模式匹配（Pattern Matching）
   - impl块（Implementations）

3. **JavaScript**
   - 箭头函数（Arrow Functions）
   - async/await表达式
   - 对象解构（Object Destructuring）

## 技术栈

- TypeScript
- Tree-sitter
- pnpm（包管理器）
- tsx（TypeScript执行器）

## 项目结构

```
.
├── src/
│   ├── index.ts          # 主程序
│   ├── types.ts          # 类型定义
│   └── types/            # 类型声明文件
├── examples/             # 示例代码
│   ├── example.py        # Python示例
│   ├── example.rs        # Rust示例
│   └── example.js        # JavaScript示例
├── package.json          # 项目配置
└── tsconfig.json         # TypeScript配置
```

## 安装

```bash
# 安装依赖
pnpm install
```

## 运行

```bash
# 运行演示
pnpm start

# 开发模式（监视文件变化）
pnpm dev

# 构建项目
pnpm build
```

## 工作原理

1. 程序会加载不同语言的Tree-sitter解析器
2. 对每个示例文件进行解析，生成抽象语法树
3. 遍历语法树，识别每种语言的特殊语法结构
4. 输出解析结果，包括：
   - 完整的语法树结构
   - 发现的特殊语法结构

## 示例输出

```
解析文件: example.py
语法树结构:
(module (decorated_definition ...))

特殊语法结构:
发现Python特有语法: decorator
发现Python特有语法: list_comprehension
发现Python特有语法: with_statement
```

## 扩展

要添加新的语言支持，需要：

1. 安装相应的tree-sitter语言包
2. 在`languages`数组中添加新的语言配置
3. 定义该语言的特殊语法节点
4. 添加相应的示例代码

## 注意事项

- 确保安装了所有必要的依赖
- Node.js版本要求：>=14.0.0
- 某些tree-sitter语言包可能需要编译原生模块
