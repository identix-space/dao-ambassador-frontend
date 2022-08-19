import React, {useState} from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import Logo from '../../../public/assets/logo.svg';
import {P} from '../P/P';
import ArrowDown from '../../../public/assets/arrow.svg';
import {startAndEnd} from '../../utils/misc';
import cn from 'classnames';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image src={Logo} width={64} height={64}/>
        <P weight="bold" size="m" color="black">DAO Ambassador</P>
      </div>
      <div className={cn(styles.user, {[styles.opened_menu]: isMenuOpen})} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={styles.avatar}>{<Image loader={() => 'https://avatars.dicebear.com/api/adventurer-neutral/3fsdvsd.svg'} src={'https://avatars.dicebear.com/api/adventurer-neutral/3fsdvsd.svg'} width={46} height={46} layout="fixed"/>}</div>
        <p className={styles.username}>{startAndEnd('hfduifds54fsa7f7stafgysafsdgsgds', 6, 4)}</p>
        <div className={cn(styles.show_btn, {[styles.opened]: isMenuOpen})}>
          <Image src={ArrowDown.src} width={15} height={12} />
        </div>
      </div>
      {isMenuOpen &&
            <div className={styles.user_menu}>
              <Link href="/account">
                <a className={styles.gradient_text}>
                        Manage my soul(s)
                </a>
              </Link>
              <P size="s" weight="bold">Log out</P>
            </div>
      }
    </div>
  );
}
