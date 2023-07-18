import './globals.scss'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { montserrat } from './fonts'
import { open_sans } from './fonts'

const inter = Inter({ subsets: ['latin'] })

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
//   weight: '200',
// })

export const metadata = {
  title: 'Colibri',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} ${open_sans.variable}`}>
        <div>
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
