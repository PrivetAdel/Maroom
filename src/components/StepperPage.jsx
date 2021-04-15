import React from 'react';
import {useLocation} from 'react-router-dom';
import {Stepper, Step, StepLabel, Typography} from '@material-ui/core';
import PersonalInfoStep from './PersonalInfoStep';
import MailStep from './MailStep';
import FinishStep from './FinishStep';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px 20px'
  }
}));

const TABS = [
  {
    component: PersonalInfoStep,
    title: "Personal Info",
  },
  {
    component: MailStep,
    title: "Mail",
  },
  {
    component: FinishStep,
    title: "Finish",
  },
];

const StepperPage = () => {
  const {state = {activeStep: 0}} = useLocation();
  const classes = useStyles();

  const tab = TABS[state.activeStep];

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h3" >Stepper</Typography>
      <Stepper activeStep={state.activeStep}>
        {TABS.map(({ title }) => {
          return (
            <Step key={title}>
              <StepLabel>{title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {tab && <tab.component title={tab.title} />}
    </div>
  );
};

export default StepperPage;
