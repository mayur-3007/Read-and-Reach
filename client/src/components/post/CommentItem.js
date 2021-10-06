import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '70%',
  maxHeight: '70%',
});

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
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
              {!auth.loading && user === auth.user._id && (
                <IconButton onClick={(e) => deleteComment(postId, _id)}>
                  {' '}
                  Remove
                </IconButton>
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

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
