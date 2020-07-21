const users = require('./users.json')

const cache = {}

module.exports = {
    load: async id => {
        if (!cache[id]) {
            console.log(`Loading one ${id}`)
            const user = await new Promise(resolve => setTimeout(() => resolve(users.find(u => u.id === id)), 500))
            cache[id] = user
            return user
        }

        return cache[id]
    },
    loadMany: async ids => {
        const notCached = ids.filter(id => !cache[id])
        if (notCached.length > 0) {
            console.log(`Loading many ${notCached}`)
            const found = await new Promise(resolve => setTimeout(() => resolve(notCached.map(id => users.find(u => u.id === id))), 500 + notCached.length * 50))

            found.forEach(u => cache[u.id] = u)
        }
        return ids.map(id => cache[id])

    },
}