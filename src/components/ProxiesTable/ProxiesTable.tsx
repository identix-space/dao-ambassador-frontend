import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import {ProxiesTableProps} from './ProxiesTable.props';
import styles from './ProxiesTable.module.scss';
import {Copy, Loader} from '..';
import {startAndEnd} from '../../utils/misc';
import useWallet from '../../hooks/useWallet';
import Link from 'next/link';

export const ProxiesTable = ({tokens, ...props}: ProxiesTableProps): JSX.Element => {

  const {context} = useWallet();

  return (
    <>
      {tokens
        ? <table
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
            {tokens.map((token: any, key: any) => (
              <tr key={key}>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a><Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} width={46} height={46}/>{token.metadata.agentNickname}
                  </a>
                </Link></td>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a>{startAndEnd(token.idInCollection, 4, 3)}<Copy text={token.idInCollection}/></a>
                </Link></td>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a>{startAndEnd(token.targetSoul.address, 4, 4)}<Copy text={token.targetSoul.address}/></a>
                </Link></td>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a>{token.metadata.positionName}</a>
                </Link></td>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a>{token.collection.name}</a>
                </Link></td>
                <td><Link href={`/collections/${token.idInCollection}`}>
                  <a>{moment(token.metadata.expiration).format('DD MMM YYYY hh:mm:ss')}</a>
                </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        : <Loader/>
      }
    </>
  );
};
