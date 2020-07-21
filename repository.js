const users = require('./users.json')

function loadMany(ids) {
    console.log(`GET /users?ids=${ids}`)
    return new Promise(resolve => setTimeout(() => resolve(ids.map(id => users.find(u => u.id === id))), 500 + ids.length * 100))

}

async function load(id) {
    const results = await loadMany([id])

    return results[0]
}

module.exports = {
    load,
    loadMany
}