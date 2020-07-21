const repository = require('./repository')
const DataLoader = require('./dataloader')
const Cache = require('./cache')

const dataloader = DataLoader(repository.loadMany)
const cache = Cache(repository.loadMany)

const Service = require('./service')
const { printUser } = require('./print')

async function run(loader) {
    const service = Service(loader)

    console.time(`Get Users`)

    console.group(`Loading user 1 twice`)
    const [user1, user1_2] = await Promise.all([service.getUserWithFriends(1, 5), service.getUserWithFriends(1, 5)])
    console.groupEnd(`Loading user 1 twice`)

    console.group(`Loading user 2`)
    const user2 = await service.getUserWithFriends(2, 5)
    console.groupEnd(`Loading user 2`)

    console.timeEnd(`Get Users`)

    // printUser(user1)
    // printUser(user1_2)
}


async function main() {

    console.group('Repository')
    await run(repository)
    console.groupEnd('Repository')


    console.group('Cache')
    await run(Cache(repository.loadMany))
    console.groupEnd('Cache')


    console.group('Dataloader')
    await run(DataLoader(repository.loadMany))
    console.groupEnd('Dataloader')
}

main()