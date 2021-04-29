import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Segment, Menu, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import { Colors } from './Tree';
import WorkspaceView from './Workspace';

interface ContainerProps {
  tree: I3Container;
  depth: number;
  path: string;
};

const ContainerView: React.FC<ContainerProps> = ({ tree, depth = 0, path }) => {
  const nodes = tree.nodes.concat(tree.floating_nodes);

  console.log(16, path)

  return (
    <Segment color={Colors[depth % 12]}>
      <Segment.Group>

      <Segment.Group horizontal>
        <Segment>{tree.type}</Segment>
        <Segment>{tree.id}</Segment>
        <Segment>{tree.name || 'null'}</Segment>
        <Segment>{tree.layout}</Segment>
        <Segment>{tree.floating}</Segment>
      </Segment.Group>
      {tree.window_properties && (
        <Segment.Group horizontal>
          <Segment>{tree.window_properties.class}</Segment>
          <Segment>{tree.window_properties.instance}</Segment>
          <Segment>{tree.window_properties.title}</Segment>
          <Segment>{tree.window_properties.window_role}</Segment>
          <Segment>{tree.window_properties.transient_for}</Segment>
        </Segment.Group>
      )}

      {nodes.length ? (
        <>
          <Menu attached widths={nodes.length as SemanticWIDTHSNUMBER}>
            {nodes.map((node) =>
              <Menu.Item key={node.name} as={Link} to={`${path}/${node.id}`}>
                {node.name || node.id}
              </Menu.Item>
            )}
          </Menu>

          {/* <Switch>
            {nodes.map((node) =>
              <Route key={node.id} path={`${path}/${node.id}`}>
                { (() => {
                  switch (node.type) {
                    case 'workspace':
                      return <WorkspaceView tree={node as I3Workspace} depth={depth + 1} path={`${path}/${node.id}`} /> 
                    case 'con':
                    case 'floating_con':
                      return <ContainerView tree={node as I3Container} depth={depth + 1} path={`${path}/${node.id}`} /> 
                    default:
                      return <p>Not sure what's going on here: {node.type}</p>
                  }
                })() }
              </Route>
            )}
          </Switch> */}
        </>
      ) : false}
      </Segment.Group>
    </Segment>
  )
}

export default ContainerView;
