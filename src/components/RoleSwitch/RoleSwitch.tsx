import React from 'react';
import {RoleSwitchProps} from './RoleSwitch.props';
import styles from './RoleSwitch.module.scss';
import cn from 'classnames';

export const RoleSwitch = ({...props}: RoleSwitchProps): JSX.Element => {
  return (
    <div
      className={styles.switcher}
      {...props}
    >
      <div className={cn(styles.role, styles.active)}>
        <span>Proxy Issuer</span>
      </div>
      <div className={styles.role}>
        <span>Representative</span>
      </div>
      <div className={styles.role}>
        <span>Verifier</span>
      </div>
    </div>
  );
};
