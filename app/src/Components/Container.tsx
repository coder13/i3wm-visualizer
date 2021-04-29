import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react'
import WorkspaceView from './Workspace';

interface ContainerProps {
  tree: I3Container;
  depth: number;
  path: string;
};

const ContainerView: React.FC<ContainerProps> = ({ tree, depth = 0, path }) => {
  return (
    <Container fluid>

      <Segment.Group horizontal>
        <Segment>{tree.type}</Segment>
        <Segment>{tree.id}</Segment>
        <Segment>{tree.name || 'null'}</Segment>
      </Segment.Group>

      {tree.nodes.map((node) =>
        <li key={node.id}><Link to={`${path}/${node.name || node.id}`}>{node.id} {node.type} {node.name}</Link></li>
      )}

      <Switch>
        {tree.nodes.map((node) =>
          <Route key={node.id} path={`${path}/${node.name || node.id}`}>
            { (() => {
              switch (node.type) {
                case 'workspace':
                  return <WorkspaceView tree={node as I3Workspace} depth={depth + 1} path={`${path}/${node.name || node.id}`} /> 
                case 'con':
                  return <ContainerView tree={node as I3Container} depth={depth + 1} path={`${path}/${node.name || node.id}`} /> 
                  default:
                  return <p>Not sure what's going on here</p>
              }
            })() }
          </Route>
        )}
      </Switch>
    </Container>
  )
}

export default ContainerView;
