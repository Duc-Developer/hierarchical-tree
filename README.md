# hierarchical-tree ![tree-icon](/docs/assets/tree-algorithm-icon.svg) 

## Introduction
This is utility support to convert array to hierarchical tree faster.
And it supported for more function:
- Move node to node's children
- Swap node
- Delete node
- Insert node data
....

## Usage
```
import { TreeFactory } from "hierarchical-tree";
const data = [
    {id: 1, name: 'parent1'},
    {id: 21, name: 'children2-1', parentId: 2},
    {id: 2, name: 'parent2'},
    {id: 11, name: 'children1-1', parentId: 1},
    {id: 12, name: 'children1-2', parentId: 1},
    {id: 13, name: 'children1-3', parentId: 1},
];
const treeData = TreeFactory.produce(data);
```

## Api
| Properties | Description | Note
| --- | --- | --- |
| `setParent` | set new parent for note | N/A |
| `move` | move from node to node with by id or relativePath or treeNode | default: treeNode
| `swap` | same move function but swap child too | N/A |
| `removeChild` | remove child and return index number when success or undefined when it fail | N/A |
| `appendChild` | opposite with `removeChild` | N/A |
| `findDeep` | find deep child of this node call action | N/A |
| `getRelativePath` | get relativePath from root | ...incoming |

You can follow this interface for detail:
```
interface AbstractTreeNode {
    id: string;
    name: string;
    parentId?: string;
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
```

> If you want to contribute to development. Please come to [CONTRIBUTING](docs/CONTRIBUTING.md)