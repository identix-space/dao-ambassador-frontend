/* eslint-disable brace-style */
import React, {ReactNode} from 'react';
import useWallet, {ModalWallet} from '../hooks/useWallet';
import {deployContract} from '../utils/deploySmartContract';

export default function IndexPage(): ReactNode {
  const {context} = useWallet();

  return (
    <>
      <div>
        <button onClick={context.test}>Deploy Contract</button>
      </div>
      <div>
        <div>
          <h1>Gnosis SBT App</h1>
          <hr />
        </div>
        <div>
          <button onClick={() => { context.getBalance(); console.log(context); }}>get safe balance</button>
          <br />
          <button
            onClick={() => context.sendTransaction()}
          >
            send some ETH
          </button>
          <br />
          <button
            onClick={() => context.signData('dasdsad', 'dsad')}
          >
            Sign data
          </button>
          <hr />
        </div>
        <div>
          <div>
            <b>chainId:</b> {context.chainId}
          </div>
          <br />
          <div>
            <b>accounts:</b> {context.account}
          </div>
          <br />
          <div>
            <b>isActive:</b> {JSON.stringify(context.isActive)}
          </div>
          <br />
          <div>
            <b>error:</b> {context.error}
          </div>
          <button onClick={() => deployContract('soul')}>Deploy</button>
          <button onClick={() => deployContract('soulBound', 'TEST', 'TST', '0xC1cEe87127ee0602d780f8933aCAf1Ba8E2F66A2')}>Deploy soulBound</button>
        </div>
      </div>
      <ModalWallet/>
    </>
  );
}

