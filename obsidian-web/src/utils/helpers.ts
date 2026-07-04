import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../types';

// 生成唯一 ID
export const generateId = (): string => uuidv4();

// 提取笔记标题（第一行或内容前缀）
export const extractTitle = (content: string): string => {
  const lines = content.split('\n');
  // 查找第一个标题 # 
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  // 如果没有标题，使用第一行
  return lines[0]?.substring(0, 50).trim() || 'Untitled';
};

// 提取所有链接 [[noteName]]
export const extractLinks = (content: string): string[] => {
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  const matches = [...content.matchAll(linkRegex)];
  return matches.map((m) => m[1]);
};

// 提取标签 #tag
export const extractTags = (content: string): string[] => {
  const tagRegex = /#(\w+)/g;
  const matches = [...content.matchAll(tagRegex)];
  return [...new Set(matches.map((m) => m[1]))];
};

// 创建新笔记
export const createNote = (content: string = ''): Note => {
  const title = extractTitle(content);
  const tags = extractTags(content);
  const now = Date.now();
  
  return {
    id: generateId(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
    tags,
  };
};

// Markdown 转 HTML（使用 marked）
export const markdownToHtml = async (markdown: string): Promise<string> => {
  const { marked } = await import('marked');
  return marked.parse(markdown) as string;
};

// 处理双向链接，将 [[noteName]] 转为可点击的链接
export const processLinks = (html: string): string => {
  // 这里可以在渲染时处理链接点击
  return html;
};
