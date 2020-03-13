import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar,
        Toolbar, 
        Drawer, 
        Typography, 
        List,
        ListItem,
        ListItemIcon,
        ListItemText,
        IconButton, 
        Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    drawerButton: {
        marginLeft: theme.spacing(2),
    },
    topDivider: {
        marginTop: theme.spacing(8),
    },
    drawerPaper: {
        width: 200,
        alignItems: 'center'
    }
}));

export default function TopBar(prop) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    useEffect(() => {
        setDrawerIsOpen(false);
    }, []);

    function handleDrawerToggle() {
        setDrawerIsOpen(!drawerIsOpen);
    }

    return (
        <>
        <AppBar className={classes.root} position="static">
            <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    className={classes.drawerButton}
                >
                    <MenuIcon />
            </IconButton>
            <Toolbar>
                <Typography variant="h6">RecrutaTec</Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor='left'
            open={drawerIsOpen}
            onClose={handleDrawerToggle}
            classes={{paper: classes.drawerPaper}}
        >
            <div className={classes.topDivider} />
            <Divider />
            <div
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
            >
                <List>
                    <Link to="/candidates">
                        <ListItem button key="Candidatos">
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary="Candidatos" />
                        </ListItem>
                    </Link>
                    <Link to="/opportunities">
                        <ListItem button key="Vagas">
                            <ListItemIcon><DescriptionIcon/></ListItemIcon>
                            <ListItemText primary="Vagas" />
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>
        </>
    );
};