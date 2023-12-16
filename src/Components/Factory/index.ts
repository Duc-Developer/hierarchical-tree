import { ProducedData, RawData, RootInfo } from '@src/Models/tree.factory.model';
import { AbstractTreeFactory } from '@src/Models/tree.factory.model';
import HierarchicalTree from '@src/Components/TreeNode';
import { DEFAULT_ROOT } from '@src/Constants';
import { AbstractTreeNode, TreeNodeProps } from '@src/Models/tree.model';
class TreeFactory implements AbstractTreeFactory {
    data: AbstractTreeNode = Object.create(HierarchicalTree);

    constructor(data: RawData[], rootInfo?: RootInfo) {
        this.data = this.produce(data, rootInfo);
    }

    getData() {
        return this.data;
    }

    getJSON() {
        const funcKeys: Partial<keyof AbstractTreeNode>[] = [
            '_init',
            '_setRoot',
            'setLevel',
            'setParent',
            'move',
            'swap',
            'removeChild',
            'appendChild',
            'findDeep',
            'getRelativePath',
            'root',
            'parent',
        ];
        const loop = (tree: AbstractTreeNode) => {
            const result: any = {};
            for (const key in tree) {
                if (funcKeys.includes(key as Partial<keyof AbstractTreeNode>)) continue;
                result[key] = tree[key as Partial<keyof AbstractTreeNode>];
                if (key === 'children') result[key] = result[key].map(loop);
            }
            return result;
        };
        return loop(this.data);
    }

    produce(data: RawData[], rootInfo?: RootInfo) {
        const rootTree = this.initRoot(rootInfo);
        const cloneData: any[] = JSON.parse(JSON.stringify(data));
        const defaultAcc: { children: any[] } = { children: [] };
        const converted = cloneData.reduce((accumulator, item, i) => {
            if (!item.parentId || item.parentId === rootTree.id) {
                const treeNode = Object.create(HierarchicalTree)
                    ._init({
                        ...item,
                        level: 1,
                        parentId: rootTree.id,
                        parent: rootTree,
                    })
                    ._setRoot(rootTree);
                cloneData[i] = treeNode;
                accumulator.children.push(treeNode);
            } else {
                const matchIndex = cloneData.findIndex((arrItem) => arrItem.id === item.parentId);
                let parentMatch = matchIndex !== -1 ? cloneData[matchIndex] : undefined;
                if (!parentMatch) return accumulator;
                let parentLevel = 1;
                if (!Boolean(parentMatch._init)) {
                    parentLevel = !parentMatch?.parent?.parentId ? 1 : Number(parentMatch?.parent?.level) + 1;
                    const parentInfo = {
                        id: parentMatch.id,
                        name: parentMatch.name,
                        parentId: parentMatch?.parent?.parentId ?? rootTree.id,
                        parent: !parentMatch?.parent?.parentId ? rootTree : parentMatch.parent,
                        level: parentLevel
                    };
                    cloneData[matchIndex] = Object.create(HierarchicalTree)
                        ._init(parentInfo)
                        ._setRoot(rootTree);
                }
                const childInfo = {
                    ...item,
                    level: typeof parentMatch.level !== 'number' ? parentLevel + 1 : Number(parentMatch.level) + 1
                };
                const treeNode = Object.create(HierarchicalTree)
                    ._init(childInfo)
                    ._setRoot(rootTree);
                cloneData[i] = treeNode;
                cloneData[matchIndex].appendChild([treeNode]);
            }
            return accumulator;
        }, defaultAcc);
        rootTree.appendChild(converted.children);
        return rootTree;
    }
    initRoot(rootInfo?: RootInfo) {
        let defaultInfo: TreeNodeProps = {
            id: DEFAULT_ROOT.ID as string,
            name: DEFAULT_ROOT.NAME as string,
            level: 0,
        };
        if (rootInfo)
            defaultInfo = {
                ...defaultInfo,
                ...rootInfo,
            };
        const rootTree = Object.create(HierarchicalTree)._init(defaultInfo);
        rootTree._setRoot(rootTree);
        return rootTree;
    }
}

export default TreeFactory;
