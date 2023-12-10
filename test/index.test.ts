import { test, expect, jest } from 'bun:test';
import TreeFactory from '@src/Components/Factory';

import cars from './car.data.json';
import simple from './simple.data.json';
import persons from './person.data.json';
import { DEFAULT_ROOT } from '@src/Constants';

const generateTree = jest.fn(() => {
    const treeCar = new TreeFactory().produce(cars, { name: 'car', id: 'tree-car' });
    const simpleData = new TreeFactory().produce(simple);
    const treePersons = new TreeFactory().produce(persons);
    return { treeCar, simpleData, treePersons };
});
test('convert cars data to tree', () => {
    const { treeCar } = generateTree();
    const treeJSON = treeCar.toJSON();
    expect(treeJSON).toMatchSnapshot();
    expect(treeJSON.id).toEqual('tree-car');
    expect(treeJSON.name).toEqual('car');
    expect(treeJSON.children[0].id).toEqual('12');
    expect(treeJSON.children[0].name).toEqual('Honda');
    expect(treeJSON.children[0].children.length).toEqual(2);
});

test('convert cities data to tree', () => {
    const { simpleData } = generateTree();
    const treeJSON = simpleData.toJSON();
    expect(treeJSON).toMatchSnapshot();
    expect(treeJSON.id).toEqual(DEFAULT_ROOT.ID);
    expect(treeJSON.name).toEqual(DEFAULT_ROOT.NAME);

    const firstChild = treeJSON.children[0];
    expect(firstChild.id).toEqual('1');
    expect(firstChild.name).toEqual('parent1');
    expect(firstChild.children.length).toEqual(3);
    expect(firstChild.children[0].id).toEqual('11');
    expect(firstChild.children[0].name).toEqual('children1-1');
    expect(firstChild.children[0].parentId).toEqual('1');
    expect(firstChild.children[1].id).toEqual('12');
    expect(firstChild.children[1].name).toEqual('children1-2');
    expect(firstChild.children[1].parentId).toEqual('1');
    expect(firstChild.children[2].id).toEqual('13');
    expect(firstChild.children[2].name).toEqual('children1-3');
    expect(firstChild.children[2].parentId).toEqual('1');

    const secondChild = treeJSON.children[1];
    expect(secondChild.id).toEqual('2');
    expect(secondChild.name).toEqual('parent2');
    expect(secondChild.children.length).toEqual(1);
    expect(secondChild.children[0].id).toEqual('21');
    expect(secondChild.children[0].name).toEqual('children2-1');
    expect(secondChild.children[0].parentId).toEqual('2');
});