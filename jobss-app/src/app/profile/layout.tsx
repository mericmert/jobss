import ApplicationProvider from '@/contexts/ApplicationProvider'
import React from 'react'

export default function ProfileLayout({children} : {children : React.ReactNode}) {
    return (
        <ApplicationProvider>
            {children}
        </ApplicationProvider>
    )
}
