import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { SemanticCOLORS, Menu, Segment, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import OutputView from './Output';

export const Colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

interface TreeProps {
  tree: I3Node;
  depth: number;
};

const Tree: React.FC<TreeProps> = ({ tree, depth = 0 }) => {
  return (
    <Segment color={Colors[depth % 12]}>
      <Segment.Group>

        <Segment.Group horizontal>
          <Segment>{tree.type}</Segment>
          <Segment>{tree.id}</Segment>
          <Segment>{tree.name}</Segment>
        <Segment>{tree.layout}</Segment>
        </Segment.Group>

        <Menu attached widths={tree.nodes.length as SemanticWIDTHSNUMBER}>
          {tree.nodes.map((node) =>
            <Menu.Item key={node.name} as={Link} to={`/${node.name}`}>
              {node.name || node.id}
            </Menu.Item>
          )}
        </Menu>

        <Switch>
          {tree.nodes.map((node) =>
            <Route key={node.name} path={`/${node.name || node.id}`}>
              <OutputView tree={node} depth={depth + 1} path={`/${node.name || node.id}`} />
            </Route>
          )}
        </Switch>
      </Segment.Group>
    </Segment>
  )
}

export default Tree;