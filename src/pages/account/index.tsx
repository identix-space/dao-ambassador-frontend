import React, {ReactNode} from 'react';
import styles from '../../styles/Account.module.scss';
import Image from 'next/image';
import {P} from '../../components';


export default function AccountPage(): ReactNode {
  return (
    <>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Image loader={() => 'https://avatars.dicebear.com/api/adventurer-neutral/3fsdvsd.svg'} src={'https://avatars.dicebear.com/api/adventurer-neutral/3fsdvsd.svg'} objectFit="contain" layout="fill"/>
        </div>
        <div className={styles.user_info}>
          <P size="l" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
          <div className={styles.safe_account}><span>Gnosis safe account</span></div>
        </div>
      </div>
      <P size="l" weight="bold">My souls</P>
      <div className={styles.souls}>
        <div className={styles.souls_header}>
          <P size="s" weight="bold">ADDRESS</P>
          <P size="s" weight="bold">OWNER</P>
        </div>
        <div className={styles.souls_list}>
          <div className={styles.soul_row}>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
          </div>
          <div className={styles.soul_row}>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
          </div>
          <div className={styles.soul_row}>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
          </div>
          <div className={styles.soul_row}>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
            <P size="s" weight="bold">0x2b9a81d2b9f181797263239da3c98d722dc850fb</P>
          </div>
        </div>
      </div>
    </>
  );
}

