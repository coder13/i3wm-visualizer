import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Loader, Message } from 'semantic-ui-react'
import Tree from './Components/Tree';
import Header from './Components/Header';
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
    <div>
      <Router>
        <Header />
        {error && error.message && (
          <Message error>
            <Message.Header>{error.name}</Message.Header>
            {error.message}<br/>{error.stack}
          </Message>
        )}
        <Switch>
          <Route path="*">
            {tree && <Tree tree={tree} depth={0} /> }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
