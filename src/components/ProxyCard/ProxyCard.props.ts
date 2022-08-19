import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface ProxyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string;
}
