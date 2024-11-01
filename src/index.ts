import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function InsertUser(firstName: string, lastName: string, email: string, password: string) {


    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password
        },
        select: {
            id: true,
            password: true
        }
    })

    console.log(user)
}

interface UpdateParams {
    firstName: string,
    lastName: string
}


async function UpdateUser(email: string, { firstName, lastName }: UpdateParams) {


    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            firstName,
            lastName
        }
    })

    console.log(user)
}


async function GetUser(email: string) {


    const user = await prisma.user.findUnique({
        where: {
            email
        },

    })

    console.log(user)
}

GetUser("vishal@gmail.com")

// UpdateUser("vishal2@gmail.com", { firstName: 'vishal1234', lastName: 'RRRR' })

    // InsertUser("vishal2", "RPR", "vishal2@gmail.com", "123")
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })