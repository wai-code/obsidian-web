// 笔记类型定义
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

// 链接类型定义
export interface Link {
  source: string; // 源笔记 ID
  target: string; // 目标笔记 ID
}

// 图谱节点类型
export interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

// 图谱边类型
export interface GraphEdge {
  source: string;
  target: string;
}

// 应用状态类型
export interface AppState {
  notes: Record<string, Note>;
  activeNoteId: string | null;
  searchQuery: string;
  sidebarOpen: boolean;
  graphView: boolean;
}
