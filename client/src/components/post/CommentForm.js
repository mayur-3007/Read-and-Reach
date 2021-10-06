import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import {
  TextField,
  Button,
  Grid,
  CssBaseline,
  Container,
  Box,
  Typography,
} from '@mui/material';
import 'typeface-cormorant';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      backgroundColor: '#eeeeee',
    },
  },
});

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='column'>
        <Grid item>
          <Typography
            fontStyle={{ fontFamily: ['Cormorant', 'serif'].join(',') }}
            component='h1'
            variant='h3'
            align='left'
            gutterBottom
            noWrap
          >
            Leave a comment
          </Typography>
        </Grid>
        <Grid item>
          <Box
            component='form'
            onSubmit={(e) => {
              e.preventDefault();
              addComment(postId, { text });
              setText('');
            }}
            sx={{ mt: 1 }}
          >
            <Grid item>
              <TextField
                variant='outlined'
                placeholder='Create a post'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                fullWidth
                multiline
                rows={5}
              />
            </Grid>
            <Grid item>
              <Button type='submit' variant='outlined' sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

/* 
<div class='post-form'>
      <div class='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
*/
