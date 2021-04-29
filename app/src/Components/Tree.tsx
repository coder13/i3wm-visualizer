import React from 'react';
import { SemanticCOLORS, Segment, Divider } from 'semantic-ui-react'
import Container from './Container';
import Workspace from './Workspace';
import RectView from './Rect';

export const Colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export const printNodes = (nodes: Array<I3Node>, depth: number) =>
  nodes.map((node: I3Node) => {
    switch (node.type) {
      case 'con':
        return <Container key={node.id} tree={node as I3Container} depth={depth + 1}/>
      case 'workspace':
        return <Workspace key={node.id} tree={node as I3Workspace} depth={depth + 1} />
      default:
        return <Tree key={node.id} tree={node} depth={depth + 1} />
    }
  });

interface TreeProps {
  tree: I3Node;
  depth: number;
};

const Tree: React.FC<TreeProps> = ({ tree, depth = 0 }) => {
  const color = Colors[depth % 12];

  return (
    <Segment.Group>
      <Segment inverted color={color}/>
      <Segment.Group horizontal>
        <Segment>type: {tree.type}</Segment>
        <Segment>id: {tree.id}</Segment>
        <Segment>name: {tree.name}</Segment>
        <Segment>border: {tree.border}</Segment>
        <Segment>current_border_width: {tree.current_border_width}</Segment>
        <Segment>layout: {tree.layout}</Segment>
        <Segment>last_split_layout: {tree.last_split_layout}</Segment>
        <Segment>workspace_layout: {tree.workspace_layout}</Segment>
        <Segment>orientation: {tree.orientation}</Segment>
        <Segment>percent: {tree.percent}</Segment>
      </Segment.Group>
      <RectView name="rect" rect={tree.rect}/>
      <RectView name="window_rect" rect={tree.window_rect}/>
      <RectView name="deco_rect" rect={tree.deco_rect}/>
      <RectView name="geometry" rect={tree.geometry}/>
      <Segment.Group horizontal>
        <Segment>window: {tree.window === null ? 'null' : tree.window}</Segment>
        <Segment>window_type: {tree.window_type === null ? 'null' : tree.window_type}</Segment>
      </Segment.Group>
      {tree.window_properties && (
        <Segment.Group horizontal>
          <Segment>title: {tree.window_properties.title}</Segment>
          <Segment>instance: {tree.window_properties.instance}</Segment>
          <Segment>class: {tree.window_properties.class}</Segment>
          <Segment>window_role: {tree.window_properties.window_role}</Segment>
          <Segment>machine: {tree.window_properties.machine}</Segment>
          <Segment>transient_for: {tree.window_properties.transient_for}</Segment>
        </Segment.Group>
      )}
      <Segment>marks: [{tree.marks.join(', ')}]</Segment>
      <Segment>focus: [{tree.focus.join(', ')}]</Segment>
      <Segment.Group horizontal>
        <Segment>urgent: {tree.urgent}</Segment>
        <Segment>focused: {tree.focused}</Segment>
        <Segment>fullscreen_mode: {tree.fullscreen_mode}</Segment>
        <Segment>floating: {tree.floating}</Segment>
        <Segment>sticky: {tree.sticky}</Segment>
        <Segment>scratchpad_state: {tree.scratchpad_state}</Segment>
        <Segment>swallows: [{tree.swallows.map((i) => JSON.stringify(i)).join(', ')}]</Segment>
      </Segment.Group>
      <Segment>
        {'nodes: '}
        <br />
        {tree.nodes.length
          ? printNodes(tree.nodes, depth)
          : 'none'
        }
      </Segment>
    </Segment.Group>
  )
}

export default Tree;