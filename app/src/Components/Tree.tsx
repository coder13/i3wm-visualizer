import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react'
import OutputView from './Output';

// export const Colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

interface TreeProps {
  tree: I3Node;
  depth: number;
};

const Tree: React.FC<TreeProps> = ({ tree, depth = 0 }) => {
  return (
    <Container fluid>

      <Segment.Group horizontal>
        <Segment>{tree.type}</Segment>
        <Segment>{tree.id}</Segment>
        <Segment>{tree.name}</Segment>
      </Segment.Group>

      {tree.nodes.map((node) =>
        <li key={node.name}><Link to={`/${node.name}`}>{node.id} {node.type} {node.name}</Link></li>
      )}

      <Switch>
        {tree.nodes.map((node) =>
          <Route key={node.name} path={`/${node.name || node.id}`}>
            <OutputView tree={node} depth={depth + 1} path={`/${node.name || node.id}`} />
          </Route>
        )}
      </Switch>
    </Container>
  )
}

export default Tree;