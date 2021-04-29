import React from 'react';
import Container from './Container';
import Workspace from './Workspace';

export const printNodes = (nodes: Array<I3Node>) =>
  nodes.map((node: I3Node) => {
    switch (node.type) {
      case 'con':
        return <Container key={node.id} tree={node as I3Container} />
      case 'workspace':
        return <Workspace key={node.id} tree={node as I3Workspace} />
      default:
        return <Tree key={node.id} tree={node} />
    }
  });

interface TreeProps {
  tree: I3Node;
};

const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <ul>
      <hr />
      <li key={'id'}>id: {JSON.stringify(tree['id'])}</li>
      <li key={'name'}>name: {JSON.stringify(tree['name'])}</li>
      <li key={'type'}>type: {JSON.stringify(tree['type'])}</li>
      <li key={'border'}>border: {JSON.stringify(tree['border'])}</li>
      <li key={'current_border_width'}>current_border_width: {JSON.stringify(tree['current_border_width'])}</li>
      <li key={'layout'}>layout: {JSON.stringify(tree['layout'])}</li>
      <li key={'last_split_layout'}>last_split_layout: {JSON.stringify(tree['last_split_layout'])}</li>
      <li key={'workspace_layout'}>workspace_layout: {JSON.stringify(tree['workspace_layout'])}</li>
      <li key={'orientation'}>orientation: {JSON.stringify(tree['orientation'])}</li>
      <li key={'percent'}>percent: {JSON.stringify(tree['percent'])}</li>
      <li key={'rect'}>rect: {JSON.stringify(tree['rect'])}</li>
      <li key={'window_rect'}>window_rect: {JSON.stringify(tree['window_rect'])}</li>
      <li key={'deco_rect'}>deco_rect: {JSON.stringify(tree['deco_rect'])}</li>
      <li key={'geometry'}>geometry: {JSON.stringify(tree['geometry'])}</li>
      <li key={'window'}>window: {JSON.stringify(tree['window'])}</li>
      {tree.window_properties && (
        <li key={'window_properties'}>window_properties: {JSON.stringify(tree['window_properties'])}</li>
        )}
      <li key={'window_type'}>window_type: {JSON.stringify(tree['window_type'])}</li>
      <li key={'urgent'}>urgent: {JSON.stringify(tree['urgent'])}</li>
      <li key={'marks'}>marks: {JSON.stringify(tree['marks'])}</li>
      <li key={'focused'}>focused: {JSON.stringify(tree['focused'])}</li>
      <li key={'focus'}>focus: {JSON.stringify(tree['focus'])}</li>
      <li key={'fullscreen_mode'}>fullscreen_mode: {JSON.stringify(tree['fullscreen_mode'])}</li>
      <li key={'floating'}>floating: {JSON.stringify(tree['floating'])}</li>
      <li key={'nodes'}>{'nodes: '}
        {tree.nodes.length
          ? printNodes(tree.nodes)
          : 'none'
        }
      </li> 
      <li key={'floating_nodes'}>floating_nodes: {JSON.stringify(tree['floating_nodes'])}</li>
      <li key={'sticky'}>sticky: {JSON.stringify(tree['sticky'])}</li>
      <li key={'scratchpad_state'}>scratchpad_state: {JSON.stringify(tree['scratchpad_state'])}</li>
      <li key={'swallows'}>swallows: {JSON.stringify(tree['swallows'])}</li>
  </ul>
  )
}

export default Tree;