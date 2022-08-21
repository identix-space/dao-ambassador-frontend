import React, {ReactNode} from 'react';
import {Button, Card, Input, P, Textarea, SelectBlock} from '../../components';
import {NewProxy} from '../../components/NewProxy';

export default function NewProxyPage(): ReactNode {
  return (
    <>
      <NewProxy/>

      <P size="l" weight="bold" style={{marginTop: '40px'}}>Create New Proxy</P>
      <Card style={{marginTop: '40px', gap: '18px'}}>
        <P size="sm" weight="bold">Identify the Agent</P>
        <Input placeholder="Agent Soul Address"/>
        <Input placeholder="Agent Nickname"/>
        <P size="sm" weight="bold" style={{marginTop: '20px'}}>Describe his role in DAO</P>
        <Input placeholder="Position name"/>
        <Textarea placeholder="Powers Description"/>
        <P size="sm" weight="bold" style={{marginTop: '20px'}}>Provide Agent’s public contacts</P>
        {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
          <P weight="bold">1. Telegram</P>
          <Input style={{width: '70%'}} placeholder="Position name"/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
          <P weight="bold">2. Twitter</P>
          <Input style={{width: '70%'}} placeholder="Position name"/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
          <P weight="bold">3. Discord</P>
          <Input style={{width: '70%'}} placeholder="Position name"/>
        </div>
        <P size="sm" weight="bold" style={{marginTop: '20px'}}>Set SBT params</P>
        <SelectBlock placeholder="Expiration"/>
        <Button size="l" style={{marginTop: '40px'}}>Create proxy</Button>
      </Card>
    </>
  );
}

