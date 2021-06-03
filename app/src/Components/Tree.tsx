import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SemanticCOLORS, Grid, Message, List } from 'semantic-ui-react';
import RootView from './Root';
import ContainerView from './Container';
import WorkspaceView from './Workspace';

export const Colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

interface TreeProps {
  tree: I3Node;
  path: string;
};

const Icons = {
  'root': <List.Icon name="home" />,
  'output': <List.Icon name="desktop" />,
  'con': <List.Icon name="sitemap" />,
  'floating_con': <List.Icon name="sitemap" />,
  'workspace': <List.Icon name="columns" />,
  'dockarea': <List.Icon name="window minimize" />,
};

const Tree: React.FC<TreeProps> = ({ tree, path }) => {
  // @ts-ignore
  const icon = Icons[tree.type] ? Icons[tree.type] : <List.Icon name="user"/>;

  return (
    <List.Item>
      {icon}
      <List.Content>
        <List.Header as={Link} to={`${path}/${tree.id}`}>{tree.type} {tree.name && `(${tree.name})`}</List.Header>
        <List.Description></List.Description>
        <List.List>
          {tree.nodes.concat(tree.floating_nodes).map((node) => (
            <Tree key={node.id} tree={node} path={`${path}/${tree.id}`} />
          ))}
        </List.List>
      </List.Content>
    </List.Item>
  )
}

const renderNode = (node: I3Node) => {
  console.log(node.type);
  switch (node.type) {
    case 'con':
      return <ContainerView node={node as I3Container} />
    case 'workspace':
      return <WorkspaceView node={node as I3Workspace} />
    case 'root':
    case 'output':
    case 'dockarea':
      return <RootView node={node} />
    default:
      return (
        <Message error>
          Unsupported node type: {node.type}
        </Message>
      );
  }
}

interface RootTreeProps {
  tree: I3Node;
};

const RootTree: React.FC<RootTreeProps> = ({ tree }) => {
  const location = useLocation();
  let path = location.pathname;
  let pathnames = path.split('/').slice(1).map(i => +i);
  let node = tree;
  if (node)
  pathnames.forEach((p) => {
    let n = node.nodes.concat(node.floating_nodes).find((i) => i.id === +p);
    if (n) {
      node = n;
    }
  });

  return (
    <Grid
      columns={2}
      divided
      style={{
        height: '100%',
      }}
    >
      <Grid.Row style={{
        height: '100%',
        paddingTop: 0,
      }}>
        <Grid.Column width={6} style={{
          height: '100%',
          overflow: 'auto',
        }}>
          <List style={{
            margin: '1em',
          }}>
            <Tree tree={tree} path="" />
          </List>
        </Grid.Column>
        <Grid.Column width={10}>
          {renderNode(node)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default RootTree;
