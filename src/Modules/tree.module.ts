import { TREE_ACTION_TRANSFER } from '@src/Constants';

export interface TransferParams {
    from?: AbstractTreeNode | string;
    to: AbstractTreeNode | string;
    type?: TREE_ACTION_TRANSFER;
}
export interface AbstractTreeNode {
    id: string;
    name: string;
    parentId: string;
    children: AbstractTreeNode[];
    parent?: AbstractTreeNode;
    level?: number;
    readonly root?: AbstractTreeNode;

    init: (props: TreeNodeProps) => this;
    setLevel: (val: number) => void;
    setParent: (data: AbstractTreeNode) => void;
    move: ({ from, to, type }: TransferParams) => number | undefined;
    swap: ({ from, to, type }: TransferParams) => number | undefined;
    removeChild: (id: string) => number | undefined;
    appendChild: (children: AbstractTreeNode[], index?: number) => number | undefined;
    findDeep: (id: string) => AbstractTreeNode | undefined;
    getRelativePath: () => string;
}

export interface TreeNodeProps extends Pick<AbstractTreeNode, 'id' | 'name' | 'root' | 'parent'> {
    parentId?: string;
    level: number;
}
