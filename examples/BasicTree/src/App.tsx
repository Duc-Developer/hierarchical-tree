import { useState } from 'react'
import treeLogo from '../../../docs/assets/tree-algorithm-icon.svg'
import './App.css'
import modules from "hierarchical-tree";
import carData from '../../../test/car.data.json';
import simpleData from '../../../test/simple.data.json';
const { TreeFactory } = modules;

function App() {
  const [tree, setTree] = useState({});

  const convertArrayToTree = () => {
    const startTime = performance.now();
    const data = new TreeFactory(simpleData);
    const endTime = performance.now();
    console.log(endTime - startTime, 'convertArrayToTree');
    return data;
  };

  const convertTreeToJSON = ({ tree }: { tree: any }) => {
    const startTime = performance.now();
    const data = tree.getJSON();
    const endTime = performance.now();
    console.log(endTime - startTime, 'convertTreeToJSON');
    return data;
  };

  const calculate = () => {
    const tree = convertArrayToTree();
    // tree.move({ from: tree.children[0], to: tree.children[1] }) // enable if u want to test this func
    // tree.swap({ from: tree.children[0], to: tree.children[1] }) // enable if u want to test this func
    const newData = convertTreeToJSON({ tree });
    console.log(newData, 'newData')
    setTree(newData)
  }

  return (

    <section className='container'>
      <div className='left-box'>
        <div>
          <a href="https://react.dev" target="_blank">
            <img src={treeLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Hierarchical Tree</h1>
        <div className="card">
          <button onClick={calculate}>
            calculate
          </button>
        </div>
        <p className="read-the-docs">
          Click calculate to see results
        </p>
      </div>

      <div className='right-box'>
        <pre>{JSON.stringify(tree, null, 2)}</pre>
      </div>
    </section>

  )
}

export default App
