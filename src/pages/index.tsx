import React, {ReactNode, useState} from 'react';
import {gnosisSafe, hooks} from '../utils/gnosisSafe';

const {useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames} = hooks;

export default function IndexPage(): ReactNode {
    const chainId = useChainId();
    const accounts = useAccounts();
    const isActivating = useIsActivating();

    const isActive = useIsActive();

    const provider = useProvider();
    const ENSNames = useENSNames(provider);

    const [error] = useState(undefined);

    return (
        <div>
            <div>
                <h1>Gnosis SBT App</h1>
                <hr/>
            </div>
            <div>
                <button onClick={() => gnosisSafe.connectEagerly()}>Connect Gnosis Wallet</button>
                <br/>
                <button
                    onClick={async () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const currentSafeAddress = provider?.provider.safe.safeAddress;
                        const resHex = await gnosisSafe.sdk?.eth.getBalance([currentSafeAddress]);
                        const res = parseInt(resHex!, 16);
                        // convert wei to ether
                        const resEther = res / 1e18;
                        // eslint-disable-next-line no-alert
                        alert(resEther);
                    }}>
                    get safe balance
                </button>
                <br/>
                <button onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const currentSafeAddress = provider?.provider.safe.safeAddress;
                    const signer = provider?.getSigner(0);
                    signer?.sendTransaction({to: currentSafeAddress, value: '123'});
                }
                }>
                    send some ETH
                </button>
                <br/>
                <button onClick={async () => {
                    const signer = provider?.getSigner(0);
                    const signed = await signer?.signMessage('hello');
                    console.log(signed);
                }}>Sign data
                </button>
                <hr/>
            </div>
            <div>
                <div><b>chainId:</b> {JSON.stringify(chainId)}</div>
                <br/>
                <div><b>accounts:</b> {JSON.stringify(accounts)}</div>
                <br/>
                <div><b>isActivating:</b> {JSON.stringify(isActivating)}</div>
                <br/>
                <div><b>isActive:</b> {JSON.stringify(isActive)}</div>
                <br/>
                <div><b>error:</b> {JSON.stringify(error)}</div>
                <br/>
                <div><b>provider:</b>
                    <pre>{JSON.stringify(provider?.provider, null, 2)}</pre>
                </div>
                <br/>
                <div><b>ENSNames:</b> {JSON.stringify(ENSNames)}</div>
                <br/>
            </div>
        </div>
    );
}

