import { Cinzel } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

export const cinzel = Cinzel({
    subsets: ['latin'],
})

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: '200',
})

export const open_sans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    weight: '300',
})

export const open_sans400 = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans400',
    weight: '400',
})

