import React from 'react';
import { Container, Header, Table } from 'semantic-ui-react';

interface ContainerProps {
  node: I3Container;
};
const ContainerView: React.FC<ContainerProps> = ({ node }) => {

  console.log(9, node);

  return (
    <Container fluid style={{
      marginTop: '1em'
    }}>
      <Header as="h2">
        <Header.Content>{node.name}</Header.Content>
        <Header.Subheader>{node.id}</Header.Subheader>
      </Header>

      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='2'>Properties</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Type:</Table.Cell>
            <Table.Cell>{node.type}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Border:</Table.Cell>
            <Table.Cell>{node.border}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Current Border Width:</Table.Cell>
            <Table.Cell>{node.current_border_width}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Layout:</Table.Cell>
            <Table.Cell>{node.layout}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Last Split Layout:</Table.Cell>
            <Table.Cell>{node.last_split_layout}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Workspace Layout:</Table.Cell>
            <Table.Cell>{node.workspace_layout}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {node.window_properties && (
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>Window Properties</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Class</Table.Cell>
              <Table.Cell>{node.window_properties.class}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Instance</Table.Cell>
              <Table.Cell>{node.window_properties.instance}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>{node.window_properties.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Transient For</Table.Cell>
              <Table.Cell>{node.window_properties.transient_for || 'null'}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export default ContainerView;
