import type Parser from 'tree-sitter';

export interface Language {
  name: string;
  parser: any;
  specialNodes: string[];
}

export interface ParseResult {
  fileName: string;
  tree: Parser.Tree;
  specialStructures: string[];
}
