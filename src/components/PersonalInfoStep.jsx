import React, {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setPersonalInfo} from '../redux/actions';
import {makeStyles} from '@material-ui/core/styles';
import {TextField, Typography, FormHelperText, Button} from '@material-ui/core';
import {DatePicker} from '@material-ui/pickers';
import {setFormData, getFormData} from '../services';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '600px',
    margin: '0 auto',
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
  submitButton: {
    margin: '20px 0 20px auto',
    maxWidth: '30%'
  }
}));

const PersonalInfoStep = ({title}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [defaultValue] = React.useState(getFormData('personal'));
  const {register, handleSubmit, control, formState: {errors}} = useForm();
  const classes = useStyles();

  const onSubmit = useCallback((data) => {
    setFormData('personal', data);
    dispatch(setPersonalInfo(data));
    history.push({
      ...location,
      state: {
        activeStep: 1,
      },
    })},
    [history, location]
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" >{title}</Typography>

      <form data-testid="form" onSubmit={handleSubmit(onSubmit)} className={classes.form} >
        <TextField
          id="userName"
          name="userName"
          label="Name"
          variant="outlined"
          inputRef={register({required: true, minLength: 3, pattern: /[A-Za-z]/})}
          className={classes.textField}
          defaultValue={defaultValue.userName}
          error={!!errors.userName} />
        {errors.userName && errors.userName.type === "required" && <FormHelperText error>Required field</FormHelperText>}
        {errors.userName && errors.userName.type === "minLength" && <FormHelperText error>The minimum name length must be three letters</FormHelperText>}
        {errors.userName && errors.userName.type === "pattern" && <FormHelperText error>The name should only consist of Latin letters</FormHelperText>}
        
        <TextField 
          id="userSurname"
          name="userSurname"
          label="Surname"
          variant="outlined"
          inputRef={register({required: true, minLength: 3, pattern: /[A-Za-z]/})}
          className={classes.textField}
          defaultValue={defaultValue.userSurname}
          error={!!errors.userSurname} />
        {errors.userSurname && errors.userSurname.type === "required" && <FormHelperText error>Required field</FormHelperText>}
        {errors.userSurname && errors.userSurname.type === "minLength" && <FormHelperText error>The minimum surname length must be three letters</FormHelperText>}
        {errors.userSurname && errors.userSurname.type === "pattern" && <FormHelperText error>The surname should only consist of Latin letters</FormHelperText>}

        <TextField 
          id="userPatronymicName"
          name="userPatronymicName"
          label="Patronymic name"
          variant="outlined"
          inputRef={register({required: true, minLength: 3, pattern: /[A-Za-z]/})}
          className={classes.textField}
          defaultValue={defaultValue.userPatronymicName}
          error={!!errors.userPatronymicName} />
        {errors.userPatronymicName && errors.userPatronymicName.type === "required" && <FormHelperText error>Required field</FormHelperText>}
        {errors.userPatronymicName && errors.userPatronymicName.type === "minLength" && <FormHelperText error>The minimum patronymic name length must be three letters</FormHelperText>}
        {errors.userPatronymicName && errors.userPatronymicName.type === "pattern" && <FormHelperText error>The patronymic name should only consist of Latin letters</FormHelperText>}
        
        <Controller name="birthdate" control={control} defaultValue={defaultValue.birthdate} rules={{required: true}} className={classes.textField}
          as={
            <DatePicker
              disableFuture
              id="birthdate"
              openTo="year"
              format="dd/MM/yyyy"
              label="Date of birth"
              variant="inline"
              inputVariant="outlined"
              views={["year", "month", "date"]}
              value={selectedDate}
              InputAdornmentProps={{position: "start"}}
              onChange={handleDateChange}
              error={!!errors.birthdate}
            />
          } />
        {errors.birthdate && <FormHelperText error>Required field</FormHelperText>}

        <Button variant="contained" color="primary" type="submit" className={classes.submitButton} >NEXT</Button>
      </form>
    </div>
  )
};

export default PersonalInfoStep;
