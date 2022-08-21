import React from 'react';
import {P} from '../P/P';
import {Card} from '../Card/Card';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import styles from '../../styles/Login.module.scss';
import {deployContract} from '../../utils/deploySmartContract';
import {useAddEventCollectionCreateMutation} from '../../generated/graphql';

export type ContractDeployResultType = 'deployed' | 'not-deployed' | null

// eslint-disable-next-line complexity
export const NewProxy = () => {

  const [addEventCollectionCreateMutation] = useAddEventCollectionCreateMutation();

  const [load, setLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState({
    nameError: false,
    symbolError: false,
    addrError: false
  });
  const [contractDeployResult, setContractDeployResult] = React.useState<ContractDeployResultType>(null);
  const [contractAddressAfterDeploy, setContractAddressAfterDeploy] = React.useState<string>('');

  const createNewProxyGroup = async () => {
    setContractDeployResult(null);
    setContractAddressAfterDeploy('');
    const name = (document.getElementById('group_name') as HTMLInputElement).value.trim();
    const symbol = (document.getElementById('group_symbol') as HTMLInputElement).value.trim();
    const addr = (document.getElementById('group_addr') as HTMLInputElement).value.trim();
    if (!name) {
      setError({...error, nameError: true});
      return;
    }
    if (!symbol) {
      setError({...error, symbolError: true});
      return;
    }
    if (!addr) {
      setError({...error, addrError: true});
      return;
    }
    try {
      setLoad(true);
      const contract = await deployContract('soulBound', name, symbol, addr); //addr = 0xC7ceDD725a1EB415fcA4CAEd7b754628f41A3325
      console.log({contract});
      if (contract) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res = await addEventCollectionCreateMutation({variables: {contractAddress: contract._address, collectionName: name, collectionSymbol: symbol}});
        if (res.data?.addEventCollectionCreate) {
          setContractDeployResult('deployed');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setContractAddressAfterDeploy(contract._address);
          setLoad(false);
        } else {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          setContractDeployResult('not-deployed');
          setLoad(false);
        }
      } else {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        setContractDeployResult('not-deployed');
        setLoad(false);
      }
    } catch (e: any) {
      console.log(e);
      setContractDeployResult('not-deployed');
      setLoad(false);
    }

  };

  return <><P size="l" weight="bold">New Proxy Group</P>
    <P style={{width: '620px', textAlign: 'center', marginTop: '18px'}}>Choose a meaningful name for the Group so that it is clear at a glance which representatives it covers. For example, DAO X Gold Contributors</P>
    <Card style={load ? {marginTop: '40px', alignItems: 'center', padding: '60px 20px'} : {marginTop: '40px', gap: '18px'}}>
      {load
        ? <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
        </div>
        // eslint-disable-next-line sonarjs/no-duplicate-string
        : <><Input placeholder="Group name" id={'group_name'} style={error.nameError ? {border: '2px solid red'} : undefined} onChange={() => setError({...error, nameError: false})}/>
          <Input placeholder="Group symbol" id={'group_symbol'} style={error.symbolError ? {border: '2px solid red'} : undefined} onChange={() => setError({...error, symbolError: false})}/>
          <Input placeholder="Group soul address" id={'group_addr'} style={error.symbolError ? {border: '2px solid red'} : undefined} onChange={() => setError({...error, addrError: false})}/>
          <div style={{width: '100%', margin: '50px 0 25px'}}>
            <Button size="l" onClick={() => createNewProxyGroup()}>Create new group</Button>
          </div></>
      }
      {contractDeployResult === 'deployed' &&
        <>
          <P style={{color: 'green', textAlign: 'center'}}>Proxy group was created successfully</P>
          <P style={{color: 'green', textAlign: 'center'}}>Your proxy group address {contractAddressAfterDeploy}</P>
        </>
      }
      {contractDeployResult === 'not-deployed' && (<P style={{color: 'red', textAlign: 'center'}}>Something go wrong, please try again</P>)}
    </Card></>;
};
