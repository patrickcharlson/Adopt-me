import React, { MutableRefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
	children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ children }) => {
	const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal');
		if (!modalRoot || !elRef.current) {
			return;
		}

		modalRoot.appendChild(elRef.current);
		return () => {
			if (elRef.current) {
				modalRoot.removeChild(elRef.current);
			}
		};
	}, []);

	return createPortal(<div>{children}</div>, elRef.current);
};
export default Modal;
