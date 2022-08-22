import React, {ReactNode, useEffect} from 'react';
import Image from 'next/image';
import {P, Button} from '../../components';
import styles from '../../styles/Welcome.module.scss';
import Welcome1 from '../../../public/assets/welcome1.png';
import Welcome2 from '../../../public/assets/welcome2.png';
import Welcome3 from '../../../public/assets/welcome3.png';
import {redirect} from '../../utils/misc';

export default function WelcomePage(): ReactNode {

  const [gnosisAvailable, setGnosisAvailable] = React.useState(false);

  useEffect(() => {
    const gn = sessionStorage.getItem('isGnosisAvailable');
    if (gn === 'true') {
      setGnosisAvailable(true);
    }
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Welcome to DAO Ambassador</h1>
      <P size="l" weight="bold">SBT solution for representation in DAOs</P>
      <div className={styles.advs}>
        <div className={styles.adv}>
          <Image src={Welcome1} objectFit="contain" layout="fill"/>
        </div>
        <div className={styles.adv}>
          <Image src={Welcome2} objectFit="contain" layout="fill"/>
        </div>
        <div className={styles.adv}>
          <Image src={Welcome3} objectFit="contain" layout="fill"/>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => gnosisAvailable ? redirect('/collections') : redirect('/login')}>Delegate powers</Button>
        <Button>Verify the ambassador</Button>
      </div>
    </>
  );
}

