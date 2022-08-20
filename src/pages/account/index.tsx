import React, {ReactNode} from 'react';
import styles from '../../styles/Account.module.scss';
import Image from 'next/image';
import {P} from '../../components';
import useWallet from '../../hooks/useWallet';
import {useWhoamiQuery} from '../../generated/graphql';
import {NewProxyBtn} from '../../components/NewProxyBtn/NewProxyBtn';


export default function AccountPage(): ReactNode {
  const {context} = useWallet();
  const {data} = useWhoamiQuery();

  return (
    <>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} objectFit="contain" layout="fill"/>
        </div>
        <div className={styles.user_info}>
          <P size="l" weight="bold">{context.account}</P>
          <div className={styles.safe_account}><span>Gnosis safe account</span></div>
        </div>
      </div>
      <P size="l" weight="bold">My souls</P>
      <div className={styles.souls}>
        {data && data.whoami.souls && data.whoami.souls.length > 0
          ? <>
            <div className={styles.souls_header}>
              <P size="s" weight="bold">ADDRESS</P>
              <P size="s" weight="bold">OWNER</P>
            </div>
            <div className={styles.souls_list}>

              {data.whoami?.souls.map((soul, key) => (
                <div className={styles.soul_row} key={key}>
                  <P size="s" weight="bold">{soul.address}</P>
                  <P size="s" weight="bold">{soul.address}</P>
                </div>))}
            </div>
          </>
          : <P size="l" style={{margin: '95px 0 50px', textAlign: 'center'}}>No souls yet.</P>
        }
      </div>
      <NewProxyBtn/>
    </>
  );
}

