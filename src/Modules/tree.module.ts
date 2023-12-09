export interface RawData {
  id: string;
  name?: string;
  parentId: string;
}
export interface TreeNode {
  id: string;
  name: string;
  parentId: string;
  children: TreeNode[];
  level: number;
}

export interface AbstractTreeNodeFactory extends TreeNode {
  init: (data: RawData[]) => AbstractTreeNodeFactory;
  setLevel: (val: number) => void;
  setParent: (data: TreeNode) => void;
  move: ({ from, to }: { from: string; to: string }) => number | undefined;
  swap: ({ from, to }: { from: string; to: string }) => number | undefined;
  removeChild: (id: string) => number | undefined;
  appendChild: (children: TreeNode[], index?: number) => number | undefined;
}
