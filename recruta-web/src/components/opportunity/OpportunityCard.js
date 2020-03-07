import React from 'react';
import { Card, Typography, useTheme, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        width: 400,
        height: 250,
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
}));

export default function OpportunityCard(props) {
    const theme = useTheme();
    const classes = useStyle(theme);
    const opportunity = props.opportunity;
    

    return (
        <Link to={{
            pathname:`/opportunities/${opportunity._id}`,
            state: {
                opportunity: opportunity,
            },
        }}>
            <Card className={classes.root}>
                <Typography variant="h5">{opportunity.title}</Typography>
                <Typography variant="h6">{opportunity.group}</Typography>
                <Typography variant="h6">{opportunity.description}</Typography>
            </Card>
        </Link>
    );
}