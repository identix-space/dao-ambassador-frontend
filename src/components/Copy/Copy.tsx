import React from 'react';
import {CopyProps} from './Copy.props';
import styles from './Copy.module.scss';

export const Copy = ({text, ...props}: CopyProps): JSX.Element => {
  return (
    <div
      className={styles.copy}
      {...props}
      onClick={() => {
        if (typeof text === 'string') {
          navigator.clipboard.writeText(text);
        }
      }}
    />
  );
};
