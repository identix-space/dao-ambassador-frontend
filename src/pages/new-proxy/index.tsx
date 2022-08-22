import React, {ReactNode} from 'react';

import {NewProxy} from '../../components/NewProxy';
import {MintProxy} from '../../components/NewProxy/mintProxy';
import {BackButton} from '../../components';

export default function NewProxyPage(): ReactNode {
  return (
    <>
      <BackButton link="/collections"/>
      <NewProxy/>
      <MintProxy/>
    </>
  );
}

