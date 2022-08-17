import React, {ReactNode, useState, useEffect} from 'react';
import useGnosis from '../hooks/useGnosis';
import useMetamask from '../hooks/useMetamask';
import useWallet, {ModalWallet} from '../hooks/useWallet';
import {gnosisSafe, hooks} from '../utils/gnosisSafe';

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames
} = hooks;

export default function IndexPage(): ReactNode {
  const chainId = useChainId();
  const accounts = useAccounts();
  const {context} = useWallet();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error] = useState(undefined);

  return (
    <>
      <div>
        <div>
          <h1>Gnosis SBT App</h1>
          <hr />
        </div>
        <div>
          <button onClick={() => gnosisSafe.connectEagerly()}>
            Connect Gnosis Wallet
          </button>
          <br />
          <button onClick={() => context.getBalance()}>get safe balance</button>
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
            <b>isActivating:</b> {JSON.stringify(isActivating)}
          </div>
          <br />
          <div>
            <b>isActive:</b> {context.isActive}
          </div>
          <br />
          <div>
            <b>error:</b> {context.error}
          </div>
          <br />
          <div>
            <b>provider:</b>
            <pre>{JSON.stringify(provider?.provider, null, 2)}</pre>
          </div>
          <br />
          <div>
            <b>ENSNames:</b> {JSON.stringify(ENSNames)}
          </div>
          <br />
        </div>
      </div>
      <ModalWallet/>
    </>
  );
}

