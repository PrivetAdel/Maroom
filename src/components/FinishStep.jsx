import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography, Grid} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  content: {
    padding: '30px',
    border: '1px solid #bdbdbd',
    borderRadius: '10px'
  },
  backButton: {
    marginTop: '20px'
  },
  selection: {
    fontWeight: 700,
    color: 'rgba(0, 0, 0, 0.77)'
  }
}));

const transformDate = (date) => {
  const newDate = String(date).slice(4, 15);
  return newDate;
};

const FinishStep = ({title}) => {
  const history = useHistory();
  const personalInfo = useSelector(rootReducer => rootReducer.personalInfo);
  const mail = useSelector(rootReducer => rootReducer.email);
  const classes = useStyles();

  const {userName, userSurname, userPatronymicName, birthdate} = personalInfo;
  const {email} = mail;
  console.log(birthdate);

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" >{title}</Typography>

      <Grid container direction="column" alignItems="flex-start" className={classes.content}>
        <p><span className={classes.selection}>Name: </span>{userName}</p>
        <p><span className={classes.selection}>Surname: </span>{userSurname}</p>
        <p><span className={classes.selection}>Patronymic name: </span>{userPatronymicName}</p>
        <p><span className={classes.selection}>Date of birth: </span>{transformDate(birthdate)}</p>
        <p><span className={classes.selection}>Email: </span>{email}</p>
      </Grid>

      <Button variant="contained" color="secondary" className={classes.backButton} onClick={onBack}>BACK</Button>
    </div>
  )
};

export default FinishStep;
