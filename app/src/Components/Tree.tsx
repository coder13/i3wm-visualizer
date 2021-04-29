import React from 'react';
import { useLocation, Switch, Route, Link } from 'react-router-dom';
import { SemanticCOLORS, Container, Menu, Segment, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import OutputView from './Output';
import ContainerView from './Output';
import WorkspaceView from './Workspace';

export const Colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

interface TreeProps {
  tree: I3Node;
  depth: number;
};

const Tree: React.FC<TreeProps> = ({ tree, depth = 0 }) => {
  const location = useLocation();

  let path = location.pathname;
  let pathnames = path.split('/').slice(1).map(i => +i);
  let node = tree;
  if (node)
  pathnames.forEach((p) => {
    let n = node.nodes.concat(node.floating_nodes).find((i) => i.id === +p);
    if (n) {
      node = n;
    } else {
      console.log(26, node, p);
    }
  });

  console.log(pathnames, node);

  let outputId = pathnames[0];

  let view;
  switch (node.type) {
    case 'output':
      view = <OutputView tree={node} depth={depth + 1} path={`/${node.id}`} />
      break;
    case 'con':
      view = <ContainerView tree={node as I3Container} depth={depth + 1} path={`${path}/${node.id}`} /> 
      break;
    case 'workspace':
      view = <WorkspaceView tree={node as I3Workspace} depth={depth + 1} path={`${path}/${node.id}`} /> 
      break;
  }

  return (
    <Container
      color={Colors[depth % 12]}
    >
      <Segment.Group>

        <Segment.Group horizontal>
          <Segment>{tree.type}</Segment>
          <Segment>{tree.id}</Segment>
          <Segment>{tree.name}</Segment>
        <Segment>{tree.layout}</Segment>
        </Segment.Group>

        <Menu attached widths={tree.nodes.length as SemanticWIDTHSNUMBER}>
          {tree.nodes.map((node) =>
            <Menu.Item key={node.id} as={Link} to={`/${node.id}`} active={node.id === outputId}>
              {node.name || node.id}
            </Menu.Item>
          )}
        </Menu>

        {view}

{/* 
        <Switch>
          {tree.nodes.map((node) =>
            <Route key={node.name} path={`/${node.id}`}>
            </Route>
          )}
        </Switch> */}
      </Segment.Group>
    </Container>
  )
}

export default Tree;