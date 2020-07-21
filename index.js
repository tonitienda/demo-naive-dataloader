const repository = require('./repository')
const DataLoader = require('./dataloader')
const Cache = require('./cache')

const dataloader = DataLoader(repository.loadMany)
const cache = Cache(repository.loadMany)

const Service = require('./service')
const { printUser } = require('./print')

async function run(loader, label) {

    console.group(label)
    console.time('getting data')
    repository.reset()

    const service = Service(loader)

    const [user1, user1_2] = await Promise.all([service.getUserWithFriends(1, 5), service.getUserWithFriends(1, 5)])
    const user2 = await service.getUserWithFriends(2, 5)

    repository.print()
    console.timeEnd('getting data')
    console.groupEnd(label)
    console.log()
}


async function main() {

    await run(repository, 'using repository')
    await run(Cache(repository.loadMany), 'using cache')
    await run(DataLoader(repository.loadMany), 'using dataloader')
}

main()