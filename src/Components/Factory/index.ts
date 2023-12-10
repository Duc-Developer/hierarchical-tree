import { ProducedData, RawData, RootInfo } from '@src/Modules/tree.factory.module';
import { AbstractTreeFactory } from '@src/Modules/tree.factory.module';
import HierarchicalTree from '@src/Components/TreeNode';
import { DEFAULT_ROOT } from '@src/Constants';
import { TreeNodeProps } from '@src/Modules/tree.module';
class TreeFactory implements AbstractTreeFactory {
    produce(data: RawData[], rootInfo?: RootInfo) {
        const rootTree = this.initRoot(rootInfo);
        const cloneData: HierarchicalTree[] = JSON.parse(JSON.stringify(data));
        const defaultAcc: { children: HierarchicalTree[] } = { children: [] };
        const converted = cloneData.reduce((accumulator, item, i) => {
            if (!item.parentId || item.parentId === rootTree.id) {
                const treeNode = new HierarchicalTree({
                    ...item,
                    level: 1,
                    parentId: rootTree.id,
                    parent: rootTree,
                }).setRoot(rootTree);
                cloneData[i] = treeNode;
                accumulator.children.push(treeNode);
            } else {
                const matchIndex = cloneData.findIndex((arrItem) => arrItem.id === item.parentId);
                let parentMatch = matchIndex !== -1 ? cloneData[matchIndex] : undefined;
                if (!parentMatch) return accumulator;
                if (!Boolean(parentMatch instanceof HierarchicalTree)) {
                    cloneData[matchIndex] = new HierarchicalTree({
                        id: parentMatch.id,
                        name: parentMatch.name,
                        parentId: parentMatch?.parent?.parentId ?? rootTree.id,
                        parent: !parentMatch?.parent?.parentId ? rootTree : parentMatch.parent,
                        level: !parentMatch?.parent?.parentId ? 1 : Number(parentMatch?.parent?.level) + 1,
                    }).setRoot(rootTree);
                }
                const treeNode = new HierarchicalTree({ ...item, level: Number(parentMatch.level) + 1 }).setRoot(rootTree);
                cloneData[i] = treeNode;
                cloneData[matchIndex].appendChild([treeNode]);
            }
            return accumulator;
        }, defaultAcc);
        rootTree.appendChild(converted.children);
        return rootTree;
    }

    initRoot(rootInfo?: RootInfo) {
        let info: TreeNodeProps = {
            id: DEFAULT_ROOT.ID as string,
            name: DEFAULT_ROOT.NAME as string,
            level: 0,
        };
        if (rootInfo)
            info = {
                ...info,
                ...rootInfo,
            };
        const rootTree = new HierarchicalTree(info);
        rootTree.setRoot(rootTree);
        return rootTree;
    }
}

export default TreeFactory;
