import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react'
import ContainerView from './Container';

interface OutputProps {
  tree: I3Node;
  depth: number;
  path: string;
};

const Output: React.FC<OutputProps> = ({ tree, depth = 0, path }) => {
  return (
    <Container fluid>

      <Segment.Group horizontal>
        <Segment>{tree.type}</Segment>
        <Segment>{tree.id}</Segment>
        <Segment>{tree.name}</Segment>
      </Segment.Group>

      {tree.nodes.map((node) =>
        <li key={node.id}><Link to={`${path}/${node.name || node.id}`}>{node.id} {node.type} {node.name}</Link></li>
      )}

      <Switch>
        {tree.nodes.map((node) =>
          <Route key={node.id} path={`${path}/${node.name || node.id}`}>
            { (() => {
              switch (node.type) {
                case 'con':
                  return <ContainerView tree={node as I3Container} depth={depth + 1} path={`${path}/${node.name || node.id}`} /> 
                case 'dockarea':
                  return <p>Dockarea</p>
                default:
                  return <p>Not sure what's going on here</p>
              }
            })() }
          </Route>
        )}
      </Switch>
    </Container>
  );
}

export default Output;
