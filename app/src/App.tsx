import React, { useState, useEffect } from 'react';
import './App.css';

const serverURI = 'http://localhost:8080'

function App() {
  const [tree, setTree] = useState<any>();
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
      {JSON.stringify(tree)}
    </div>
  );
}

export default App;
