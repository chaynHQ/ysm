import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import React from 'react';
import downloadPDF from '../shared/download-pdf';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const DownloadButton = ({
  item,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      className={classes.button}
      startIcon={<GetAppIcon />}
      onClick={() => { downloadPDF(item); }}
    >
      Download as PDF
    </Button>
  );
};

DownloadButton.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DownloadButton;
