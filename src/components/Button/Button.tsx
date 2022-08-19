import React from 'react';
import {ButtonProps} from './Button.props';
import styles from './Button.module.scss';
import cn from 'classnames';

export const Button = ({view = 'purple', size = 's', disabled = false, children, className, ...props}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.purple]: view === 'purple',
        [styles.transparent]: view === 'transparent',
        [styles.s]: size === 's',
        [styles.l]: size === 'l',
        [styles.auto]: size === 'auto',
        [styles.disabled]: disabled === true
      })}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
