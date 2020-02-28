import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Typography, useTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { responsiveFontSizes } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { EditableControl } from './util/EditableControl';

const useStyles = makeStyles(theme => ({
    banner: {
        background: 'url(/welcome-banner.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    name: {
        color: 'white',
        fontWeight: 'bolder',
        marginRight: theme.spacing(8),
    },
    editableName: {
        backgroundColor: 'white',
        marginRight: theme.spacing(8),
    },
    editableInput: {
        fontSize: '2.0rem',
    },
    subtitle: {
        color: 'white',
        marginRight: theme.spacing(8),
    },
    paragraphs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 50,
        [theme.breakpoints.down('xs')]: {
            height: 400,
        },
        [theme.breakpoints.up('sm')]: {
            height: 350,
        },
    },
    paragraphTitle: {
        color: theme.palette.primary,
    }
}));

export default function WelcomePage(props) {
    const theme = responsiveFontSizes(useTheme());
    const classes = useStyles(theme);

    const [name, setName] = useState('<Nome da empresa>');
    const [welcomeTitle, setWelcomeTitle] = useState("Me edite!");
    const [welcomeContent, setWelcomeContent] = useState("Adicione um conteúdo de boas vindas!\nE confira nossas vagas!");

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadCompanyInfo();
    }, []);

    async function loadCompanyInfo() {
        const company = await api.get('/company').data;
        if (company) {
            console.log(company);
            setName(company.name);
            setWelcomeTitle(company.welcomeTitle);
            setWelcomeContent(company.welcomeContent);
        }
    }

    async function saveCompanyInfo() {
        const res = await api.put('/company', {
            name: name,
            welcomeTitle: welcomeTitle,
            welcomeContent: welcomeContent,
        });

        const company = res.data;
        setName(company.name);
        setWelcomeTitle(company.welcomeTitle);
        setWelcomeContent(company.welcomeContent);
    }

    function readOnlyName() {
        return (
            <Typography
                className={classes.name} 
                variant="h2" 
            >
            {name}
            </Typography>
        );
    }

    function editableName() {
        return (
            <TextField
                className={classes.editableName}
                variant="filled"
                placeholder={name}
                InputProps={{
                    classes: {
                        input: classes.editableInput,
                    },
                }}
                onChange={event => setName(event.target.value)}
            >
            </TextField>
        );
    }

    function readOnlyWelcomeTitle() {
        return (
            <Typography 
                className={classes.paragraphTitle} 
                variant="h4"
            >
            {welcomeTitle}
            </Typography>
        );
    }

    function editableWelcomeTitle() {
        return (
            <TextField
                variant="filled"
                placeholder={welcomeTitle}
                InputProps={{
                    classes: {
                        input: classes.editableInput,
                    },
                }}
                onChange={event => setWelcomeTitle(event.target.value)}
            >
            </TextField>
        );
    }

    function readOnlyWelcomeContent() {
        const paragraphs = welcomeContent.split('\n');
        const components = paragraphs.map((text, index) => {
            return (
                <Typography 
                    variant="h5"
                    key={index}
                >
                {text}
                </Typography>
            );
        });

        return (components);
    }

    function editableWelcomeContent() {
        return (
            <TextField
                variant="filled"
                value={welcomeContent}
                multiline
                rows="5"
                fullWidth
                onChange={event => setWelcomeContent(event.target.value)}
            >
            </TextField>
        );
    }


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.banner}>
                {
                    isEditing ? editableName() : readOnlyName()
                }
                <Typography
                    className={classes.subtitle} 
                    variant="h3" 
                >
                Carreiras
                </Typography>
            </div>
            <Container maxWidth="md" className={classes.paragraphs}>
                {
                    isEditing ? editableWelcomeTitle() : readOnlyWelcomeTitle()
                }
                {
                    isEditing ? editableWelcomeContent() : readOnlyWelcomeContent()
                }
                <Link to='/opportunities'>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        disabled={isEditing}
                    >
                    Vagas abertas
                    </Button>
                </Link>
            </Container>
            <EditableControl 
                onEdit={(editing) => setIsEditing(editing)} 
                onSave={() => saveCompanyInfo()} 
            />
        </ThemeProvider>
    );
}

// Junte-se à inovação
/* Nós somos um instituto de pesquisa e desenvolvimento de tecnologias da PUC-RJ. 
O tecgraf trabalha com as melhores práticas de pesquisa e desenvolvimento de software
e sempre prezamos pela excelência nos nossos projetos.

Ao mesmo tempo gostamos de manter um ambiente informal, sem regras rígidas de vestimentas, 
projetos e cursos de aperfeiçoamento, como um ambiente acadêmico deve ser.
Conheça nossas vagas!
*/