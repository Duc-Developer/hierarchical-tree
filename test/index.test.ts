import { test, expect, jest } from 'bun:test';
import TreeFactory from '@src/Components/Factory';

import cars from './car.data.json';
import cities from './city.data.json';
import persons from './person.data.json';

const generateTree = jest.fn(() => {
    const treeCar = new TreeFactory().produce(cars, { name: 'car', id: 'tree-car' });
    const treeCities = new TreeFactory().produce(cities);
    const treePersons = new TreeFactory().produce(persons);
    return { treeCar, treeCities, treePersons };
});
test('convert cars data to tree', () => {
    const { treeCar } = generateTree();
    expect(treeCar).toMatchSnapshot();
    expect(treeCar.id).toEqual('tree-car');
    expect(treeCar.name).toEqual('car');
    expect(treeCar.children[0].id).toEqual('12');
    expect(treeCar.children[0].name).toEqual('Honda');
    expect(treeCar.children[0].children.length).toEqual(2);
});