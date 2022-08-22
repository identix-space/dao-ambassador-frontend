import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface ProxyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string;
    tokenId: string;
    soul: string;
    role: string;
    collectionName: string;
    collectionAddress: string;
    valid: string;
}
