import { test, expect, jest } from 'bun:test';
import TreeFactory from '@src/Components/Factory';
import HierarchicalTree from '@src/Components/TreeNode';

import cars from './car.data.json';
import treeCarConverted from './car.tree.json';
import simple from './simple.data.json';
import treeSimpleConverted from './simple.tree.json';
import persons from './person.data.json';
import { TREE_ACTION_TRANSFER } from '@src/Constants';

const generateTree = jest.fn(() => {
    const treeCar = new TreeFactory(cars, { name: 'car', id: 'tree-car' });
    const simpleData = new TreeFactory(simple);
    const treePersons = new TreeFactory(persons);
    return { treeCar, simpleData, treePersons };
});
test('convert cars data to tree', () => {
    const { treeCar } = generateTree();
    const treeJSON = treeCar.getJSON();
    expect(treeJSON).toMatchSnapshot(treeCarConverted);
});

test('convert cities data to tree', () => {
    const { simpleData } = generateTree();
    const treeJSON = simpleData.getJSON();
    expect(treeJSON).toMatchSnapshot()
    expect(treeJSON).toMatchSnapshot(treeSimpleConverted);
});

test('tree car setLevel', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    treeData.setLevel(2);
    expect(treeData.level).toEqual(2);
});

test('tree car setParent', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    const child = treeData.children[0].children[0];
    child.setParent(treeData);
    expect(child.parent?.id).toEqual('tree-car');
    expect(child.parent?.name).toEqual('car');
    expect(child.parent?.level).toEqual(0);
});

test('tree car findDeep', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    const child = treeData.findDeep('6');
    const notFound = treeData.findDeep('notFound');
    expect(child).toMatchObject({
        "id": "6",
        "name": "Audi",
        "parentId": "12",
        "level": 2,
        "children": []
    });
    expect(notFound).toBeUndefined();
});

test('tree car move', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    treeData.move({ from: '6', to: '9', type: TREE_ACTION_TRANSFER.ID });
    const parent = treeData.findDeep('9');
    expect(parent).toBeDefined();
    const founded = parent?.findDeep('6');
    expect(founded).toBeDefined();
    expect(founded).toMatchObject({
        "id": "6",
        "name": "Audi",
        "parentId": "9",
        "level": 2,
        "children": []
    });
});

test('tree car swap', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    treeData.swap({ from: '6', to: '11', type: TREE_ACTION_TRANSFER.ID });
    const treeJSON = treeCar.getJSON();
    expect(treeJSON.children[0].children[0]).toMatchObject({
        "id": "11",
        "name": "Inova",
        "parentId": "12",
        "level": 2,
        "children": []
    });
    expect(treeJSON.children[1].children[0]).toMatchObject({
        "id": "6",
        "name": "Audi",
        "parentId": "9",
        "level": 2,
        "children": []
    });
});

test('tree car removeChild', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    treeData.removeChild('12');
    const notFound = treeData.findDeep('12');
    expect(notFound).toBeUndefined();
});

test('tree car appendChild', () => {
    const { treeCar } = generateTree();
    const treeData = treeCar.getData();
    const newChild = Object.create(HierarchicalTree)
        ._init({
            "id": "18",
            "name": "DatBike",
            "level": 1,
            "children": []
        })
    treeData.appendChild([newChild]);
    expect(treeData.children.length).toEqual(3);
});