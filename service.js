

function Service(loader) {

    async function getUserWithFriends(id, levels = 1) {
        const user = await loader.load(id)

        if (levels === 1) {
            const friends = await loader.loadMany(user.friends)
            return { ...user, friends }
        }


        const friends = await Promise.all(user.friends.map(id => getUserWithFriends(id, levels - 1)))

        return {
            ...user,
            friends
        }
    }
    return {
        getUserWithFriends
    }
}

module.exports = Service