import { RawData, RootInfo } from '@src/Modules/tree.factory.module';
import { AbstractTreeFactory } from '@src/Modules/tree.factory.module';
import HierarchicalTree from '@src/Components/TreeNode';
import { DEFAULT_ROOT } from '@src/Constants';
import { TreeNodeProps } from '@src/Modules/tree.module';
class TreeFactory {
    produce(data: RawData, rootInfo?: RootInfo) {
        const rootTree = this.initRoot(rootInfo);

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
