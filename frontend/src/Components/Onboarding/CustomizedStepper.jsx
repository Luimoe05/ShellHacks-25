import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Added Box
import Button from '@mui/material/Button'; // Added Button
import Typography from '@mui/material/Typography'; // Added Typography
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
// Removed invalid import of StepIconProps

// Moola Icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; 
import LightBulbIcon from '@mui/icons-material/Lightbulb';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// --- CUSTOM COLORS AND GRADIENTS (Defined previously) ---
const ACTIVE_GRADIENT = 'linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)';
const INACTIVE_COLOR = '#424242'; 
const LINE_COLOR = '#616161';

// 1. Custom Step Connector (Adapted for Colorlib style)
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

// 2. Custom Step Icon Root (The Circle)
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
    4: <AttachMoneyIcon sx={{ fontSize: 30 }} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Personal Info', 'Interests', 'Goals', 'Financials'];

export default function CustomizedSteppers() {
  // Use 0-based indexing for activeStep
  const [activeStep, setActiveStep] = React.useState(0); 
  const [skipped, setSkipped] = React.useState(new Set());

  // Since all steps are linear, we'll keep this false
  const isStepOptional = (step) => false; 

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // --- NEXT LOGIC ---
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    
    // Increment active step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // --- BACK LOGIC ---
  const handleBack = () => {
    // Decrement active step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack 
      sx={{ 
        width: '100%', 
        p: 4, 
        color: '#fff',
        ml: -3,
        mt: -4, // Adjust top margin as needed
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
          <Typography sx={{ mt: -6, mb: 3, color: '#fff' }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: -9, justifyContent: 'center' }}>
            {/* BACK Button */}
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                mr: 1,
                color: activeStep === 0 ? '#bdbdbd' : '#757575', // grey text
                borderColor: activeStep === 0 ? '#e0e0e0' : '#bdbdbd', // lighter border when disabled
                backgroundColor: activeStep === 0 ? '#f5f5f5' : 'transparent', // lighter background when disabled
                '&:hover': {
                  backgroundColor: '#eeeeee',
                  borderColor: '#bdbdbd',
                },
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {/* NEXT / FINISH Button */}
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                backgroundImage: 'linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)',
                color: '#fff',
                border: 'none',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.2)',
                '&:hover': {
                  backgroundImage: 'linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)',
                },
              }}
            >
              {/* Change button text on the last step */}
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Stack>
  );
}