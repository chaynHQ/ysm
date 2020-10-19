import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Clear } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useWindowDimensions from '../shared/dimensions';
import { axiosGet } from '../store/axios';
import theme from '../styles/theme';
import ResourceCard from './ResourceCard';

const Search = ({ shown, container, closeModal }) => {
  const { height, width } = useWindowDimensions();
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
    content = <LinearProgress color="secondary" />;
  } else if (searchStatus === 'hasResults') {
    content = (
      <>
        <Typography variant="h1">Results: </Typography>
        {searchResults.map((resource) => (
          <ResourceCard
            id={resource.id}
            title={resource.title}
            subtitle={resource.subtitle}
            image={resource.image}
            slug={resource.slug}
            savingRedirectUrl="/search"
          />
        ))}
      </>
    );
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
      <Box height={height} width={width} display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          boxShadow={2}
          p={2}
        >

          <IconButton onClick={() => { closeModal(false); }}>
            <ArrowBack />
          </IconButton>
          <Box flexGrow={1} pl={3}>
            <TextField
              placeholder="Search YSM..."
              autoFocus
              fullWidth
              margin="none"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                    searchStatus === 'hasResults' || searchStatus === 'searching'
                      ? (
                        <IconButton onClick={() => { setSearchResults([]); setSearchStatus('noSearch'); setSearchTerm(''); }}><Clear /></IconButton>

                      ) : (
                        <Button onClick={() => { getSearchResults(searchTerm); }}>
                          Search
                        </Button>
                      )
              }
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              value={searchTerm}
              onKeyPress={(event) => (event.key === 'Enter' ? getSearchResults(searchTerm) : null)}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Box>
        </Box>
        <Box p={2} flexGrow={1} overflow="scroll">
          {content}
        </Box>
      </Box>

    </Dialog>
  );
};

Search.propTypes = {
  container: PropTypes.objectOf(PropTypes.any).isRequired,
  shown: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

Search.defaultProps = {
  shown: false,
};

export default Search;
