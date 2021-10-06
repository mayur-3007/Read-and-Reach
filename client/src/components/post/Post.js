import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import {
  TextareaAutosize,
  CssBaseline,
  Grid,
  Button,
  Container,
  Box,
} from '@mui/material';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Box>
      <Grid container direction='column'>
        <Grid item>
          <Link to='/posts'>
            <ArrowBackIcon />
          </Link>
        </Grid>
        <Grid item>
          <PostItem post={post} showActions={false} />
        </Grid>
        <Grid item>
          <CommentForm postId={post._id} />
        </Grid>
        <Grid item>
          {post.comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
