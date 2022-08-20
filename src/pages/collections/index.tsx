import React, {ReactNode, useState} from 'react';
import styles from '../../styles/Collections.module.scss';
import {P, ProxyCard, RoleSwitch} from '../../components';
import cn from 'classnames';
import Link from 'next/link';
import {ProxiesTable} from '../../components';
import {redirect} from '../../utils/misc';

export default function CollectionsPage(): ReactNode {
  const [view, setView] = useState('list');

  return (
    <>
      <div className={styles.wrapper}>
        <RoleSwitch/>
        <button onClick={() => redirect('/')}>GO</button>
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
      </div>
      <Link href="/new-proxy">
        <a>
          <div className={styles.new_proxy}>+</div>
        </a>
      </Link>
    </>
  );
}

