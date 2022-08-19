import React, {ReactNode} from 'react';
import {Button, Card, Input, P, Textarea} from '../../components';

export default function NewProxyPage(): ReactNode {
  return (
    <>
      <P size="l" weight="bold">New Proxy Group</P>
      <P style={{width: '620px', textAlign: 'center', marginTop: '18px'}}>Choose a meaningful name for the Group so that it is clear at a glance which representatives it covers. For example, DAO X Gold Contributors</P>
      <Card style={{marginTop: '40px', gap: '18px'}}>
        <Input placeholder="Group name"/>
        <Input placeholder="Group symbol"/>
        <div style={{width: '100%', margin: '50px 0 25px'}}>
          <Button size="l">Create new group</Button>
        </div>
      </Card>

      <P size="l" weight="bold" style={{marginTop: '40px'}}>Create New Proxy</P>
      <Card style={{marginTop: '40px', gap: '18px'}}>
        <P size="sm" weight="bold">Identify the Agent</P>
        <Input placeholder="Agent Soul Address"/>
        <Input placeholder="Agent Nickname"/>
        <P size="sm" weight="bold" style={{marginTop: '20px'}}>Describe his role in DAO</P>
        <Input placeholder="Position name"/>
        <Textarea placeholder="Powers Description"/>
        <P size="sm" weight="bold" style={{marginTop: '20px'}}>Provide Agent’s public contacts</P>
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
        <Input placeholder="Expiration"/>
        <Input placeholder="Proxy group"/>
        <Button size="l" style={{marginTop: '40px'}}>Create proxy</Button>
      </Card>
    </>
  );
}

