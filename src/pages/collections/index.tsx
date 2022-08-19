import React, {ReactNode} from 'react';
import styles from '../../styles/Collections.module.scss';
import {P, ProxyCard, RoleSwitch} from '../../components';
import cn from 'classnames';
import Link from 'next/link';

export default function CollectionsPage(): ReactNode {
  return (
    <>
      <div className={styles.wrapper}>
        <RoleSwitch/>
        <P size="l" weight="bold">Issued Proxies</P>
        <div className={styles.switch_view}>
          <div className={styles.view}>Show a list</div>
          <div className={cn(styles.view, styles.active_view)}>Show cards</div>
        </div>
        <div className={styles.cards}>
          <ProxyCard name="Michael Williams"/>
          <ProxyCard name="Michael Williams"/>
          <ProxyCard name="Michael Williams"/>
          <ProxyCard name="Michael Williams"/>
        </div>
      </div>
      <Link href="/new-proxy">
        <a>
          <div className={styles.new_proxy}>+</div>
        </a>
      </Link>
    </>
  );
}

