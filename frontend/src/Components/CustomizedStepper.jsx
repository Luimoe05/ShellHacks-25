import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'; 
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// Moola Icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; 
import LightBulbIcon from '@mui/icons-material/Lightbulb';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// --- CUSTOM COLORS AND GRADIENTS ---
const ACTIVE_GRADIENT = 'linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)';
const INACTIVE_COLOR = '#424242'; 
const LINE_COLOR = '#616161';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 30,
    left: 'calc(-50% + 25px)',
    right: 'calc(50% + 25px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: ACTIVE_GRADIENT,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: ACTIVE_GRADIENT,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: LINE_COLOR, 
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: INACTIVE_COLOR,
  zIndex: 1,
  color: '#fff',
  width: 55,
  height: 55,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active) && {
    backgroundImage: ACTIVE_GRADIENT,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.5)',
  },
  ...(ownerState.completed) && {
    backgroundImage: ACTIVE_GRADIENT,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.5)',
  },
  ...(!ownerState.active && !ownerState.completed) && {
    backgroundColor: INACTIVE_COLOR,
  }
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonSearchIcon sx={{ fontSize: 30 }} />,
    2: <LightBulbIcon sx={{ fontSize: 30 }} />,
    3: <SportsScoreIcon sx={{ fontSize: 30 }} />, 
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}


export default function CustomizedSteppers({ activeStep, handleNext, handleBack, steps }) {
  
  
  const isStepOptional = (step) => false; 
  const isStepSkipped = (step) => false; 

  return (
    <Stack 
      sx={{ 
        width: '100%', 
        p: 4, 
        color: '#b3b3b3ff',
        ml: -6,
        mt: -4, 
      }} 
      spacing={4}
    >
      <Stepper 
        alternativeLabel 
        activeStep={activeStep} 
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => { 
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel 
                {...labelProps}
                StepIconComponent={ColorlibStepIcon}
                sx={{
                  '& .MuiStepLabel-label': {
                    color: index <= activeStep ? '#fff' : LINE_COLOR, 
                    fontWeight: 'bold',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
      {/* --- Button Area (Below Stepper) --- */}
      {activeStep === steps.length ? ( 
        <React.Fragment>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: -9, justifyContent: 'flex-start'}}> 
            <Button
              variant="outlined"
              disabled={activeStep === 0} 
              onClick={handleBack} 
              sx={{
                mr: 1,
                color: activeStep === 0 ? '#000000' : '#757575', 
                borderColor: activeStep === 0 ? '#b6b6b6ff' : '#bdbdbd', 
                backgroundColor: activeStep === 0 ? '#6a6a6aff' : '#4c4a4aff', 
                '&:hover': {
                  backgroundColor: '#6f6f6fff',
                  borderColor: '#bdbdbd',
                },
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleNext} sx={{ mr: 1 }}> 
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext} 
              variant="contained"
              sx={{
                backgroundImage: ACTIVE_GRADIENT,
                color: '#7c7b7bff',
                border: 'none',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.2)',
                '&:hover': {
                  backgroundImage: ACTIVE_GRADIENT,
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Stack>
  );
}