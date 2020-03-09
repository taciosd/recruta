import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, useTheme, makeStyles } from '@material-ui/core';
import { EditableControl } from '../util/EditableControl';
import { useLocation, useParams } from 'react-router-dom';
import api from './../../services/api';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(10),
        },
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
        }
    },
}));

export default function Opportunity(props) {
    const theme = useTheme();
    const classes = useStyle(theme);
    const location = useLocation();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState('Engenharia');
    const [tags, setTags] = useState([]);
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (typeof location.state === 'undefined') {
            async function fetchOpportunity() {
                const res = await api.get(`/opportunities/${id}`);
                return res.data;
            }

            fetchOpportunity()
            .then(opportunity => {
                setTitle(opportunity.title);
                setDescription(opportunity.description);
                setGroup(opportunity.group);
                setTags(opportunity.tags);
            });
        }
        else {
            setTitle(location.state.opportunity.title);
            setDescription(location.state.opportunity.description);
            setGroup(location.state.opportunity.group);
            setTags(location.state.opportunity.tags);
        }
    }, [location, id]);

    function saveOpportunity() {
        return new Promise( async (resolve, reject) => {
            await api.post(`/opportunities/${id}`, {
                title,
                description,
                group,
                tags
            });
            resolve();
        });
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={theme.spacing(0.25)}>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="Título"
                        onChange={event => setTitle(event.target.value)}
                        value={title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="Descrição"
                        multiline
                        rows="10"
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                    />
                </Grid>
            </Grid>
            <EditableControl 
                onEdit={(editing) => setIsEditing(editing)} 
                onSave={() => saveOpportunity()} />
        </Container>
    );
}