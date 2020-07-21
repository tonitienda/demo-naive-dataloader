const repository = require('./repository')

async function getUserWithFriends(id, levels = 1) {

    console.log(`awaiting ${id}`)
    const user = await repository.load(id)

    if (levels === 1) {
        console.log(`awaiting ${user.friends}`)
        const friends = await repository.loadMany(user.friends)
        return { ...user, friends: friends.map(({ id, name }) => ({ id, name })) }
    }

    const friends = await Promise.all(user.friends.map(id => getUserWithFriends(id, levels - 1)))

    return {
        ...user,
        friends
    }
}

function printUser(user, tab = 1) {
    if (!user || !user.id) {
        return ''
    }
    if (tab === 1) {
        console.log()
    }
    console.group()
    console.log(user.name)
    if (user.friends) {
        user.friends.map(u => printUser(u, tab + 1))
    }
    console.groupEnd()
}


async function main() {
    console.time(`Get Users`)
    const [user1, user1_2] = await Promise.all([getUserWithFriends(1, 1), getUserWithFriends(1, 1)])
    //const user2 = await getUserWithFriends(2, 3)
    console.timeEnd(`Get Users`)

    // printUser(user1)
    // printUser(user2)
}

main()