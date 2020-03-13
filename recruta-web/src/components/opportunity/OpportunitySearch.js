import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Fab, makeStyles, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import api from '../../services/api';
import OpportunityCard from './OpportunityCard';

const useStyle = makeStyles(theme => ({
    root: {
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    gridItem: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },

}));

export default function Opportunities(props) {
    const theme = useTheme();
    const classes = useStyle(theme);

    const [opportunities, setOpportunities] = useState([]);
    const [groups, setGroups] = useState({});

    useEffect(() => {
        async function fetchOpprtunities() {
            const res = await api.get('/opportunities');
            return res.data;
        }
        
        fetchOpprtunities()
        .then(data => {
            setOpportunities(data.opportunities);
            setGroups(data.groups);
        });
    }, []);

    return (
        <Container className={classes.root}>
            <Typography variant='h3'>Vagas abertas</Typography>
            <Grid container className={classes.grid}>
                {opportunities.map((opportunity, i) => {
                    return (
                        <Grid item key={i} lg={4} md={4} sm={6} xs={12} 
                            className={classes.gridItem}
                        >
                            <OpportunityCard
                                opportunity={opportunity} 
                                groups={groups} />
                        </Grid>
                    )
                })}
            </Grid>
            <Link to={{
                pathname: '/opportunities/create',
                state: {
                    groups: groups
                }
            }}>
                <Fab
                    color="primary"
                >
                    <AddIcon/>
                </Fab>
            </Link>
        </Container>
    );
};