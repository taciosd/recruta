import React, { useEffect } from 'react';
import { Container, 
        Grid,
        TextField, 
        makeStyles,
        useTheme } from '@material-ui/core';
import { useState } from 'react';
import { EditableControl } from './../util/EditableControl';
import axios from '../../services/api';
import { useLocation, useParams } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
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

export default function Curriculum(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const location = useLocation();
    const { id } = useParams();

    //var linkedinPopup;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [curriculumContent, setCurriculumContent] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (typeof location.state === 'undefined') {
            async function fetchCandidate() {
                const res = await axios.get(`/candidates/${id}`);
                return res.data;
            }

            fetchCandidate()
            .then(candidate => {
                setName(candidate.name);
                setEmail(candidate.email);
                setCpf(candidate.cpf);
                setLinkedinUrl(candidate.linkedin_url);
                setCurriculumContent(candidate.curriculum_content);
            });
        }
        else {
            setName(location.state.cand.name);
            setEmail(location.state.cand.email);
            setCpf(location.state.cand.cpf);
            setLinkedinUrl(location.state.cand.linkedin_url);
            setCurriculumContent(location.state.cand.curriculum_content);
        }
    }, [location, id]);

    async function saveCandidate() {
        await new Promise(() => setTimeout(this, 4000))
        await axios.post(`/candidates/${id}`, {
            name: name,
            email: email,
            cpf: cpf,
            linkedin_url: linkedinUrl,
            curriculum_content: curriculumContent,
        });
    }

/*
    function authenticate() {
        const clientId = '77zn01e6hz43ee';
        const callbackUrl = 'http://localhost:3000/candidates/linkedin/callback';
        this.linkedinPopup = window.open(`https://www.linkedin.com/oauth/v2/authorization?format=json&response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&state=fooobar&scope=r_liteprofile%20r_emailaddress`, '_blank', 'width=600,height=600')
        window.addEventListener('message', this.receiveLinkedInMessage)
    }

    receiveLinkedInMessage = ({ origin, data: { state, code, error, ...rest} }) => {
        if (origin !== window.location.origin || state !== LINKEDIN_STATE) return
    
        if (code) {
          this.props.receiveProviderToken({ provider: PROVIDER.LINKEDIN, token: code })
        } 
        else if (error && !['user_cancelled_login', 'user_cancelled_authorize'].includes(error)) {
          this.props.failToReceiveProviderToken({ provider: PROVIDER.LINKEDIN, error: { error, ...rest} })
        }
        this.popup.close()
      }

    <Button variant="outlined" color="primary" onClick={authenticate}>
        Autenticar no LinkedIn
    </Button>
*/
    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={theme.spacing(0.25)}>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="Nome"
                        onChange={event => setName(event.target.value)}
                        value={name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        type="email"
                        label="Email"
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="CPF"
                        onChange={event => setCpf(event.target.value)}
                        value={cpf} 
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        required 
                        disabled={!isEditing}
                        label="LinkedIn"
                        onChange={event => setLinkedinUrl(event.target.value)}
                        value={linkedinUrl} 
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined"
                        multiline
                        fullWidth
                        required
                        rows={20}
                        disabled={!isEditing}
                        label="Currículo"
                        onChange={event => setCurriculumContent(event.target.value)}
                        value={curriculumContent}
                        />
                </Grid>
            </Grid>
            <EditableControl 
                onEdit={(event) => setIsEditing(event)} 
                onSave={() => saveCandidate} 
            />
        </Container>
    );
};