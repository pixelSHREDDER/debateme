/* eslint-disable no-var */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
