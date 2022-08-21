import React, {useState} from 'react';
import {Button, Card, Input, P, Textarea, SelectBlock, Loader, Modal} from '../../components';
import {createMetaData} from '../../utils/misc';
import {useValueStorage} from '../Select/valueStorage';
import {useAddEventTokenCreateMutation, useMetadataCreateMutation} from '../../generated/graphql';
import {mintSbt} from '../../utils/web3smarts';
import {ContractDeployResultType} from './index';

const errorStyle = {border: '2px solid red'};
const errorStyleSelect = {border: '2px solid red', borderRadius: '15px'};

// eslint-disable-next-line complexity
export const MintProxy = () => {

  const [metadataCreateMutation] = useMetadataCreateMutation();
  const [addEventTokenCreateMutation] = useAddEventTokenCreateMutation();
  const [isModalShown, setIsModalShown] = useState(false);
  const [contractDeployResult, setContractDeployResult] = React.useState<ContractDeployResultType>(null);
  const [loadDeployment, setLoadDeployment] = useState<boolean>(false);

  const {value} = useValueStorage();

  const [error, setError] = React.useState({
    collectionAddressError: false,
    receiverError: false,
    nicknameError: false,
    positionError: false,
    powerError: false,
    socialsError: false,
    paramsError: false
  });

  // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
  const mint = async () => {
    const collectionAddress = (document.getElementById('collection_address_id') as HTMLInputElement).value.trim();
    if (!collectionAddress) {
      setError({...error, collectionAddressError: true});
      console.log(error);
      return;
    }
    const receiver = (document.getElementById('receiver_address_id') as HTMLInputElement).value.trim();
    if (!receiver) {
      setError({...error, receiverError: true});
      return;
    }
    const nickname = (document.getElementById('nickname_id') as HTMLInputElement).value.trim();
    if (!nickname) {
      setError({...error, nicknameError: true});
      return;
    }
    const position = (document.getElementById('position_name_id') as HTMLInputElement).value.trim();
    if (!position) {
      setError({...error, positionError: true});
      return;
    }
    const powers = (document.getElementById('powers_id') as HTMLInputElement).value.trim();
    if (!powers) {
      setError({...error, powerError: true});
      return;
    }
    const telegram = (document.getElementById('telegram_id') as HTMLInputElement).value.trim();
    const twitter = (document.getElementById('twitter_id') as HTMLInputElement).value.trim();
    const discord = (document.getElementById('discord_id') as HTMLInputElement).value.trim();
    if (!telegram && !twitter && !discord) {
      setError({...error, socialsError: true});
      return;
    }
    if (!value) {
      setError({...error, paramsError: true});
      return;
    }
    const now = new Date();
    const expDate = new Date(now.getTime() + value);

    const metaData = createMetaData({
      agentNickname: nickname,
      expiration: expDate,
      positionName: position,
      powerDescription: powers,
      telegram,
      twitter,
      discord
    });

    try {
      setLoadDeployment(true);
      setIsModalShown(true);
      if (metaData) {
        const metaResp = await metadataCreateMutation({
          variables: {
            metadata: metaData
          }
        });
        if (metaResp.data?.metadataCreate) {
          const resp = await mintSbt(collectionAddress, receiver, metaResp.data?.metadataCreate);
          if (resp) {
            const res = await addEventTokenCreateMutation({
              variables: {
                collectionContractAddress: collectionAddress,
                tokenId: resp.events.Transfer.returnValues.tokenId,
                description: '',
                soulAddress: receiver,
                metadataId: metaResp.data?.metadataCreate
              }
            });
            if (res.data?.addEventTokenCreate) {
              setLoadDeployment(false);
              setContractDeployResult('deployed');
            } else {
              setLoadDeployment(false);
              // eslint-disable-next-line sonarjs/no-duplicate-string
              setContractDeployResult('not-deployed');
            }
          } else {
            setLoadDeployment(false);
            setContractDeployResult('not-deployed');
          }
        }
      } else {
        setLoadDeployment(false);
        // eslint-disable-next-line sonarjs/no-duplicate-string
        setContractDeployResult('not-deployed');
      }
    } catch (e: any) {
      console.log(e);
      setLoadDeployment(false);
      setContractDeployResult('not-deployed');
    }
  };

  const closeModal = () => {
    setLoadDeployment(false);
    setContractDeployResult(null);
    setIsModalShown(false);
  };


  return <><P size="l" weight="bold" style={{marginTop: '40px'}}>Create New Proxy</P>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <P size="sm" weight="bold">Proxy Group</P>
      <Input placeholder="Proxy Group Address" id={'collection_address_id'} onChange={() => setError({...error, collectionAddressError: false})} style={error.collectionAddressError ? errorStyle : undefined}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Identify the Agent</P>
      <Input placeholder="Agent Soul Address" id={'receiver_address_id'} onChange={() => setError({...error, receiverError: false})} style={error.receiverError ? errorStyle : undefined}/>
      <Input placeholder="Agent Nickname" id={'nickname_id'} onChange={() => setError({...error, nicknameError: false})} style={error.nicknameError ? errorStyle : undefined}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Describe his role in DAO</P>
      <Input placeholder="Position name" id={'position_name_id'} onChange={() => setError({...error, positionError: false})} style={error.positionError ? errorStyle : undefined}/>
      <Textarea placeholder="Powers Description" id={'powers_id'} onChange={() => setError({...error, powerError: false})} style={error.powerError ? errorStyle : undefined}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Provide Agent’s public contacts</P>
      {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">1. Telegram</P>
        <div style={{width: '70%'}}>
          <Input placeholder="Position name" id={'telegram_id'} onChange={() => setError({...error, socialsError: false})} style={error.socialsError ? errorStyle : undefined}/>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">2. Twitter</P>
        <div style={{width: '70%'}}>
          <Input placeholder="Position name" id={'twitter_id'} onChange={() => setError({...error, socialsError: false})} style={error.socialsError ? errorStyle : undefined}/>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">3. Discord</P>
        <div style={{width: '70%'}}>
          <Input placeholder="Position name" id={'discord_id'} onChange={() => setError({...error, socialsError: false})} style={error.socialsError ? errorStyle : undefined}/>
        </div>
      </div>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Set SBT params</P>
      <SelectBlock placeholder="Expiration" style={error.paramsError ? errorStyleSelect : undefined} onClick={() => setError({...error, paramsError: false})}/>
      <Button size="l" style={{marginTop: '40px'}} onClick={() => mint()}>Create proxy</Button>
    </Card>
    <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => closeModal()}>
      {loadDeployment
        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexDirection: 'column'}}>
          <Loader/>
          <P size="s" style={{textAlign: 'center'}}>Please don&apos;t close the page</P>
        </div>
        : <>
          {contractDeployResult === 'deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'green'}}>SBT was minted successfully</P></>
          )}
          {contractDeployResult === 'not-deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'red'}}>Something go wrong, please try again</P></>
          )}
        </>
      }
    </Modal></>;
};
