import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Box,Typography, Button, TextField } from '@material-ui/core';
import firebase from '../config/firebase';

import SignIn from './SignIn';


const Settings = (props) => {

    const [name, setName] = useState(props.user.displayName)


  return (
    <Box display="flex" flexDirection="column" height={1}>
        <Typography>Settings</Typography>
        { props.settingsAuth ? 
            <Box>
            <TextField 
                id="standard-basic" 
                placeholder={name} 
                helperText="Display Name" 
                onChange={(event)=>{
                    setName(event.target.value)
                }} 
            />
            <Button onClick={() => { alert('clicked') }}>
                Update
            </Button>
        </Box>
        :
        <SignIn redirectUrl = '/settings' />

    }
    </Box>
  );
};

const mapStateToProps = (state) => ({
    user: state.user,
    settingsAuth: state.user.settingsAuth
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
