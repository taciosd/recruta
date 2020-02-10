import React from 'react';
import { 
        Container, 
        Grid,
        TextField, 
        makeStyles,
        useTheme,
        Button,
        CircularProgress,
        Fab } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from '../services/api';


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
    },
    action: {
        marginTop: theme.spacing(2),
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    fab: {
        position: 'relative',
    }
}));

export default function Curriculum(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const location = useLocation();

    const [name, setName] = useState(location.state.cand.name);
    const [email, setEmail] = useState(location.state.cand.email);
    const [cpf, setCpf] = useState(location.state.cand.cpf);
    const [linkedinUrl, setLinkedinUrl] = useState(location.state.cand.linkedin_url);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
//    const [isSaved, setSaved] = useState(false);

    async function saveCandidate() {
//        setSaved(false);
        setIsSaving(true);
        const res = await axios.post(`/candidates/${location.state.cand._id}`, {
            ...location.state.cand,
            name: name,
            email: email,
            cpf: cpf,
            linkedin_url: linkedinUrl,
        });
        const savedCandidate = res.data;
        location.state.cand = savedCandidate;
        setIsSaving(false);
//        setSaved(true);
    }

    return (
        <Container maxWidth="xs" className={classes.root}>
            <Grid container 
                spacing={theme.spacing(0.25)}>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="CPF"
                        value={cpf} 
                        onChange={event => setCpf(event.target.value)}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="LinkedIn"
                        value={linkedinUrl} 
                        onChange={event => setLinkedinUrl(event.target.value)}
                        />
                </Grid>
            </Grid>
            <Button className={classes.action}
                variant="outlined"
                type="submit" 
                fullWidth
                color="primary"
                disabled={isSaving}
                onClick={saveCandidate}
            >
            Salvar
            </Button>
            {isSaving && <CircularProgress 
                            size={24} 
                            className={classes.buttonProgress} />}
            <div className={classes.fab}>
                <Fab
                    aria-label="save"
                    color="primary"
                    //className={buttonClassname}
                    hidden={isEditing}
                    onClick={setIsEditing}
                >
                    <Edit />
                </Fab>
            </div>
        </Container>
    );
};