// 导入tree-sitter解析器
import Parser from 'tree-sitter';
// 导入文件系统模块
import { readFileSync } from 'fs';
// 导入路径处理模块
import { basename, join } from 'path';
// 导入URL处理模块，用于处理ESM中的__dirname
import { fileURLToPath } from 'url';
// 导入自定义类型定义
import type { Language, ParseResult } from './types.js';

// 使用动态导入加载各语言的解析器模块
// Python语言解析器
const Python = (await import('tree-sitter-python')).default;
// Rust语言解析器
const Rust = (await import('tree-sitter-rust')).default;
// JavaScript语言解析器
const JavaScript = (await import('tree-sitter-javascript')).default;

// 获取当前文件所在目录的路径（ESM中需要手动处理）
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 创建tree-sitter解析器实例
const parser = new Parser();

// 定义支持的编程语言及其特殊语法节点
const languages: Language[] = [
  {
    name: 'Python',
    parser: Python,
    // Python特有的语法结构：装饰器、列表推导式、with语句
    specialNodes: ['decorator', 'list_comprehension', 'with_statement']
  },
  {
    name: 'Rust',
    parser: Rust,
    // Rust特有的语法结构：生命周期、模式匹配、impl块
    specialNodes: ['lifetime', 'match_expression', 'impl_item']
  },
  {
    name: 'JavaScript',
    parser: JavaScript,
    // JavaScript特有的语法结构：箭头函数、async/await、对象解构
    specialNodes: ['arrow_function', 'await_expression', 'object_pattern']
  }
];

/**
 * 解析单个源代码文件
 * @param filePath 文件路径
 * @param language 语言配置
 * @returns 解析结果，包含文件名、语法树和特殊语法结构
 */
function parseFile(filePath: string, language: Language): ParseResult {
  // 设置当前要使用的语言解析器
  parser.setLanguage(language.parser);
  // 读取源代码文件内容
  const sourceCode = readFileSync(filePath, 'utf8');
  // 解析源代码生成语法树
  const tree = parser.parse(sourceCode);
  
  // 用于存储发现的特殊语法结构
  const specialStructures: string[] = [];
  // 遍历语法树查找特殊节点
  traverseTree(tree.rootNode, language.specialNodes, specialStructures);
  
  // 返回解析结果
  return {
    fileName: basename(filePath),
    tree,
    specialStructures
  };
}

/**
 * 递归遍历语法树节点
 * @param node 当前节点
 * @param specialNodes 要查找的特殊节点类型
 * @param foundNodes 存储找到的特殊节点
 */
function traverseTree(
  node: Parser.SyntaxNode,
  specialNodes: string[],
  foundNodes: string[]
): void {
  // 如果当前节点是特殊语法节点，则记录下来
  if (specialNodes.includes(node.type)) {
    foundNodes.push(node.type);
  }
  
  // 递归遍历所有子节点
  for (const child of node.children) {
    traverseTree(child, specialNodes, foundNodes);
  }
}

// 主函数
function main() {
  // 定义要解析的示例文件及其对应的语言
  const examples = {
    'example.py': 'Python',
    'example.rs': 'Rust',
    'example.js': 'JavaScript'
  } as const;

  // 遍历所有示例文件
  for (const [file, langName] of Object.entries(examples)) {
    // 查找对应的语言配置
    const language = languages.find(l => l.name === langName);
    if (!language) {
      console.error(`Language ${langName} not found`);
      continue;
    }

    // 构建完整的文件路径
    const filePath = join(__dirname, '../examples', file);
    try {
      // 解析文件
      const result = parseFile(filePath, language);
      
      // 输出解析结果
      console.log(`\n解析文件: ${result.fileName}`);
      console.log('语法树结构:');
      console.log(result.tree.rootNode.toString());
      
      // 输出发现的特殊语法结构
      console.log('\n特殊语法结构:');
      result.specialStructures.forEach(node => {
        console.log(`发现${language.name}特有语法: ${node}`);
      });
    } catch (error) {
      console.error(`解析文件 ${file} 时出错:`, error);
    }
  }
}

// 执行主函数
main();
