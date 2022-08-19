/* eslint-disable brace-style */
import React, {ReactNode} from 'react';
import useWallet, {ModalWallet} from '../hooks/useWallet';

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
            onClick={() => context.signData()}
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
        </div>
      </div>
      <ModalWallet/>
    </>
  );
}

