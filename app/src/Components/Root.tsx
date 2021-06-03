import React from 'react';
import { Container, Header, Table } from 'semantic-ui-react';

interface RootViewProps {
  node: I3Node;
};  

const RootView: React.FC<RootViewProps> = ({ node }) => {

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
    </Container>
  )
}

export default RootView;
