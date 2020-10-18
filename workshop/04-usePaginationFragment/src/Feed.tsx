import React, { useCallback } from 'react';

import { Flex } from 'rebass';

import { usePaginationFragment, graphql } from 'react-relay/hooks';

import InfiniteScroll from 'react-infinite-scroller';

import Post from './Post';

import { Feed_query } from './__generated__/Feed_query.graphql';

import Loading from './Loading';

type Props = {
  query: Feed_query;
};
// eslint-disable-next-line
const Feed = (props: Props) => {
  /**
   * TODO
   * usePaginationFragment to fetch posts and paginate
   */
  const { data, isLoadingNext, loadNext } = usePaginationFragment(
    graphql`
      fragment Feed_query on Query
        @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
        @refetchable(queryName: "FeedPaginationQuery") {
        posts(first: $first, after: $after) @connection(key: "Feed_posts", filters: []) {
          endCursorOffset
          startCursorOffset
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              ...Post_post
            }
          }
        }
      }
    `,
    props.query,
  );
  const { posts } = data;

  /**
   * TODO
   * fix loadMore callback to loadMore posts
   */
  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <Flex flexDirection='column'>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={posts.pageInfo.hasNextPage}
        loader={<Loading />}
        useWindow
      >
        {posts.edges.map(({ node }) => (
          <Post key={node.id} post={node} />
        ))}
      </InfiniteScroll>
    </Flex>
  );
};

export default Feed;
