import React, { useState, useEffect } from 'react';
import { Container, Loader, Message } from 'semantic-ui-react'
import Tree from './Components/Tree';
import './App.css';

const serverURI = 'http://localhost:8080'

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tree, setTree] = useState<I3Node | undefined>(undefined);
  const [error, setError] = useState<Error>();

  const fetchTree = () =>
    fetch(`${serverURI}/get_tree`)
      .then((data) => data.json())
      .then((data) => {
        setTree(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });

  useEffect(() => {
    fetchTree();
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

return (
  <Container className="app" fluid>
    {error && error.message && (
      <Message error>
        <Message.Header>{error.name}</Message.Header>
        {error.message}<br/>{error.stack}
      </Message>
    )}
    {tree && <Tree tree={tree} depth={0} /> }
  </Container>
  );
}

export default App;
