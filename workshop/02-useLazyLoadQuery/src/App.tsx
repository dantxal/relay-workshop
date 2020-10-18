import React from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content } from '@workshop/ui';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { AppQuery } from './__generated__/AppQuery.graphql';

const App = () => {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($first: Number) {
        posts(first: $first) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `,
    { first: 5 },
  );

  const { posts } = data;

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Flex flexDirection='column'>
          {posts.edges.map(({ node }) => (
            <Card key={node.id} mt='10px' flexDirection='column' p='10px'>
              <Text>id: {node.id}</Text>
              <Text>content: {node.content}</Text>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Content>
  );
};

export default App;
