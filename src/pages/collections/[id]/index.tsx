import React, {ReactNode, useEffect, useState} from 'react';
import styles from '../../../styles/ProxyDetails.module.scss';
import {BackButton, Button, Copy, Loader, P} from '../../../components';
import {startAndEnd} from '../../../utils/misc';
import {useRouter} from 'next/router';
import {useGetTokenLazyQuery} from '../../../generated/graphql';
import moment from 'moment';
import {collectionOwner} from '../../../utils/web3smarts';

export default function ProxyDetailsPage(): ReactNode {
  const router = useRouter();
  const [getToken, {data}] = useGetTokenLazyQuery();

  const [ownerAddress, setOwnerAddress] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (router && router.query && router.query.collectionAddress && router.query.id) {
        getToken({variables: {collectionAddress: router.query.collectionAddress.toString(), tokenId: router.query.id.toString()}});
        setOwnerAddress(await collectionOwner(router.query.collectionAddress.toString()));
      }
    })();
  }, [router.query]);


  return (
    <>
      <BackButton link="/collections"/>
      {data
        ? <>
          <P size="l" weight="bold" style={{marginBottom: '15px'}}>Proxy ID: {startAndEnd(data.token.idInCollection, 5, 5)}<Copy text={data.token.idInCollection} style={{marginLeft: '10px'}}/></P>
          <P weight="bold">Issued by: {startAndEnd(ownerAddress, 5, 3)}</P>
          <div className={styles.proxy_card}>
            <div className={styles.top}>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <P size="l" weight="bold" color="white">{data.token.metadata.agentNickname}</P>
                <p className={styles.role}>{data.token.metadata.positionName}</p>
                <P size="l" weight="bold" color="white">{data.token.collection.name}</P>
              </div>
              <P size="sm" weight="bold" color="white">Soul: {startAndEnd(data.token.targetSoul.address, 4, 4)}</P>
            </div>
            <div className={styles.bottom}>
              <div>
                <P size="sm" weight="bold">Role description</P>
                <P style={{marginTop: '18px'}}>{data.token.metadata.powerDescription}</P>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <P size="sm" weight="bold">Telegram</P>
                  <P style={{marginTop: '18px'}}>{data.token.metadata.socialAccounts.telegram}</P>
                </div>
                <div>
                  <P size="sm" weight="bold">Twitter</P>
                  <P style={{marginTop: '18px'}}>{data.token.metadata.socialAccounts.twitter}</P>
                </div>
                <div>
                  <P size="sm" weight="bold">Discord</P>
                  <P style={{marginTop: '18px'}}>{data.token.metadata.socialAccounts.discord}</P>
                </div>
              </div>
              <div>
                <P size="sm" weight="bold">Valid till</P>
                <P style={{marginTop: '18px'}}>{moment(data.token.metadata.expiration).format('DD MMM YYYY hh:mm:ss')}</P>
              </div>
              <Button onClick={() => navigator.clipboard.writeText(`https://sbt.identix.space${router.asPath}`)} style={{margin: '10px auto 0'}}>Copy share link</Button>
            </div>
          </div>
        </>
        : <Loader/>
      }
    </>
  );
}

