import { DEFAULT_ROOT, TREE_ACTION_TRANSFER } from '@src/Constants';
import { AbstractTreeNode, TransferParams, TreeNodeProps } from '@src/Models/tree.model';
import { findDeepNode, uuid } from '@src/Utilities';

const HierarchicalTree: AbstractTreeNode = {
    id: '',
    name: '',
    parent: undefined,
    parentId: '',
    children: [],
    level: undefined,
    root: undefined,
    _setRoot: function (node: AbstractTreeNode) {
        this.root = node;
        return this;
    },
    _init(props: TreeNodeProps) {
        this.id = props.id;
        this.name = props.name ?? '';
        this.parentId = props.parentId;
        this.parent = props.parent;
        if (typeof props.root === 'number') this.root = props.root;
        this.children = props.children ?? [];
        this.level = props.level;
        return this;
    },
    setLevel(val: number) {
        this.level = val;
        return this;
    },
    setParent(data: AbstractTreeNode) {
        if (data) this.parent = data;
        return this;
    },
    findDeep(nodeId: string) {
        const matched = findDeepNode(nodeId, this.children);
        return matched;
    },
    move(params: TransferParams) {
        // move node and children of itself to last index of target
        const { from, to, type = TREE_ACTION_TRANSFER.NODE } = params;
        let index;
        let fromNode: any;
        let toNode: any;
        if (!from) fromNode = this;
        switch (type) {
            case TREE_ACTION_TRANSFER.NODE:
                if (from) fromNode = from;
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
        if (fromNode?.parent && fromNode.id) {
            index = toNode.appendChild([fromNode]);
            fromNode.parent?.removeChild(fromNode.id);
        }
        return index;
    },
    swap(params: TransferParams) {
        // swap it and children of itself
        const { from, to, type = TREE_ACTION_TRANSFER.NODE } = params;
        let index;
        let fromNode: any;
        let toNode: any;
        if (!from) fromNode = this;
        switch (type) {
            case TREE_ACTION_TRANSFER.NODE:
                if (from) fromNode = from;
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
        if (toNode.parent && fromNode.parent) {
            const cloneToNode = JSON.parse(JSON.stringify(toNode));
            const cloneFromNode = JSON.parse(JSON.stringify(fromNode));
            const parentOfToNode = toNode.parent;
            const parentFromNode = fromNode.parent;
            if (!parentFromNode || !parentOfToNode) return index;
            const toNodeInd = parentOfToNode.children.findIndex((item: any) => item.id === cloneToNode.id);
            const fromNodeInd = parentOfToNode.children.findIndex((item: any) => item.id === cloneFromNode.id);
            if (toNodeInd === -1 || fromNodeInd === -1) return index;
            parentOfToNode.children[toNodeInd] = cloneFromNode;
            parentFromNode.children[fromNodeInd] = cloneToNode;
        }
        return index;
    },
    getRelativePath() {
        const parent = this.parent;
        let path = '';
        if (!parent) return DEFAULT_ROOT.ID;
        const index = parent.children.findIndex((item) => item.id === this.id);
        if (index !== -1) path = `${parent.getRelativePath()}.children[${index}]`;
        return path;
    },
    removeChild(id: string) {
        let index = this.children.findIndex((item) => item.id === id);
        if (index !== -1) this.children.splice(index, 1);
        return index !== -1 ? index : undefined;
    },
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
    },
};

export default HierarchicalTree;
