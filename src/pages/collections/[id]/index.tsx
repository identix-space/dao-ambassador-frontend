import React, {ReactNode} from 'react';
import styles from '../../../styles/ProxyDetails.module.scss';
import {Button, P} from '../../../components';
import {startAndEnd} from '../../../utils/misc';

export default function ProxyDetailsPage(): ReactNode {
  return (
    <>
      <P size="l" weight="bold">Proxy ID: 0233432334</P>
      <P weight="bold">Issued by: {startAndEnd('0x3436r4ygf6743dsafdf8332d923uf34c', 5, 3)}</P>
      <div className={styles.proxy_card}>
        <div className={styles.top}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <P size="l" weight="bold" color="white">Alex Varabei</P>
            <p className={styles.role}>Community Manager</p>
            <P size="l" weight="bold" color="white">HowToDAO Admins Collection</P>
          </div>
          <P size="sm" weight="bold" color="white">Soul: {startAndEnd('0x2636r4ygf6743dsafdf8332d92dgdse5', 4, 4)}</P>
        </div>
        <div className={styles.bottom}>
          <div>
            <P size="sm" weight="bold">Role description</P>
            <P style={{marginTop: '18px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also th</P>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <P size="sm" weight="bold">Telegram</P>
              <P style={{marginTop: '18px'}}>@avarab</P>
            </div>
            <div>
              <P size="sm" weight="bold">Twitter</P>
              <P style={{marginTop: '18px'}}>@avarab</P>
            </div>
            <div>
              <P size="sm" weight="bold">Discord</P>
              <P style={{marginTop: '18px'}}>@avarab</P>
            </div>
          </div>
          <div>
            <P size="sm" weight="bold">Valid till</P>
            <P style={{marginTop: '18px'}}>20 Nov 2022</P>
          </div>
          <Button style={{margin: '10px auto 0'}}>Copy share link</Button>
        </div>
      </div>
    </>
  );
}

