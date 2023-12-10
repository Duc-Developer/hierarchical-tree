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
## Input interface
Your input data required some field bellow
| Properties | Description | Type |
| id | uniq id | string |
| name | name for node | string |
| parentId | parentId of node | string or undefined |

## Api
| Properties | Description | Type | Default | Note
| --- | --- | --- | --- | --- |
| id | uniq | string | '' | _ |
| name | name of node | string | '' | _ |
| parentId | for calculate which is parent's of node | string | '' | _ |
| children | array of node's child | AbstractTreeNode | [] | _ |
| parent | parent of this node | AbstractTreeNode | undefined | _ |
| level | level of node in tree. Root node has level = 0 | number | 0 | ...coming... |
| `setParent` | set new parent for this node | (data: AbstractTreeNode) => void | _ | _ |
| `move` | move from node to node, if move fail it return undefined | ({ from, to, type }: TransferParams) => number or undefined | type: TREE_ACTION_TRANSFER | _ |
| `swap` | same move function but swap child too | ({ from, to, type }: TransferParams) => number or undefined | type: TREE_ACTION_TRANSFER | _ |
| `removeChild` | remove child and return index number when success or undefined when it fail | (id: string) => number or undefined | _ | _ |
| `appendChild` | opposite with `removeChild` | (children: AbstractTreeNode[], index?: number) => number or undefined | _ | _ |
| `findDeep` | find deep child of this node call action | (id: string) => AbstractTreeNode or undefined | _ | _ |
| `getRelativePath` | get relativePath from root |  () => string | _ | ...coming... |

> [!TIP]
> You can follow this interface for detail:
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
    toJSON: () => Pick<AbstractTreeNode, 'id' | 'name' | 'parent' | 'parentId' | 'children' | 'level'>;
}

enum TREE_ACTION_TRANSFER {
    ID = 'id',
    PATH = 'path',
    NODE = 'node',
}
```

> If you want to contribute to development. Please come to [CONTRIBUTING](docs/CONTRIBUTING.md)