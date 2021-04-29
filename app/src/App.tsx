import React, { useState, useEffect } from 'react';
import './App.css';

const serverURI = 'http://localhost:8080'

function App() {
  const [tree, setTree] = useState<I3Node | undefined>(undefined);
  const [error, setError] = useState<Error>();

  const fetchTree = () =>
    fetch(`${serverURI}/get_tree`)
      .then((data) => data.json())
      .then((data) => setTree(data))
      .catch((error) => {
        console.error(error);
        setError(error);
      });

  useEffect(() => {
    fetchTree();
  }, []);

  tree && console.log(Object.keys(tree));

  return (
    <div className="App">
      {error && error.message && <p className="error">{error.name}<br/>{error.message}<br/>{error.stack}</p>}
      {tree && <Tree tree={tree} /> }
    </div>
  );
}

interface TreeProps {
  tree: I3Node | I3Output;
};

const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <ul>
      <hr />
      <li key={'id'}>id: {JSON.stringify(tree['id'])}</li>
      <li key={'type'}>type: {JSON.stringify(tree['type'])}</li>
      <li key={'orientation'}>orientation: {JSON.stringify(tree['orientation'])}</li>
      <li key={'scratchpad_state'}>scratchpad_state: {JSON.stringify(tree['scratchpad_state'])}</li>
      <li key={'percent'}>percent: {JSON.stringify(tree['percent'])}</li>
      <li key={'urgent'}>urgent: {JSON.stringify(tree['urgent'])}</li>
      <li key={'marks'}>marks: {JSON.stringify(tree['marks'])}</li>
      <li key={'focused'}>focused: {JSON.stringify(tree['focused'])}</li>
      <li key={'layout'}>layout: {JSON.stringify(tree['layout'])}</li>
      <li key={'workspace_layout'}>workspace_layout: {JSON.stringify(tree['workspace_layout'])}</li>
      <li key={'last_split_layout'}>last_split_layout: {JSON.stringify(tree['last_split_layout'])}</li>
      <li key={'border'}>border: {JSON.stringify(tree['border'])}</li>
      <li key={'current_border_width'}>current_border_width: {JSON.stringify(tree['current_border_width'])}</li>
      <li key={'rect'}>rect: {JSON.stringify(tree['rect'])}</li>
      <li key={'deco_rect'}>deco_rect: {JSON.stringify(tree['deco_rect'])}</li>
      <li key={'window_rect'}>window_rect: {JSON.stringify(tree['window_rect'])}</li>
      <li key={'geometry'}>geometry: {JSON.stringify(tree['geometry'])}</li>
      <li key={'name'}>name: {JSON.stringify(tree['name'])}</li>
      <li key={'window'}>window: {JSON.stringify(tree['window'])}</li>
      <li key={'window_type'}>window_type: {JSON.stringify(tree['window_type'])}</li>
      
      <li key={'nodes'}>{'nodes: '}
        {tree.nodes.length
          ? tree.nodes.map((node: I3Node) =>
            <Tree key={node.id} tree={node} />
          )
          : 'none'
        }
      </li>

      <li key={'floating_nodes'}>floating_nodes: {JSON.stringify(tree['floating_nodes'])}</li>
      <li key={'focus'}>focus: {JSON.stringify(tree['focus'])}</li>
      <li key={'fullscreen_mode'}>fullscreen_mode: {JSON.stringify(tree['fullscreen_mode'])}</li>
      <li key={'sticky'}>sticky: {JSON.stringify(tree['sticky'])}</li>
      <li key={'floating'}>floating: {JSON.stringify(tree['floating'])}</li>
      <li key={'swallows'}>swallows: {JSON.stringify(tree['swallows'])}</li>
  </ul>
  )
}

export default App;
