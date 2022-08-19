import React from 'react';
import {Header} from '../components/Header';
import styles from './MainLayout.module.scss';

type Props = {
    children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
