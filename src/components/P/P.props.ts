import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	size?: 'xs' | 's' | 'sm' | 'm' | 'l';
	weight?: 'thin' | 'normal' | 'bold';
	color?: 'black' | 'grey' | 'white';
	children: ReactNode;
}
