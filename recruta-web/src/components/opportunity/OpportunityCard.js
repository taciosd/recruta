import React, { useState } from 'react';
import { Card, 
        CardHeader, 
        CardContent,
        CardActions, 
        Collapse, 
        IconButton,
        Typography, 
        useTheme, 
        makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 250,
        padding: theme.spacing(4),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export default function OpportunityCard(props) {
    const theme = useTheme();
    const classes = useStyle(theme);
    const opportunity = props.opportunity;
    const groups = props.groups;

    const [expanded, setExpanded] = useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={opportunity.title}
                subheader={opportunity.creationDate}
            />
            <Typography variant="h6">{opportunity.group}</Typography>
            <CardActions>
                <Link to={{
                    pathname:`/opportunities/${opportunity._id}`,
                    state: {
                        opportunity: opportunity,
                        groups: groups
                    },
                }}>
                    <IconButton aria-label="editar">
                        <Edit />
                    </IconButton>
                </Link>
                <IconButton aria-label="compartilhar">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-expanded={expanded}
                            aria-label="mostrar mais" 
                            className={expanded ? classes.expand : classes.expandOpen}
                            onClick={handleExpandClick}
                >
                    <ExpandMoreIcon />
                </IconButton>                    
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>Teste teste teste Teste teste teste
                    Teste teste teste Teste teste teste
                    Teste teste teste Teste teste teste
                    Teste teste teste Teste teste teste
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

/*
<IconButton aria-expanded={false} aria-label="mostrar mais">
    <ExpandMoreIcon />
</IconButton>
*/