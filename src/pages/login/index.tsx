import React, {ReactNode} from 'react';
import Image from 'next/image';
import {P, Card, Input, Button} from '../../components';
import styles from '../../styles/Login.module.scss';
import Metamask from '../../../public/assets/metamask.svg';
import Gnosis from '../../../public/assets/gnosis.svg';

export default function LoginPage(): ReactNode {
  return (
    <>
      <div className={styles.card}>
        <P size="l" weight="bold">Choose your wallet</P>
        <div className={styles.wallets}>
          <div className={styles.wallet_wrapper}>
            <div className={styles.wallet}>
              <p>Metamask</p>
              <Image src={Metamask} width={54} height={54}/>
            </div>
            <P size="s">Preferably if you are a representative or an individual delegator</P>
          </div>
          <div className={styles.wallet_wrapper}>
            <div className={styles.wallet}>
              <p>Gnosis safe</p>
              <Image src={Gnosis} width={48} height={48}/>
            </div>
            <P size="s">Preferably if you wish to empower your DAO members</P>
          </div>
        </div>
      </div>
      <Card style={{marginTop: '40px'}}>
        <P size="l" weight="bold">Connecting Metamask</P>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
          <div className={styles.loader_icon}/>
        </div>
      </Card>
      <Card style={{marginTop: '40px', padding: '60px 100px'}}>
        <Input placeholder="Enter your Gnosis Safe address"/>
        <div className={styles.button_wrapper}>
          <Button size="l" disabled={true}>Continue</Button>
        </div>
      </Card>
    </>
  );
}

