import React from 'react';
import {LoaderProps} from './Loader.props';
import styles from './Loader.module.scss';

export const Loader = ({...props}: LoaderProps): JSX.Element => {
  return (
    <>
      <div className={styles.loader_wrapper} {...props}>
        <div className={styles.loader}/>
      </div>
      <div className={styles.loader_text}>Loading...</div>
    </>
  );
};
