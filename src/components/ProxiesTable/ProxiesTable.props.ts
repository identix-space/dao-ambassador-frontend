import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface ProxiesTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement> {
    data?: any;
}
