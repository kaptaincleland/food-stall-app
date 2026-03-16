import './globals.css'
import { Oswald, Montserrat } from 'next/font/google' // Import Oswald
import Navbar from '@/components/Navbar'

//font variables
const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald', 
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat', 
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={`${oswald.variable} ${montserrat.variable} font-sans bg-gray-50 min-h-screen overflow-x-hidden`}>
        <div className="w-full min-h-screen bg-white shadow-2xl flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}