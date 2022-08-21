import React, {ReactNode} from 'react';

import {NewProxy} from '../../components/NewProxy';
import {MintProxy} from '../../components/NewProxy/mintProxy';

export default function NewProxyPage(): ReactNode {
  return (
    <>
      <NewProxy/>
      <MintProxy/>
    </>
  );
}

