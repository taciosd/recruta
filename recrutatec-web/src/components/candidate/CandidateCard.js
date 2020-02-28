import React from 'react';
import { Card, 
         CardActionArea, 
         CardMedia, 
         CardContent, 
         CardActions, 
         Typography, 
         Button,
         makeStyles,
         useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: 400,
        background: "white",
    },
    details: {
        flexDirection: 'column',
        flex: '1 0 auto'
    },
    content: {
        
    },
    photo: {
        width: 150,
    },
    action: {
        alignItems: 'center',
        marginLeft: 'auto'
    }
}));

export default function CandidateCard(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const candidate = props.candidate;

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.photo}>
                <CardMedia 
                    component="img" 
                    alt={candidate.name}
                    height="180"
                    image="/logo192.png"
                    title={candidate.name}
                />
            </CardActionArea>
            <div className={classes.details}>
                <Link to={{
                    pathname:`/candidates/${candidate._id}`,
                    state: {
                        cand: candidate,
                    },
                }}>
                    <CardActionArea>
                        <CardContent className={classes.content}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {candidate.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions className={classes.action}>
                    <Button 
                        size="small" 
                        color="primary">
                        Vizualizar
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
};