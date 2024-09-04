'use client'

import { createTheme, MantineColorsTuple } from '@mantine/core'
import { Alegreya } from '@next/font/google'

const alegreya = Alegreya({ subsets: ['latin'] })

const marble: MantineColorsTuple = [
  '#faf7ea',
  '#efecde',
  '#dbd7bf',
  '#c8c29d',
  '#b7af81',
  '#aca36e',
  '#a79d62',
  '#918951',
  '#817945',
  '#706836',
]
const purple: MantineColorsTuple = [
  '#f6eeff',
  '#e7daf7',
  '#cab1ea',
  '#ad86dd',
  '#9562d2',
  '#854bcb',
  '#7d3ec9',
  '#6b31b2',
  '#5f2aa0',
  '#52228d',
]

export const theme = createTheme({
  primaryColor: 'marble',
  colors: { marble, purple },
  fontFamily: alegreya.style.fontFamily,
})
