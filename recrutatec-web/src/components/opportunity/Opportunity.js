import React, { useState } from 'react';
import { Container, Grid, TextField, useTheme, makeStyles } from '@material-ui/core';
import { EditableControl } from '../util/EditableControl';
//import api from './../../services/api';

const useStyle = makeStyles(theme => ({
    root: {
    },
}));

export default function Opportunity(props) {
    const theme = useTheme();
    const classes = useStyle(theme);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState('');
    const [tags, setTags] = useState([]);


    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={theme.spacing(0.25)}>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={true}
                        label="Título"
                        onChange={event => setTitle(event.target.value)}
                        value={title}
                    />
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={true}
                        label="Descrição"
                        multiline
                        rows="10"
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                    />
                    
                </Grid>
            </Grid>
            <EditableControl />
        </Container>
    );
}