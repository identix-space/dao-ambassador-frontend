import React, {ReactNode, useState} from 'react';
import styles from '../../styles/Collections.module.scss';
import {Button, Card, Input, Modal, P, ProxyCard, RoleSwitch} from '../../components';
import cn from 'classnames';
import Link from 'next/link';
import {ProxiesTable} from '../../components';
import {redirect} from '../../utils/misc';
import {useRoleStore} from '../../store/store';

export default function CollectionsPage(): ReactNode {
  const [isModalShown, setIsModalShown] = useState(true);
  const [view, setView] = useState('list');
  const {role} = useRoleStore();

  return (
    <>
      <div className={styles.wrapper}>
        <RoleSwitch/>
        <button onClick={() => redirect('/')}>GO</button>
        {role === 'issuer' &&
          <>
            <P size="l" weight="bold">Issued Proxies</P>
            <div className={styles.switch_view}>
              <div className={cn(styles.view, {[styles.active_view]: view === 'list'})} onClick={() => setView('list')}>Show a list</div>
              <div className={cn(styles.view, {[styles.active_view]: view === 'cards'})} onClick={() => setView('cards')}>Show cards</div>
            </div>
            {view === 'cards' &&
              <div className={styles.cards}>
                <ProxyCard name="Michael Williams"/>
                <ProxyCard name="Michael Williams"/>
                <ProxyCard name="Michael Williams"/>
                <ProxyCard name="Michael Williams"/>
              </div>
            }
            {view === 'list' &&
              <ProxiesTable/>
            }
          </>
        }
        {role === 'verifier' &&
          <>
            <P size="l" weight="bold">Verify the Proxy</P>
            <P>Verify Proxy ownership and ensure it’s not expired</P>
            <Card style={{marginTop: '40px', gap: '18px'}}>
              <P size="sm" weight="bold">Identify the Proxy</P>
              <Input placeholder="Issuer Address"/>
              <Input placeholder="Proxy Group"/>
              <Input placeholder="Proxy ID"/>
              <P size="sm" weight="bold">Identify the expected Ambassador </P>
              <Input placeholder="Ambassador’s Soul"/>
              <Button size="l" style={{marginTop: '40px'}}>Verify</Button>
            </Card>
          </>
        }
      </div>
      <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => setIsModalShown(false)}/>
      <Link href="/new-proxy">
        <a>
          <div className={styles.new_proxy}>+</div>
        </a>
      </Link>
    </>
  );
}

