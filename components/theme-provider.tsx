'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: JSX.Element }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
