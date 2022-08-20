import React from 'react';
import Image from 'next/image';
import {ProxiesTableProps} from './ProxiesTable.props';
import styles from './ProxiesTable.module.scss';
import {Copy} from '..';
import {startAndEnd} from '../../utils/misc';
import Avatar from '../../../public/assets/avatar.svg';

export const ProxiesTable = ({data, ...props}: ProxiesTableProps): JSX.Element => {
  return (
    <table
      className={styles.table}
      {...props}
    >
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Proxy ID</th>
          <th>Soul</th>
          <th>Role</th>
          <th>Proxy group</th>
          <th>Valid till</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Image src={Avatar} width={46} height={46}/>{data.whoami.id}</td>
          <td>{startAndEnd('004hgfskja3y27trgyvt3cvy238cy23i443', 4, 3)}<Copy text="004hgfskja3y27trgyvt3cvy238cy23i443"/></td>
          <td>{startAndEnd('gfhuds456fs86h45s7h6dh4a864hda68s6a', 4, 4)}<Copy text="gfhuds456fs86h45s7h6dh4a864hda68s6a"/></td>
          <td>Community Manager</td>
          <td>HowToDAO Admins</td>
          <td>19 Feb 2022 12:33:32</td>
        </tr>
      </tbody>
    </table>
  );
};
