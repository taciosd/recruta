import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import axios from '../../services/api';
import OpportunityCard from './OpportunityCard';

export default function Opportunities(props) {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        async function fetchOpprtunities() {
            const res = await axios.get('/opportunities');
            return res.data;
        }
        
        fetchOpprtunities()
        .then(opportunities => {
            setOpportunities(opportunities);
        });
    }, []);
    
    return (
        <>
            <Container>
                <Typography variant='h2'>Vagas abertas</Typography>
                <Grid container>
                    {opportunities.map((opportunity, i) => {
                        return (
                            <Grid item key={i}>
                                <OpportunityCard opportunity={opportunity}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    );
};