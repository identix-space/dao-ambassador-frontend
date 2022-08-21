export function startAndEnd(str: string | undefined, gapStart: number, gapEnd: number) {
  const lngth = 20;
  const gapMin = 0;
  if (str && str.length > lngth) {
    return `${str.substr(gapMin, gapStart)}...${str.substr(str.length - gapEnd, str.length)}`;
  }
  return str;
}

export function redirect(url: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}

export const randomNumber = (): number => {
  // eslint-disable-next-line no-magic-numbers
  return Math.floor(Math.random() * (100000000000000000000000000000000000000000000000000000000000000000000000 - 1)) + 1;
};

interface MetaData {
  agentNickname: string;
  positionName: string;
  powerDescription: string;
  telegram?: string;
  twitter?: string;
  discord?: string;
  expiration: Date;
}

export const createMetaData = ({agentNickname, positionName, powerDescription, telegram, twitter, discord, expiration}: MetaData) => {
  return {
    agentNickname: agentNickname,
    positionName: positionName,
    powerDescription: powerDescription,
    socialAccounts: {
      telegram: telegram ? telegram : '',
      twitter: twitter ? twitter : '',
      discord: discord ? discord : ''
    },
    expiration: expiration
  };
};
