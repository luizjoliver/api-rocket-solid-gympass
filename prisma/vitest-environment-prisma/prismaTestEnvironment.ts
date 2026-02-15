import { prisma } from "@/utils/db/prisma.js"
import "dotenv/config"
import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"

import type { Environment } from "vitest/environments"


function generateDataBaseUrl(schema:string){
    if(!process.env.DATABASE_URL) throw new Error("Forneça a variavel de ambiente responsável pela conexão do banco de dados")
        const databaseUrl = process.env.DATABASE_URL
        const url = new URL( databaseUrl)

        url.searchParams.set("schema",schema)


        return url.toString()
}

export default <Environment>{
    name:"prisma",
    viteEnvironment:"ssr",
    async setup(){
       const schema= randomUUID()
       const databaseUrl = generateDataBaseUrl(schema)

       
       process.env.DATABASE_URL = databaseUrl

       execSync("pnpm exec prisma db push")

        return {
            async teardown() {

                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

                await prisma.$disconnect()
            }
        }
    },
}