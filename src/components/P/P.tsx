import React from 'react';
import {PProps} from './P.props';
import styles from './P.module.scss';
import cn from 'classnames';

export const P = ({size = 'xs', weight = 'thin', color = 'grey', children, className, ...props}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.xs]: size === 'xs',
        [styles.s]: size === 's',
        [styles.sm]: size === 'sm',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l',
        [styles.thin]: weight === 'thin',
        [styles.normal]: weight === 'normal',
        [styles.bold]: weight === 'bold',
        [styles.black]: color === 'black',
        [styles.grey]: color === 'grey',
        [styles.white]: color === 'white'
      })
      }
      {...props}
    >
      {children}
    </p>
  );
};
