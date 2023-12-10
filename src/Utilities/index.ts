import { AbstractTreeNode } from '@src/Models/tree.model';

export const findDeepNode = (id: string, treeNode: AbstractTreeNode[]): AbstractTreeNode | undefined => {
    for (const item of treeNode) {
        if (item.id === id) return item;
        if (item?.children?.length) {
            const foundItem = findDeepNode(id, item.children);
            if (foundItem) return foundItem;
        }
    }
    return undefined;
};

export const findNodeByPath: AbstractTreeNode | undefined = (treeNode: AbstractTreeNode, path: string) => {
    // todo  find item with path in tree node
    return undefined;
};

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
