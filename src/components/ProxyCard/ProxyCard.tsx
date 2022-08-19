import React from 'react';
import {ProxyCardProps} from './ProxyCard.props';
import styles from './ProxyCard.module.scss';
import {Copy, P} from '..';
import {startAndEnd} from '../../utils/misc';

export const ProxyCard = ({name, ...props}: ProxyCardProps): JSX.Element => {
  return (
    <div
      className={styles.card}
      {...props}
    >
      <div className={styles.top}>
        <div className={styles.img}/>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <P size="m" weight="bold">{name}</P>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <P weight="bold">{startAndEnd('0003763527345768754678906567213', 4, 3)}</P>
            <Copy text="0003763527345768754678906567213"/>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Soul</p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <P weight="bold">{startAndEnd('0003763527345768754678906567213', 4, 3)}</P>
            <Copy text="0003763527345768754678906567213"/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Role</p>
          <P weight="bold">Community Manager</P>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Proxy group</p>
          <P weight="bold">HowToDAO Admins</P>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Valid till</p>
          <P weight="bold">19 Feb 2022 12:33:22</P>
        </div>
      </div>
    </div>
  );
};
