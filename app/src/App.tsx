import React, { useState, useEffect } from 'react';
import Tree from './Components/Tree';
import './App.css';

const serverURI = 'http://localhost:8080'

function App() {
  const [tree, setTree] = useState<I3Node | undefined>(undefined);
  const [error, setError] = useState<Error>();

  const fetchTree = () =>
    fetch(`${serverURI}/get_tree`)
      .then((data) => data.json())
      .then((data) => setTree(data))
      .catch((error) => {
        console.error(error);
        setError(error);
      });

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <div className="App">
      {error && error.message && <p className="error">{error.name}<br/>{error.message}<br/>{error.stack}</p>}
      {tree && <Tree tree={tree} /> }
    </div>
  );
}

export default App;
