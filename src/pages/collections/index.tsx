import React, {ReactNode, useEffect, useState} from 'react';
import styles from '../../styles/Collections.module.scss';
import {Modal, P, ProxyCard, RoleSwitch} from '../../components';
import cn from 'classnames';
import {ProxiesTable} from '../../components';
import {useRoleStore} from '../../store/store';
import {useMyCollectionsLazyQuery} from '../../generated/graphql';
import {NewProxyBtn} from '../../components/NewProxyBtn/NewProxyBtn';
import moment from 'moment';
import {Verifier} from '../../components/Verifier';

export default function CollectionsPage(): ReactNode {
  const [isModalShown, setIsModalShown] = useState(false);
  const [tokens, setTokens] = useState<any[]>([]);
  const [view, setView] = useState('list');
  const {role} = useRoleStore();
  const [getCollections, {data}] = useMyCollectionsLazyQuery();

  const getTokens = (data: any) => {
    const arr: any[] = [];
    data.whoami.collections.forEach((collection: any) => {
      collection.tokens.forEach((token: any) => {
        arr.push(token);
      });
    });
    setTokens(arr);
  };

  useEffect(() => {
    getCollections({variables: {onlyMine: true}, fetchPolicy: 'no-cache'});
  }, []);

  useEffect(() => {
    if (role === 'representative') {
      getCollections({variables: {onlyMine: false}, fetchPolicy: 'no-cache'});
    }
  }, [role]);

  useEffect(() => {
    if (data) {
      getTokens(data);
    }
  }, [data]);

  return (
    <>
      <div className={styles.wrapper}>
        <RoleSwitch/>
        {(role === 'issuer' || role === 'representative') &&
          <>
            <P size="l" weight="bold">Issued Proxies</P>
            <div className={styles.switch_view}>
              <div className={cn(styles.view, {[styles.active_view]: view === 'list'})} onClick={() => setView('list')}>Show a list</div>
              <div className={cn(styles.view, {[styles.active_view]: view === 'cards'})} onClick={() => setView('cards')}>Show cards</div>
            </div>
            {view === 'cards' &&
              <div className={styles.cards}>
                {tokens.map((token: any, key: number) => (
                  <ProxyCard name={token.metadata.agentNickname} tokenId={token.idInCollection} soul={token.targetSoul.address} role={token.metadata.positionName} collectionName={token.collection.name} collectionAddress={token.collection.address} valid={moment(token.metadata.expiration).format('DD MMM YYYY hh:mm:ss')} key={key}/>
                ))}
              </div>
            }
            {view === 'list' &&
              <>
                {tokens &&
                  <ProxiesTable tokens={tokens}/>
                }
              </>
            }
            <NewProxyBtn/>
          </>
        }
        {role === 'verifier' &&
          <Verifier/>
        }
      </div>
      <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => setIsModalShown(false)}/>
    </>
  );
}

