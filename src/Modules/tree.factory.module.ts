import { AbstractTreeNode } from './tree.module';

export interface RootInfo {
    id: string;
    name: string;
}

export interface RawData {
    id: string;
    name?: string;
    parentId: string;
}

export interface AbstractTreeFactory {
    produce: (data: RawData[]) => AbstractTreeNode;
    initRoot: (rootInfo?: RootInfo) => AbstractTreeNode;
}
