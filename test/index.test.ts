import { test, expect, jest } from 'bun:test';
import TreeFactory from '@src/Components/Factory';

import cars from './car.data.json';
import treeCarConverted from './car.tree.json';
import simple from './simple.data.json';
import treeSimpleConverted from './simple.tree.json';
import persons from './person.data.json';

const generateTree = jest.fn(() => {
    const treeCar = new TreeFactory().produce(cars, { name: 'car', id: 'tree-car' });
    const simpleData = new TreeFactory().produce(simple);
    const treePersons = new TreeFactory().produce(persons);
    return { treeCar, simpleData, treePersons };
});
test('convert cars data to tree', () => {
    const { treeCar } = generateTree();
    const treeJSON = treeCar.toJSON();
    expect(treeJSON).toMatchSnapshot(treeCarConverted);
});

test('convert cities data to tree', () => {
    const { simpleData } = generateTree();
    const treeJSON = simpleData.toJSON();
    expect(treeJSON).toMatchSnapshot()
    expect(treeJSON).toMatchSnapshot(treeSimpleConverted);
});