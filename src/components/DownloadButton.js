import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import React from 'react';
import analyticsEvent from '../shared/analyticsEvent';
import downloadPDF from '../shared/download-pdf';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const DownloadButton = ({ item }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      className={classes.button}
      startIcon={<GetAppIcon />}
      onClick={() => {
        downloadPDF(item);

        analyticsEvent('download_pdf', {
          item_id: item.id,
        });
      }}
    >
      Download as PDF
    </Button>
  );
};

DownloadButton.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DownloadButton;
