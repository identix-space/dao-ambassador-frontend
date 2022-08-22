import React, {ReactNode} from 'react';
import {Verifier} from '../../components/Verifier';
import {BackButton} from '../../components';

export default function VerifyPage(): ReactNode {
  return (
    <>
      <BackButton link="/"/>
      <Verifier/>
    </>
  );
}

