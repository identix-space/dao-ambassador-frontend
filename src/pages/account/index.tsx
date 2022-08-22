import React, {ReactNode, useState} from 'react';
import styles from '../../styles/Account.module.scss';
import Image from 'next/image';
import {Button, Copy, Loader, Modal, P} from '../../components';
import useWallet from '../../hooks/useWallet';
import {useAddEventSoulCreateMutation, useWhoamiQuery, WhoamiDocument} from '../../generated/graphql';
import stylesPlus from '../../styles/Collections.module.scss';
import {deployContract} from '../../utils/deploySmartContract';
import {ContractDeployResultType} from '../../components/NewProxy';


// eslint-disable-next-line complexity
export default function AccountPage(): ReactNode {
  const {context} = useWallet();
  const {data} = useWhoamiQuery();
  const [addEventSoulCreateMutation] = useAddEventSoulCreateMutation({
    refetchQueries: [
      {query: WhoamiDocument},
      'whoami'
    ]
  });
  const [isModalShown, setIsModalShown] = useState(false);
  const [contractDeployResult, setContractDeployResult] = React.useState<ContractDeployResultType>(null);
  const [loadDeployment, setLoadDeployment] = useState<boolean>(false);

  const deploySoul = async () => {
    setLoadDeployment(true);
    setContractDeployResult(null);
    try {
      const deployResult = await deployContract('soul');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (deployResult._address) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res = await addEventSoulCreateMutation({variables: {soulAddress: deployResult._address}});
        if (res.data?.addEventSoulCreate) {
          setContractDeployResult('deployed');
          setLoadDeployment(false);
        } else {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          setContractDeployResult('not-deployed');
          setLoadDeployment(false);
        }
      } else {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        setContractDeployResult('not-deployed');
        setLoadDeployment(false);
      }
    } catch (e: any) {
      setContractDeployResult('not-deployed');
      setLoadDeployment(false);
    }

  };

  const closeModal = () => {
    setLoadDeployment(false);
    setContractDeployResult(null);
    setIsModalShown(false);
  };

  return (
    <>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${context.account}.svg`} objectFit="contain" layout="fill"/>
        </div>
        <div className={styles.user_info}>
          <P size="l" weight="bold">{context.account}<Copy text={context.account} style={{marginLeft: '10px', verticalAlign: '-2px'}}/></P>
          <div className={styles.safe_account}><span>Gnosis safe account</span></div>
        </div>
      </div>
      <P size="l" weight="bold">My souls</P>
      <div className={styles.souls}>
        {data && data.whoami.souls && data.whoami.souls.length > 0 && context.account
          ? <>
            <div className={styles.souls_header}>
              <P size="s" weight="bold">ADDRESS</P>
              <P size="s" weight="bold">OWNER</P>
            </div>
            <div className={styles.souls_list}>

              {data.whoami?.souls.map((soul, key) => (
                <div className={styles.soul_row} key={key}>
                  <P size="s" weight="bold">{soul.address}<Copy text={soul.address}/></P>
                  <P size="s" weight="bold">{context.account}<Copy text={context.account}/></P>
                </div>))}
            </div>
          </>
          : <P size="l" style={{margin: '95px 0 50px', textAlign: 'center'}}>No souls yet.</P>
        }
      </div>
      <div className={stylesPlus.new_proxy} onClick={() => setIsModalShown(true)}>+</div>
      <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => closeModal()}>
        {loadDeployment
          ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexDirection: 'column'}}>
            <Loader/>
            <P size="s" style={{textAlign: 'center'}}>Please don&apos;t close the page</P>
          </div>
          : <>
            {contractDeployResult === null && (
              <><P size="l" style={{textAlign: 'center'}}>Create soul?</P>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px'}}>
                  <Button size="l" style={{marginTop: '40px'}} onClick={() => deploySoul()}>Yes</Button>
                  <Button size="l" style={{marginTop: '40px'}} onClick={() => setIsModalShown(false)}>No</Button>
                </div>
              </>
            )}
            {contractDeployResult === 'deployed' && (
              <><P size="l" style={{textAlign: 'center', color: 'green'}}>Soul was created successfully</P></>
            )}
            {contractDeployResult === 'not-deployed' && (
              <><P size="l" style={{textAlign: 'center', color: 'red'}}>Something go wrong, please try again</P></>
            )}
          </>
        }
      </Modal>
    </>
  );
}

