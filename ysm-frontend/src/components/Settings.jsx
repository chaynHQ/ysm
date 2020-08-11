import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Box,Typography, Button, TextField } from '@material-ui/core';
import firebase from '../config/firebase';

import SignIn from './SignIn';

import { setSettingsAuth, fetchBookmarks } from '../store/actions';


const Settings = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   const resetPassword = (newPassword) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updatePassword(newPassword).then(function() {
                // Update successful.
            }).catch(function(error) {
                if(error.code === 'auth/weak-password'){
                    //Show some sort of weak password message
                } else if( error.code === 'auth/requires-recent-login'){
                    props.setSettingsAuth(false)
                }
                else {
                    throw error
                }
            });
        } else {
          // No user is signed in.
        }
      }); 
   }

   const resetEmail = (newEmail) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateEmail(newEmail).then(function() {
                // Update successful.
            }).catch(function(error) {
                if( error.code === 'auth/requires-recent-login'){
                    props.setSettingsAuth(false)
                }
                else {
                    throw error
                }
            });
        } else {
          // No user is signed in.
        }
      }); 
   }

   const updateName = (newName) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateProfile({
                displayName: newName,
              }).then(function() {
                // Update successful.
            }).catch(function(error) {
                    throw error
            });
        } else {
          // No user is signed in.
        }
      }); 
   }


  return (
    <Box display="flex" flexDirection="column" height={1}>
        <Typography>Settings</Typography>
        { props.settingsAuth ? 
        <Box>
            <Box>
                <TextField 
                    id="standard-basic" 
                    placeholder={props.user.displayName} 
                    helperText="Display Name" 
                    onChange={(event)=>{
                        setName(event.target.value)
                    }} 
                />
                <Button onClick={() => {updateName(name) }}>
                    Update
                </Button>
            </Box>
            <Box>
                <TextField 
                    id="standard-basic" 
                    placeholder={props.user.email} 
                    helperText="Email" 
                    onChange={(event)=>{
                        setEmail(event.target.value)
                    }} 
                />
                <Button onClick={() => { resetEmail(email) }}>
                    Update
                </Button>
            </Box>
            <Box>
                <TextField 
                    id="standard-basic"  
                    helperText="Password" 
                    onChange={(event)=>{
                        setPassword(event.target.value)
                    }} 
                />
                <Button onClick={() => { resetPassword(password) }}>
                    Update
                </Button>
            </Box>
            <Button onClick={() => { props.fetchBookmarks()}}>
                    Get Bookmarks
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
    // settingsAuth: true
});

const mapDispatchToProps = (dispatch) => ({
    setSettingsAuth: (bool) => dispatch(setSettingsAuth(bool)),
    fetchBookmarks: () => dispatch(fetchBookmarks())

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
