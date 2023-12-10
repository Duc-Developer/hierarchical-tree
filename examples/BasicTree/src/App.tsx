import { useState } from 'react'
import treeLogo from '../../../docs/assets/tree-algorithm-icon.svg'
import './App.css'
import modules from "hierarchical-tree";
import carData from '../../../test/car.data.json';
const { TreeFactory } = modules;

const fakeData = [
  { id: '1', name: 'parent1' },
  { id: '21', name: 'children2-1', parentId: '2' },
  { id: '2', name: 'parent2' },
  { id: '11', name: 'children1-1', parentId: '1' },
  { id: '12', name: 'children1-2', parentId: '1' },
  { id: '13', name: 'children1-3', parentId: '1' },
]
function App() {
  const [tree, setTree] = useState({});

  const convertArrayToTree = () => {
    const startTime = performance.now();
    const data = new TreeFactory().produce(fakeData, { name: 'car', id: 'tree-car' });
    const endTime = performance.now();
    console.log(endTime - startTime, 'convertArrayToTree');
    return data;
  };

  const convertTreeToJSON = ({ tree }: { tree: any }) => {
    const startTime = performance.now();
    tree.toJSON();
    const endTime = performance.now();
    console.log(endTime - startTime, 'convertTreeToJSON');
  };

  const calculate = () => {
    const newData = convertArrayToTree();
    convertTreeToJSON({ tree: newData });
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
