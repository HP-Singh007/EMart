import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'


const componentStepper = ({activeStep}) => {
    
    const steps=[
        {
        label:"Shipping Details",
        icon:<LocalShipping/>
        },
        {
        label:"Confirm Order",
        icon:<LibraryAddCheck/>
        },
        {
        label:"Payment",
        icon:<AccountBalance/>
        },
    ]

    const stepStyle={
        boxSizing:"borderBox"
    }

  return (
    <Stepper activeStep={activeStep} alternativeLabel style={stepStyle}>
        {steps.map((item) => (
            <Step key={item.label}>
            <StepLabel  icon={item.icon}>{item.label}</StepLabel>
            </Step>
        ))}
    </Stepper>
  )
}

export default componentStepper
