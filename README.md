# hierarchical-tree ![hierarchical-tree-icon](/docs/assets/tree-algorithm-icon.svg) 

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

> If you want to contribute to development. Please come to [CONTRIBUTING](docs/CONTRIBUTING.md)