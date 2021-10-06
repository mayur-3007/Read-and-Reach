import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '70%',
  maxHeight: '70%',
});

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 900, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt='complex' src={avatar} />
          </ButtonBase>
          <Typography gutterBottom variant='subtitle1' component='div'>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {text}
              </Typography>
            </Grid>
            <Grid item>
              {showActions && (
                <Fragment>
                  <IconButton onClick={(e) => addLike(_id)}>
                    <ThumbUpIcon />{' '}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </IconButton>
                  <IconButton onClick={(e) => removeLike(_id)}>
                    <ThumbDownIcon />
                  </IconButton>
                  <IconButton>
                    <Link to={`/posts/${_id}`}>
                      {comments.length > 0 ? (
                        <p>{comments.length} comments</p>
                      ) : (
                        <p>Add Comment</p>
                      )}
                    </Link>
                  </IconButton>
                  {!auth.loading && user === auth.user._id && (
                    <IconButton onClick={(e) => deletePost(_id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </Fragment>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='body2' color='text.secondary'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
