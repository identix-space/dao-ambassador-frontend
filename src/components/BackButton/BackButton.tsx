import React from 'react';
import {BackButtonProps} from './BackButton.props';
import styles from './BackButton.module.scss';
import Link from 'next/link';

export const BackButton = ({link = '', ...props}: BackButtonProps): JSX.Element => {
  return (
    <Link href={link}>
      <a>
        <button
          className={styles.button}
          {...props}
        >
          Back
        </button>
      </a>
    </Link>
  );
};
