import React from 'react';
import { Container, Button, Typography, useTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { responsiveFontSizes } from '@material-ui/core/styles';
import Names from '../constants/names';
import { Link } from 'react-router-dom';

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
    title: {
        color: 'white',
        fontWeight: 'bolder',
        marginRight: theme.spacing(8),
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
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.banner}>
                <Typography
                    className={classes.title} 
                    variant="h2" 
                >
                {Names.COMPANY_NAME}
                </Typography>
                <Typography
                    className={classes.subtitle} 
                    variant="h3" 
                >
                Carreiras
                </Typography>
            </div>
            <Container maxWidth="md" className={classes.paragraphs}>
                <Typography 
                    className={classes.paragraphTitle} 
                    variant="h4"
                >
                    Junte-se à inovação
                </Typography>
                <Typography variant="h5">
                    Nós somos um instituto de pesquisa e desenvolvimento de tecnologias da PUC-RJ. 
                    A {Names.COMPANY_NAME} trabalha com as melhores práticas de pesquisa e desenvolvimento de software
                    e sempre prezamos pela excelência.
                </Typography>
                <Typography variant="h5">
                Ao mesmo tempo gostamos de manter um ambiente informal, sem regras rígidas de vestimentas, 
                    projetos e cursos de aperfeiçoamento, como um ambiente acadêmico deve ser.
                    Conheça nossas vagas!
                </Typography>
                <Link to='/jobopportunities'>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                    >
                        Vagas abertas
                    </Button>
                </Link>
            </Container>
        </ThemeProvider>
    );
}