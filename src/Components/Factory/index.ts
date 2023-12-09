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
            if (!item.parentId) {
                const treeNode = new HierarchicalTree({ ...item, level: 1 });
                cloneData[i] = treeNode;
                accumulator.children.push(treeNode);
            } else {
                const matchIndex = cloneData.findIndex((arrItem) => arrItem.id === item.parentId);
                let match = matchIndex !== -1 ? cloneData[matchIndex] : undefined;
                if (!match) return accumulator;
                if (!Boolean(match instanceof HierarchicalTree)) {
                    match = new HierarchicalTree({ ...item, level: Number(match?.parent?.level) + 1 });
                }
                const treeNode = new HierarchicalTree({ ...item, level: Number(match.level) + 1 });
                cloneData[i] = treeNode;
                match.appendChild([treeNode]);
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
