import * as React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { AppRoutesProps } from '@app/routes';
import { useState } from 'react';

// ToggleModalProps are the properties of the ToggleModal component
export interface ToggleModalProps extends AppRoutesProps {
  modal: React.FunctionComponent<ToggleModalSubProps>
  onToggle?: (open: boolean) => void
  buttonText?: string
  buttonVariant?: ButtonVariant
  buttonInline?: boolean
}

// ToggleModalSubProps are the properties of the Modal within the ToggleModal component
export interface ToggleModalSubProps extends AppRoutesProps {
  isModalOpen: boolean
  closeModal: () => void
}

export const ToggleModal: React.FunctionComponent<ToggleModalProps> = (props: ToggleModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleStateChange = (open: boolean): void => {
    setIsModalOpen(open)
    if (props.onToggle) {
      props.onToggle(open)
    }
  }
  return (
    <React.Fragment>
      <Button
        variant={props.buttonVariant ? props.buttonVariant : "primary"}
        isInline={props.buttonInline}
        onClick={() => handleStateChange(!isModalOpen)}>
        {props.buttonText ? props.buttonText : "+"}
      </Button>
      {props.modal({
        addAlert: props.addAlert,
        isModalOpen: isModalOpen,
        closeModal: () => { handleStateChange(false) },
      })}
    </React.Fragment>
  )
}
