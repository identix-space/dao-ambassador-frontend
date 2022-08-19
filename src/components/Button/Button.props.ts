import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	view?: 'purple' | 'transparent';
	size?: 's' | 'l' | 'auto';
	disabled?: true | false;
	children: ReactNode;
}
