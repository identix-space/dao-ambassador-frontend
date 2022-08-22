import React, {ReactNode, useState} from 'react';
import Image from 'next/image';
import {P, Card, Input, Button} from '../../components';
import styles from '../../styles/Login.module.scss';
import Metamask from '../../../public/assets/metamask.svg';
import Gnosis from '../../../public/assets/gnosis.svg';
import useWallet from '../../hooks/useWallet';
import {redirect} from '../../utils/misc';
import {TOKEN} from '../../constants/localStorage';

export default function LoginPage(): ReactNode {

  const {contextMetamask} = useWallet();
  const [loadMetamask, setLoadMetamask] = React.useState(false);
  const [loadGnosis, setLoadGnosis] = React.useState(false);

  const connectMetamaskWallet = async () => {
    setLoadMetamask(true);
    try {
      await contextMetamask.connect();
      const acc = sessionStorage.getItem('account');
      if (acc) {
        redirect('/collections');
      } else {
        setLoadMetamask(false);
      }
    } catch (e: any) {
      console.log('error', e.message);
      sessionStorage.removeItem('wallet');
      sessionStorage.removeItem('account');
      sessionStorage.removeItem(TOKEN);
      setLoadMetamask(false);
    }

  };

  const connectGnosisWallet = async () => {
    setLoadGnosis(true);
  };

  const [errorInput, setErrorInput] = useState<boolean>(false);

  const redirectToGnosis = () => {
    const addr = (document.getElementById('gnosisAddress') as HTMLInputElement).value.trim();
    if (!addr) {
      setErrorInput(true);
      return;
    }
    const uri = `https://gnosis-safe.io/app/${addr}/apps?appUrl=https://sbt.identix.space/welcome`;
    redirect(uri);
  };


  return (
    <>
      {!loadMetamask && !loadGnosis && (
        <div className={styles.card}>
          <P size="l" weight="bold">Choose your wallet</P>
          <div className={styles.wallets}>
            <div className={styles.wallet_wrapper}>
              <div className={styles.wallet} onClick={() => connectMetamaskWallet()}>
                <p>Metamask</p>
                <Image src={Metamask} width={54} height={54}/>
              </div>
              <P size="s">Preferably if you are a representative or an individual delegator</P>
            </div>
            <div className={styles.wallet_wrapper}>
              <div className={styles.wallet} onClick={() => connectGnosisWallet()}>
                <p>Gnosis safe</p>
                <Image src={Gnosis} width={48} height={48}/>
              </div>
              <P size="s">Preferably if you wish to empower your DAO members</P>
            </div>
          </div>
        </div>
      )}
      {loadMetamask &&
      <Card style={{marginTop: '40px', alignItems: 'center', padding: '60px 20px'}}>
        <P size="l" weight="bold">Connecting Metamask</P>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
          <div className={styles.loader_icon}/>
        </div>
      </Card>
      }
      {loadGnosis &&
      <Card style={{marginTop: '40px'}}>
        <Input placeholder={'Enter your Gnosis Safe address'} id={'gnosisAddress'} style={errorInput ? {border: '2px solid red'} : undefined} onChange={() => setErrorInput(false)}/>
        <Button size="l" style={{marginTop: '40px'}} onClick={() => redirectToGnosis()}>CONTINUE</Button>
      </Card>
      }
    </>
  );
}

