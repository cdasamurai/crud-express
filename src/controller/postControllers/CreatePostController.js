const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function createPostController(req, res) {
    return main()
        .then(async () => {
            await prisma.$disconnect();
            return res.status(201).json('Created')
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}

async function main() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'aliicee@prisma.io',
            posts: {
                create: { title: 'Hello World' },
            },
            profile: {
                create: { bio: 'I like turtles' },
            },
        },
    })

    const allUser = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })
    console.dir(allUser, { depth: null })
}



module.exports = createPostController;