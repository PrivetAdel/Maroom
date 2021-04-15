import React, {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setMail} from '../redux/actions';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, TextField, Typography, FormHelperText, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core';
import {setFormData, getFormData} from '../services';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  textField: {
    marginTop: '20px'
  },
  buttonContainer: {
    marginTop: '20px'
  }
}));

const MailStep = ({title}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [defaultValue] = React.useState(getFormData('mail'));
  const [isShow, setIsShow] = React.useState({password: false, repeatPassword: false});
  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  const classes = useStyles();

  const watchPassword = watch("password");

  const onSubmit = useCallback((data) => {
    setFormData('mail', data);
    dispatch(setMail(data));
    history.push({
      ...location,
      state: {
        activeStep: 2,
      },
    })},
    [history, location]
  );

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClickShowPassword = (evt) => {
    const {name} = evt.currentTarget;
    const value = isShow[name];
    setIsShow({...isShow, [name]: !value})
  };

  const handleMouseDownPassword = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" >{title}</Typography>

      <form data-testid="form" onSubmit={handleSubmit(onSubmit)} className={classes.form} >
        <TextField 
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          inputRef={register({required: true})}
          defaultValue={defaultValue.email}
          className={classes.textField}
          error={!!errors.email} />
        {errors.email && <FormHelperText error>Required field</FormHelperText>}

        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            label="Password"
            type={isShow.password ? 'text' : 'password'}
            inputRef={register({required: true, minLength: 6})}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  name="password"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {isShow.password ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>} />
        </FormControl>
        {errors.password && errors.password.type === "required" && <FormHelperText error>Required field</FormHelperText>}
        {errors.password && errors.password.type === "minLength" && <FormHelperText error>The minimum password length must be six characters</FormHelperText>}

        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel htmlFor="repeatPassword">Repeat password</InputLabel>
          <OutlinedInput
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat password"
            type={isShow.repeatPassword ? 'text' : 'password'}
            inputRef={register({required: true, validate: value => value === watchPassword})}
            error={!!errors.repeatPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  name="repeatPassword"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {isShow.repeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>} />
        </FormControl>
        {errors.repeatPassword && errors.repeatPassword.type === "required" && <FormHelperText error>Required field</FormHelperText>}
        {errors.repeatPassword && errors.repeatPassword.type === "validate" && <FormHelperText error>Passwords must match</FormHelperText>}


        <Grid container justify="space-between" className={classes.buttonContainer}>
          <Button variant="contained" color="secondary" onClick={onBack}>BACK</Button>
          <Button variant="contained" color="primary" type="submit">NEXT</Button>
        </Grid>
      </form>
    </div>
  )
};

export default MailStep;
