import {
  Box, Button, Dialog, InputAdornment, LinearProgress, makeStyles, TextField, Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useWindowDimensions from '../shared/dimensions';
import { axiosGet } from '../store/axios';
import theme from '../styles/theme';
import ResourceCard from './ResourceCard';

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

const Search = ({ shown, container }) => {
  const { height, width } = useWindowDimensions();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('noSearch');

  const getSearchResults = async (param) => {
    if (param.length >= 1) {
      setSearchStatus('searching');
      const response = await axiosGet('resources', {
        params: {
          q: param,
        },
      });
      if (response.length < 1) {
        setSearchStatus('noResults');
      } else {
        setSearchStatus('hasResults');
        setSearchResults(response);
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
        slug={resource.slug}
        savingRedirectUrl="/search"
      />
    ));
  }

  return (
    <Dialog
      open={shown}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.light,
          position: 'absolute',
          padding: 0,
          margin: 0,
        },
      }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        container: container.current,
        style: { position: 'absolute' },
      }}
      maxWidth="xl"
    >
      <Box height={height} width={width} p={2}>
        <Box
          display="flex"
          flexDirection="column"
          direction="column"
          height={height * 0.125}
        >
          <TextField
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
        </Box>
        <Box height={height * 0.875} overflow="scroll">
          {content}
        </Box>
      </Box>

    </Dialog>
  );
};

Search.propTypes = {
  container: PropTypes.objectOf(PropTypes.any).isRequired,
  shown: PropTypes.bool,
};

Search.defaultProps = {
  shown: false,
};

export default Search;
