import React, {useState} from 'react';
import {Button, Card, Input, Loader, Modal, P} from '../../components';
import {verify} from '../../utils/web3smarts';

const errorStyle = {border: '2px solid red'};

export const Verifier = () => {

  const [isModalShown, setIsModalShown] = useState(false);
  const [load, setLoad] = useState(false);
  const [modalDetails, setModalDetails] = useState<boolean>(false);

  const [error, setError] = React.useState({
    issueAddressError: false,
    proxyAddressError: false,
    tokenIdError: false,
    ownerOfAddressError: false
  });

  const verifyOnClick = async () => {
    const issueAddress = (document.getElementById('issueAddress') as HTMLInputElement).value.trim();
    const proxyAddress = (document.getElementById('proxyAddress') as HTMLInputElement).value.trim();
    const tokenId = (document.getElementById('tokenId') as HTMLInputElement).value.trim();
    const ownerOfAddress = (document.getElementById('ownerOfAddress') as HTMLInputElement).value.trim();
    if (!issueAddress) {
      setError({...error, issueAddressError: true});
      return;
    }
    if (!proxyAddress) {
      setError({...error, proxyAddressError: true});
      return;
    }
    if (!Number(tokenId)) {
      setError({...error, tokenIdError: true});
      return;
    }
    if (!ownerOfAddress) {
      setError({...error, ownerOfAddressError: true});
      return;
    }
    setLoad(true);
    setIsModalShown(true);
    const result = await verify({
      issueAddress: issueAddress,
      proxyAddress: proxyAddress,
      tokenId: Number(tokenId),
      ownerOfAddress: ownerOfAddress
    });
    setModalDetails(result.isOwner && result.isOwnerOf);
    setLoad(false);
  };

  return <>
    <P size="l" weight="bold">Verify the Proxy</P>
    <P>Verify Proxy ownership and ensure it’s not expired</P>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <P size="sm" weight="bold">Identify the Proxy</P>
      <Input placeholder="Issuer Address" id={'issueAddress'} style={error.issueAddressError ? errorStyle : undefined} onChange={() => setError({...error, issueAddressError: false})}/>
      <Input placeholder="Proxy Group" id={'proxyAddress'} style={error.proxyAddressError ? errorStyle : undefined} onChange={() => setError({...error, proxyAddressError: false})}/>
      <Input placeholder="Proxy ID" id={'tokenId'} style={error.tokenIdError ? errorStyle : undefined} onChange={() => setError({...error, tokenIdError: false})}/>
      <P size="sm" weight="bold">Identify the Ambassador </P>
      <Input placeholder="Ambassador’s Soul" id={'ownerOfAddress'} style={error.ownerOfAddressError ? errorStyle : undefined} onChange={() => setError({...error, ownerOfAddressError: false})}/>
      <Button size="l" style={{marginTop: '40px'}} onClick={verifyOnClick}>Verify</Button>
    </Card>
    <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => setIsModalShown(false)} isNotProxyOwner={modalDetails} notExpired={modalDetails}>
      {load && (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Loader/>
        </div>
      )}
    </Modal>
  </>;
};
