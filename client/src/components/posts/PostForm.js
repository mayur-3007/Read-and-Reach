import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  CssBaseline,
  Grid,
  Button,
  Container,
  Box,
} from '@mui/material';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Grid container direction='column'>
      <Grid item>
        <Box
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
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
              rows={3}
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
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
