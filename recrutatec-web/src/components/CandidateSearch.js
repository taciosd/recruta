import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, Grid, Box, TextField, Button } from '@material-ui/core';
import CandidateCard from './CandidateCard';

export default function CandidateSearch() {
    const ENTER_KEY = 13;
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        searchCandidates();
    }, []);

    async function searchCandidates() {
        const candList = await axios.get('/candidates');
        setCandidates(candList.data);
    };

    function keyDown(e) {
        if (e.key === ENTER_KEY) {
            searchCandidates();
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <Box m={25} />
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={11}>
                    <TextField variant="outlined" fullWidth onKeyDown={keyDown} />
                    </Grid>
                    <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick={searchCandidates}>Buscar</Button>
                    </Grid>
                </Grid>
                <Box m={10} />
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    {candidates.map((cand, i) => {
                        return (
                            <Grid item key={i} >
                                <CandidateCard candidate={cand} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    );
};