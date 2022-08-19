import React from 'react';
import {CardProps} from './Card.props';
import styles from './Card.module.scss';

export const Card = ({children, ...props}: CardProps): JSX.Element => {
  return (
    <div
      className={styles.card}
      {...props}
    >
      {children}
    </div>
  );
};
