import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import {ProxiesTableProps} from './ProxiesTable.props';
import styles from './ProxiesTable.module.scss';
import {Button, Copy, Loader} from '..';
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
              <th/>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token: any, key: any) => (
              <tr key={key}>
                <td><Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} width={46} height={46}/>{token.metadata.agentNickname}</td>
                <td>{startAndEnd(token.idInCollection, 4, 3)}<Copy text={token.idInCollection}/></td>
                <td>{startAndEnd(token.targetSoul.address, 4, 4)}<Copy text={token.targetSoul.address}/></td>
                <td>{token.metadata.positionName}</td>
                <td>{token.collection.name}</td>
                <td>{moment(token.metadata.expiration).format('DD MMM YYYY hh:mm:ss')}</td>
                <td><Link href={{pathname: `/collections/${token.idInCollection}`, query: {collectionAddress: `${token.collection.address}`}}}>
                  <a>
                    <Button size="xs" view="transparent">Details</Button></a>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        : <Loader/>
      }
    </>
  );
};
