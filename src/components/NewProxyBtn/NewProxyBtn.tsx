import styles from '../../styles/Collections.module.scss';
import Link from 'next/link';
import React from 'react';

export const NewProxyBtn = (): JSX.Element => {
  return (
    <Link href="/new-proxy">
      <a>
        <div className={styles.new_proxy}>+</div>
      </a>
    </Link>
  );
};
