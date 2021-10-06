import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Pagination from './Pagination';

import {
  CssBaseline,
  Grid,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [toggleButton, setToggleButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  //get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (e, pageNumber) => setCurrentPage(pageNumber);

  return loading ? (
    <Spinner />
  ) : (
    <Box>
      <Grid container direction='column'>
        <Grid item>
          {toggleButton === true ? (
            <IconButton onClick={(e) => setToggleButton(false)}>
              <AddCircleOutlinedIcon color='info' fontSize='large' />{' '}
              <Typography variant='h5'>Add Post</Typography>
            </IconButton>
          ) : (
            <IconButton onClick={(e) => setToggleButton(true)}>
              <RemoveCircleOutlinedIcon color='info' fontSize='large' />{' '}
              <Typography variant='h5'>Cancel</Typography>
            </IconButton>
          )}
        </Grid>
        <Grid item>{!toggleButton && <PostForm />}</Grid>
      </Grid>
      <Grid container direction='column' sx={{ paddingY: 5 }}>
        <Grid item>
          {currentPosts.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })}
        </Grid>
        <Grid item sx={{ paddingY: 5 }}>
          <Pagination
            postPerPage={postPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
