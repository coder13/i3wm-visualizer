import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Segment, Menu, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import { Colors } from './Tree';
import ContainerView from './Container';

interface OutputProps {
  tree: I3Node;
  depth: number;
  path: string;
};

const Output: React.FC<OutputProps> = ({ tree, depth = 0, path }) => {
  const nodes = tree.nodes.concat(tree.floating_nodes);

  return (
    <Segment color={Colors[depth % 12]}>
      <Segment.Group>

      <Segment.Group horizontal>
        <Segment>{tree.type}</Segment>
        <Segment>{tree.id}</Segment>
        <Segment>{tree.name}</Segment>
        <Segment>{tree.layout}</Segment>
      </Segment.Group>

      <Menu attached widths={nodes.length as SemanticWIDTHSNUMBER}>
        {nodes.map((node) =>
          <Menu.Item key={node.name} as={Link} to={`${path}/${node.id}`}>
            {node.name || node.id}
          </Menu.Item>
        )}
      </Menu>

      <Switch>
        {nodes.map((node) =>
          <Route key={node.id} path={`${path}/${node.id}`}>
            { (() => {
              switch (node.type) {
                case 'con':
                case 'floating_con':
                  return <ContainerView tree={node as I3Container} depth={depth + 1} path={`${path}/${node.id}`} /> 
                case 'dockarea':
                  return <p>Dockarea</p>
                default:
                  return <p>Not sure what's going on here: {node.type}</p>
              }
            })() }
          </Route>
        )}
      </Switch>
      </Segment.Group>
    </Segment>
  );
}

export default Output;
