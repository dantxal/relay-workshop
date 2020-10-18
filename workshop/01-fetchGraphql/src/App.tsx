import React, { useCallback, useEffect, useState } from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content, Button } from '@workshop/ui';

import { fetchGraphQL } from './fetchGraphQL';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  /**
   * @TODO
   * Fetch posts to be rendered in this component
   */
  const fetchQuery = useCallback(async () => {
    try {
      const response = await fetchGraphQL(
        `
      query PostQuery {
        posts(first:10) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `,
        {},
      );

      const result = response.data.posts.edges.map(({ node }) => node);
      setPosts(result);
    } catch (err) {
      setError(err.toString());
    }
  }, []);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  if (error) {
    return (
      <Content>
        <Text>Error: {error}</Text>
        <Button mt='10px' onClick={fetchQuery}>
          retry
        </Button>
      </Content>
    );
  }

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Flex flexDirection='column'>
          {posts.map(post => (
            <Card key={post.id} mt='10px' flexDirection='column' p='10px'>
              <Text>id: {post.id}</Text>
              <Text>content: {post.content}</Text>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Button>Prev</Button>
      <Button>Next</Button>
    </Content>
  );
};

export default App;
