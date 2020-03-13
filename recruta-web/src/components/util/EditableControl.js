import React, { useState } from 'react';
import { Fab, CircularProgress, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useTheme, makeStyles } from '@material-ui/core';
import { Save, Edit } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    fab: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(1),
        },
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(4),
        },
    },
    savingProgress: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            bottom: theme.spacing(1.2),
            right: theme.spacing(0.3),
        },
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            bottom: theme.spacing(1.2),
            right: theme.spacing(3.2),
        },
    }
}));

export const EditableControl = ({edit, onEdit, onSave}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [isEditing, setIsEditing] = useState(edit);
    const [isSaving, setIsSaving] = useState(false);
    
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    function onEditonFabClicked() {
        if (isEditing) {
            setIsEditing(false);
            if (onEdit) onEdit(false);

            if (onSave) {
                setIsSaving(true);
                
                onSave()
                .then(() => {
                    setAlertMsg("Informações salvas com sucesso!");
                    setAlertSeverity("success");
                })
                .catch(() => {
                    setAlertMsg("Ocorreu um erro ao salvar o formulário");
                    setAlertSeverity("error");
                })
                .finally(() => {
                    setIsSaving(false);
                });
            }
        }
        else {
            setIsEditing(true);
            if (onEdit) onEdit(true);
        }
    }

    return (
        <>
            <Fab
                className={classes.fab}
                aria-label="save"
                color="primary"
                disabled={isSaving}
                onClick={() => onEditonFabClicked()}
            >
                {(isEditing || isSaving) ? <Save/> : <Edit />}
            </Fab>
            {isSaving && <CircularProgress 
                            size={68} 
                            className={classes.savingProgress}                         
                         />
            }
            <Snackbar
                open={alertSeverity !== ""}
                autoHideDuration={6000}
            >
                <Alert  severity={alertSeverity}
                        variant="filled"
                        elevation={6}
                >
                {alertMsg}
                </Alert>
            </Snackbar>
        </>
    );
};