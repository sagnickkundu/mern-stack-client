import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const [data, setData] = useState([])
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    Axios.get("https://share-memories-123.herokuapp.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);

  console.log(data);

  return 'No Posts';

  if (!posts.length && !isLoading) return 'No posts';
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts