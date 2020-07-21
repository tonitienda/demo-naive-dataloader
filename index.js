const repository = require('./repository')

async function getUserWithFriends(id, levels = 1) {
    const user = await repository.load(id)

    if (levels === 1) {
        const friends = await repository.loadMany(user.friends)
        return { ...user, friends: friends.map(({ id, name }) => ({ id, name })) }
    }

    const friends = await Promise.all(user.friends.map(id => getUserWithFriends(id, levels - 1)))

    return {
        ...user,
        friends
    }
}

async function printUser(user) {
    console.log(JSON.stringify(user, null, 2))
}


async function main() {
    console.time(`Get Users`)
    const user1 = await getUserWithFriends(1, 3)
    const user2 = await getUserWithFriends(2, 3)
    console.timeEnd(`Get Users`)

    printUser(user1)
    printUser(user2)
}

main()