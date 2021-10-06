import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Page = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const count = () => {
    let count = 0;
    pageNumbers.map((number) => {
      if (count < number) {
        count = number;
      }
    });
    return count;
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count()} onChange={(e, page) => paginate(e, page)} />
    </Stack>
  );
};

export default Page;
