import main from "hierarchical-tree";
import carData from '../../test/car.data.json';
const { TreeFactory } = main;
const runTest = function () {
    const treeCar = new TreeFactory().produce(carData, { name: 'car', id: 'tree-car' });
    console.log({ treeCar })
}

runTest();