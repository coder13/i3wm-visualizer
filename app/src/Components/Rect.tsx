import React from 'react';
import { Segment } from 'semantic-ui-react'

interface RectProps {
  name: string;
  rect: Rect;
};
  
const RectView : React.FC<RectProps> = ({ name, rect }) => {
  return (
    <Segment.Group horizontal>
      <Segment style={{ maxWidth: '11em' }}>{name}</Segment>
      <Segment style={{ maxWidth: '11em' }}>{rect.x}</Segment>
      <Segment style={{ maxWidth: '11em' }}>{rect.y}</Segment>
      <Segment style={{ maxWidth: '11em' }}>{rect.width}</Segment>
      <Segment style={{ maxWidth: '11em' }}>{rect.height}</Segment>
    </Segment.Group>
  )
};

export default RectView;
