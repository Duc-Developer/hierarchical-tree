import { DEFAULT_ROOT, TREE_ACTION_TRANSFER } from '@src/Constants';
import { AbstractTreeNode, TransferParams, TreeNodeProps } from '@src/Modules/tree.module';
import { findDeepNode, uuid } from '@src/Utilities';

class HierarchicalTree implements AbstractTreeNode {
    id: AbstractTreeNode['id'] = '';
    name: AbstractTreeNode['name'] = '';
    parent: AbstractTreeNode['parent'] = undefined;
    parentId: AbstractTreeNode['parentId'] = '';
    children: AbstractTreeNode['children'] = [];
    level: AbstractTreeNode['level'] = undefined;
    root?: AbstractTreeNode = undefined;

    constructor(props: TreeNodeProps) {
        this.init(props);
    }

    setRoot(node: HierarchicalTree) {
        this.root = node;
        return this;
    }

    init(props: TreeNodeProps) {
        this.id = props.id;
        this.name = props.name ?? '';
        this.parentId = props.parentId;
        this.parent = props.parent;
        if (props.root) this.root = props.root;
        this.children = props.children ?? [];
        this.level = props.level;
        return this;
    }

    setLevel(val: number) {
        this.level = val;
        return this;
    }

    setParent(data: AbstractTreeNode) {
        if (data) this.parent = data;
        return this;
    }

    findDeep(nodeId: string) {
        const matched = findDeepNode(nodeId, this.children);
        return matched;
    }

    move(params: TransferParams) {
        // move node and children of itself to last index of target
        const { from, to, type = TREE_ACTION_TRANSFER.NODE } = params;
        let index;
        let fromNode;
        let toNode;
        if (!from) fromNode = this;
        switch (type) {
            case TREE_ACTION_TRANSFER.NODE:
                if (to) toNode = to;
                break;
            case TREE_ACTION_TRANSFER.ID:
                if (from && typeof from === 'string') fromNode = this.root?.findDeep(from);
                if (to && typeof to === 'string') toNode = this.root?.findDeep(to);
                break;
            case TREE_ACTION_TRANSFER.PATH:
                // todo features after
                break;
            default:
                break;
        }
        if (!fromNode || !toNode) return index;
        if (toNode instanceof HierarchicalTree && fromNode instanceof HierarchicalTree) {
            index = toNode.appendChild([fromNode]);
            fromNode.parent?.removeChild(fromNode.id);
        }
        return index;
    }

    swap(params: TransferParams) {
        // swap it and children of itself
        const { from, to, type = TREE_ACTION_TRANSFER.NODE } = params;
        let index;
        let fromNode;
        let toNode;
        if (!from) fromNode = this;
        switch (type) {
            case TREE_ACTION_TRANSFER.NODE:
                if (to) toNode = to;
                break;
            case TREE_ACTION_TRANSFER.ID:
                if (from && typeof from === 'string') fromNode = this.root?.findDeep(from);
                if (to && typeof to === 'string') toNode = this.root?.findDeep(to);
                break;
            case TREE_ACTION_TRANSFER.PATH:
                // todo features after
                break;
            default:
                break;
        }
        if (!fromNode || !toNode) return index;
        if (toNode instanceof HierarchicalTree && fromNode instanceof HierarchicalTree) {
            const cloneToNode = JSON.parse(JSON.stringify(toNode));
            const cloneFromNode = JSON.parse(JSON.stringify(fromNode));
            toNode = cloneFromNode;
            fromNode = cloneToNode;
        }
        return index;
    }

    getRelativePath() {
        const parent = this.parent;
        let path = '';
        if (!parent) return DEFAULT_ROOT.ID;
        const index = parent.children.findIndex((item) => item.id === this.id);
        if (index !== -1) path = `${parent.getRelativePath()}.children[${index}]`;
        return path;
    }

    removeChild(id: string) {
        let index = this.children.findIndex((item) => item.id === id);
        if (index !== -1) this.children.splice(index, 1);
        return index !== -1 ? index : undefined;
    }

    appendChild(children: AbstractTreeNode[], place?: number) {
        // todo feature after
        let index = place;
        if (!children?.length) return index;
        if (index === undefined) {
            index = this.children.push(...children);
        } else {
            this.children.splice(index, 0, ...children);
        }
        return undefined;
    }

    toJSON() {
        const getJSONData = (tree: AbstractTreeNode) => {
            const jsonData: any = {
                id: tree.id,
                name: tree.name,
                parentId: tree.parentId,
                level: tree.level,
                children: [],
            };
            if (tree.children.length) jsonData.children = tree.children.map(getJSONData);
            return jsonData;
        };
        return getJSONData(this);
    }
}

export default HierarchicalTree;
