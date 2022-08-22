import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface BackButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	link: string;
}
