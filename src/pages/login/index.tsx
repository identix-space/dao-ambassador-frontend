import React, {ReactNode, useEffect} from 'react';
import Image from 'next/image';
import {P, Card} from '../../components';
import styles from '../../styles/Login.module.scss';
import Metamask from '../../../public/assets/metamask.svg';
import Gnosis from '../../../public/assets/gnosis.svg';
import useWallet from '../../hooks/useWallet';
import {redirect} from '../../utils/misc';
import {TOKEN} from '../../constants/localStorage';

export default function LoginPage(): ReactNode {

  const {contextMetamask, contextGnosis} = useWallet();
  const [loadMetamask, setLoadMetamask] = React.useState(false);
  const [loadGnosis, setLoadGnosis] = React.useState(false);
  const [gnosisAvailable, setGnosisAvailable] = React.useState(false);

  const connectMetamaskWallet = async () => {
    if (!gnosisAvailable) {
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
    } else {
      redirect('localhost:3000/welcome');
    }
  };

  const connectGnosisWallet = async () => {
    if (gnosisAvailable) {
      setLoadGnosis(true);
      try {
        await contextGnosis.connect();
        const acc = sessionStorage.getItem('account');
        if (acc) {
          redirect('/collections');
        } else {
          setLoadGnosis(false);
        }
      } catch (e: any) {
        console.log('error', e.message);
        sessionStorage.removeItem('wallet');
        sessionStorage.removeItem('account');
        sessionStorage.removeItem(TOKEN);
        setLoadGnosis(false);
      }
    } else {
      redirect('https://gnosis-safe.io/app');
    }
  };

  useEffect(() => {
    const gn = sessionStorage.getItem('isGnosisAvailable');
    if (gn === 'true') {
      setGnosisAvailable(true);
    }
  }, []);


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
        <P size="l" weight="bold">Connecting Metamask</P>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
          <div className={styles.loader_icon_gnosis}/>
        </div>
      </Card>
      }
      {/*<Card style={{marginTop: '40px', padding: '60px 100px'}}>*/}
      {/*  <Input placeholder="Enter your Gnosis Safe address"/>*/}
      {/*  <div className={styles.button_wrapper}>*/}
      {/*    <BackButton size="l" disabled={true}>Continue</BackButton>*/}
      {/*  </div>*/}
      {/*</Card>*/}
    </>
  );
}

