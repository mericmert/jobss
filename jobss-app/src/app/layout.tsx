import './globals.css'
import 'react-calendar-datetime-picker/dist/index.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import ThemeProvider from '@/components/theme-provider'
import AuthProvider from '@/contexts/AuthProvider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jobss',
  description: 'Welcome to the job platform of OBSS!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-primary-foreground")}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <AuthProvider>
              <Navbar />
              <div className="content mt-14">
                {children}
              </div>
              <Toaster />
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
