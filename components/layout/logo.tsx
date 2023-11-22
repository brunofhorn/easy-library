import Image from 'next/image';
import logoMinimized from '@assets/img/logo_minimized.png';
import logo from '@assets/img/logo.png';
import { ILogo } from '@interfaces/components';

export default function Logo({ minimized = false }: ILogo) {
    return (
        <Image src={minimized ? logoMinimized : logo} width={minimized ? 50 : 100} height={100} alt='Easy Educa' />
    );
}