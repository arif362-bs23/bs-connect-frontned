import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { newsFeedService } from '../services/NewsFeedService';
import PostCard from '../components/post/PostCard';
import { toast } from 'react-toastify';

const NewsFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await newsFeedService.getNewsFeed(page);

      const postArray = data.posts || [];

      setPosts((prevPosts) => {
        const existingPostIds = new Set(prevPosts.map((p) => p.id));
        const newPosts = postArray.filter((p) => !existingPostIds.has(p.id));
        return [...prevPosts, ...newPosts];
      });

      // Check pagination before incrementing page
      if (data.next) {
        setPage((prevPage) => prevPage + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Failed to fetch news feed:', error);
      setError('Failed to fetch news feed.');
      toast.error('Failed to fetch news feed.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
      <div className="max-w-2xl mx-auto py-8">
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">Loading...</h4>}
            endMessage={
              <p className="text-center my-4">
                <b>Yay! You have seen it all</b>
              </p>
            }
        >
          {posts.map((post) => (
              <PostCard key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
  );
};

export default NewsFeedPage;