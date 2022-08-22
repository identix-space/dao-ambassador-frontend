import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface CopyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text: string | null;
}
