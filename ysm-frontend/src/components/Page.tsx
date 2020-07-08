import React from 'react';
import styles from '../styles/page.module.css';
import {Container, Button, makeStyles} from '@material-ui/core';
import logo from '../assets/logo.png';

// TODO: Set background
// TODO: Set styles
const Page = () => (
    <Container>
        <img src={logo} alt={'Your story matters logo'} />
        <p>If you’ve been treated in a way that has made you feel uncomfortable or violated, use YSM to find out how to get support.</p>
        <p>Let YSM be your companion because You Are Not Alone.</p>
        <Button>START YOUR JOURNEY</Button>
    </Container>
);

export default Page;