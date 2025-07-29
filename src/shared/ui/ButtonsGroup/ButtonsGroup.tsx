import { Button, Box } from "@mui/material";
import React from "react";

import styles from "./ButtonsGroup.module.css";

export interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface ButtonsGroupProps {
  buttons: ButtonConfig[];
  direction?: 'horizontal' | 'vertical';
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'space-between';
  responsive?: boolean;
  className?: string;
}

const ButtonsGroup: React.FC<ButtonsGroupProps> = ({
  buttons,
  direction = 'horizontal',
  spacing = 'sm',
  align = 'start',
  responsive = true,
  className,
}) => {
  const containerClassName = [
    styles.container,
    styles[`direction-${direction}`],
    styles[`spacing-${spacing}`],
    styles[`align-${align}`],
    responsive && styles.responsive,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Box className={containerClassName}>
      {buttons?.filter(Boolean).map((button, index) => (
        <Button
          key={`${button.label}-${index}`}
          variant={button.variant || 'contained'}
          color={button.color || 'primary'}
          onClick={button.onClick}
          startIcon={button.startIcon}
          endIcon={button.endIcon}
          disabled={button.disabled}
          fullWidth={button.fullWidth}
          className={`${styles.button} ${button.className || ''}`}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  );
};

export default ButtonsGroup;