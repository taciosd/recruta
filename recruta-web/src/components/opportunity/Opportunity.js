import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem, useTheme, makeStyles } from '@material-ui/core';
import { EditableControl } from '../util/EditableControl';
import { useLocation, useParams } from 'react-router-dom';
import api from './../../services/api';
import DateUtil from '../../util/date';

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
    const CREATE = "create";
    const theme = useTheme();
    const classes = useStyle(theme);
    const location = useLocation();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState('');
    const [groups, setGroups] = useState({});
    const [tags, setTags] = useState([]);
    
    const [isEditing, setIsEditing] = useState(id === CREATE);

    useEffect(() => {
        let opportunity;
        if (id === CREATE) {
            // New
            opportunity = {
                title: "",
                description: "",
                group: "",
                tags: []
            };
            setIsEditing(true);
            setGroups(location.state.groups);
        }
        else if (typeof location.state !== 'undefined') {
            opportunity = location.state.opportunity;
            setGroups(location.state.groups);

            setTitle(opportunity.title);
            setDescription(opportunity.description);
            setGroup(opportunity.group);
            setTags(opportunity.tags);
        }
        else {
            async function fetchOpportunity() {
                const res = await api.get(`/opportunities/${id}`);
                return res.data;
            }

            fetchOpportunity()
            .then(data => {
                opportunity = data.opportunity;
                setGroups(data.groups);

                setTitle(opportunity.title);
                setDescription(opportunity.description);
                setGroup(opportunity.group);
                setTags(opportunity.tags);
            });
        }
    }, [location, id]);

    function saveOpportunity() {
        let path = '/opportunities';
        if (id !== CREATE) {
            path += `/${id}`;
        }

        return new Promise( async (resolve, reject) => {
            try {
                await api.post(path, {
                    title,
                    description,
                    creationDate: new DateUtil().getCurrentDate(),
                    group,
                    tags
                });
    
                resolve();
            }
            catch(err) {
                reject(err);
            }
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
                        value={group}
                        onChange={handleGroupChange}
                    >
                        <MenuItem value="" disabled>
                        Group
                        </MenuItem>
                        {
                            Object.keys(groups).forEach((key,index) => {
                                return (
                                    <MenuItem key={index} value={key}>{groups[key]}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </Grid>
            </Grid>
            <EditableControl 
                edit={isEditing}
                onEdit={(editing) => setIsEditing(editing)} 
                onSave={() => saveOpportunity()} />
        </Container>
    );
}