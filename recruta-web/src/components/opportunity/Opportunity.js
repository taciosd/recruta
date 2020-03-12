import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem, useTheme, makeStyles } from '@material-ui/core';
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
    const [groups, setGroups] = useState([]);
    const [tags, setTags] = useState([]);
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let opportunity;
        if (typeof location.state === 'undefined') {
            async function fetchOpportunity() {
                const res = await api.get(`/opportunities/${id}`);
                return res.data;
            }

            fetchOpportunity()
            .then(op => opportunity = op);
        }
        else if (location.state.opportunity) {
            opportunity = location.state.opportunity;
        }
        else {
            // New
            opportunity = {
                title: "",
                description: "",
                group: "",
                tags: []
            };
        }

        setTitle(opportunity.title);
        setDescription(opportunity.description);
        setGroup(opportunity.group);
        setTags(opportunity.tags);

        //const { Groups } = opportunity.statics;
        //setGroups(Object.values(Groups));
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

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    
    const handleGroupChange = (event) => {
        setGroup(event.target.value);
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
                        onChange={handleTitleChange}
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
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        displayEmpty
                        onChange={handleGroupChange}
                        value={group}
                    >
                        <MenuItem value="" disabled>
                        Group
                        </MenuItem>
                        {
                            groups.map((value, i) => {
                                return (
                                    <MenuItem key={i} value={value}>{value}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </Grid>
            </Grid>
            <EditableControl 
                onEdit={(editing) => setIsEditing(editing)} 
                onSave={() => saveOpportunity()} />
        </Container>
    );
}