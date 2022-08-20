import React, {useState} from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import Logo from '../../../public/assets/logo.svg';
import {P} from '../P/P';
import ArrowDown from '../../../public/assets/arrow.svg';
import {redirect, startAndEnd} from '../../utils/misc';
import cn from 'classnames';
import Link from 'next/link';
import useWallet from '../../hooks/useWallet';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {context} = useWallet();

  const logOut = () => {
    sessionStorage.clear();
    redirect('/welcome');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image src={Logo} width={64} height={64}/>
        <P weight="bold" size="m" color="black">DAO Ambassador</P>
      </div>
      {context.account && (
        <div className={cn(styles.user, {[styles.opened_menu]: isMenuOpen})} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={styles.avatar}>{<Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} width={46} height={46} layout="fixed"/>}</div>
          <p className={styles.username}>{startAndEnd(context.account, 6, 4)}</p>
          <div className={cn(styles.show_btn, {[styles.opened]: isMenuOpen})}>
            <Image src={ArrowDown.src} width={15} height={12} />
          </div>
        </div>
      )}
      {isMenuOpen &&
      <div className={styles.user_menu}>
        <Link href="/account">
          <a className={styles.gradient_text}>
            Manage my soul(s)
          </a>
        </Link>
        <P size="s" weight="bold" onClick={() => logOut()}>Log out</P>
      </div>
      }
    </div>
  );
}
