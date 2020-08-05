import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Box,Typography, Button, TextField } from '@material-ui/core';


const Settings = (props) => {

    const [name, setName] = useState(props.user.displayName)


  return (
    <Box display="flex" flexDirection="column" height={1}>
        <Typography>Settings</Typography>
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
  );
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
