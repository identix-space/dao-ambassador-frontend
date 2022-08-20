import React from 'react';
import {RoleSwitchProps} from './RoleSwitch.props';
import styles from './RoleSwitch.module.scss';
import cn from 'classnames';
import {useRoleStore} from '../../store/store';

export const RoleSwitch = ({...props}: RoleSwitchProps): JSX.Element => {
  const {role, setRole} = useRoleStore();

  return (
    <div
      className={styles.switcher}
      {...props}
    >
      <div className={cn(styles.role, {[styles.active]: role === 'issuer'})} onClick={() => setRole('issuer')}>
        <span>Proxy Issuer</span>
      </div>
      <div className={cn(styles.role, {[styles.active]: role === 'representative'})} onClick={() => setRole('representative')}>
        <span>Representative</span>
      </div>
      <div className={cn(styles.role, {[styles.active]: role === 'verifier'})} onClick={() => setRole('verifier')}>
        <span>Verifier</span>
      </div>
    </div>
  );
};
