import React from 'react';
import {ProxyCardProps} from './ProxyCard.props';
import styles from './ProxyCard.module.scss';
import {Copy, P} from '..';
import {startAndEnd} from '../../utils/misc';
import Image from 'next/image';
import useWallet from '../../hooks/useWallet';

export const ProxyCard = ({name, tokenId, soul, role, collectionName, valid, ...props}: ProxyCardProps): JSX.Element => {
  const {context} = useWallet();

  return (
    <div
      className={styles.card}
      {...props}
    >
      <div className={styles.top}>
        <div className={styles.img}>
          <Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} objectFit="contain" layout="fill"/>
        </div>
        {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
          <P size="m" weight="bold">{name}</P>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <P weight="bold">{startAndEnd(tokenId, 4, 3)}</P>
            <Copy text={tokenId}/>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Soul</p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <P weight="bold">{startAndEnd(soul, 4, 3)}</P>
            <Copy text={soul}/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Role</p>
          <P weight="bold">{role}</P>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Proxy group</p>
          <P weight="bold">{collectionName}</P>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p className={styles.label}>Valid till</p>
          <P weight="bold">{valid}</P>
        </div>
      </div>
    </div>
  );
};
