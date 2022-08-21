import React, {FunctionComponent, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import {P} from '..';
import styles from './Modal.module.scss';
import CheckGreen from '../../../public/assets/check_green.svg';
import CheckRed from '../../../public/assets/check_red.svg';

export interface ModalProps {
    isShown: boolean;
    hide?: () => void;
    modalContent?: string;
    modalTitle?: string;
    children?: React.ReactNode
}

export const Modal: FunctionComponent<ModalProps> = ({isShown, hide, modalTitle, children}) => {
  const [notExpired] = useState(false);
  const [isNotProxyOwner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const modal = (
    <>
      <div className={styles.backdrop} onClick={hide}/>
      <div className={styles.wrapper}>
        {children
          ? <>{children}</>
          : <div className={styles.content}>
            <P size="l" weight="bold">{modalTitle}</P>
            <div className={styles.results}>
              <div className={styles.result}>
                <Image src={notExpired ? CheckGreen : CheckRed} width={37} height={37}/>
                {notExpired
                  ? <span>Proxy is not expired</span>
                  : <span>Proxy is expired</span>
                }
              </div>
              <div className={styles.result}>
                <Image src={isNotProxyOwner ? CheckGreen : CheckRed} width={37} height={37}/>
                <span>The entered Soul is the Proxy owner</span>
              </div>
            </div>
          </div>
        }
        <div className={styles.close} onClick={hide}/>
      </div>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (isShown && mounted) ? ReactDOM.createPortal(modal, document.querySelector('#myportal')) : null;
};
