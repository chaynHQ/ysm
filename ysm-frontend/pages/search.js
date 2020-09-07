import React, { useState } from 'react';

import {
  Box, TextField, makeStyles, Typography, InputAdornment, Button, LinearProgress,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import axiosInstance from '../store/axios';
import ResourceCard from '../components/ResourceCard';

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    paddingLeft: 4,
    marginBottom: 0,
  },
});

const Search = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('noSearch');

  const getSearchResults = async (param) => {
    if (param.length >= 1) {
      setSearchStatus('searching');
      const response = await axiosInstance.get('resources', {
        params: {
          q: param,
        },
      });
      if (response.data.length < 1) {
        setSearchStatus('noResults');
      } else {
        setSearchStatus('hasResults');
        setSearchResults(response.data);
      }
    }
  };

  let content;

  if (searchStatus === 'noSearch') {
    content = <Typography>Use the box above to search</Typography>;
  } else if (searchStatus === 'noResults') {
    content = <Typography>No results</Typography>;
  } else if (searchStatus === 'searching') {
    content = <LinearProgress />;
  } else if (searchStatus === 'hasResults') {
    content = searchResults.map((resource) => (
      <ResourceCard
        id={resource.id}
        title={resource.title}
        subtitle={resource.subtitle}
        image={resource.image}
      />
    ));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      className={classes.container}
      pt={3.5}
      px={2}
    >
      <TextField
        id="outlined-full-width"
        placeholder="Placeholder"
        autoFocus
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={() => { getSearchResults(searchTerm); }}>
                Search
              </Button>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onKeyPress={(event) => (event.key === 'Enter' ? getSearchResults(searchTerm) : null)}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {content}

    </Box>
  );
};

export default Search;