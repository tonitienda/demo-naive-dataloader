const users = require('./users.json')

let requestCount = 0
let requests = {}

function loadMany(ids) {
    const url = `GET /users?ids=${ids}`
    console.log(url)
    ids.forEach(id => {
        requests[id] = (requests[id] || 0) + 1
    });
    requestCount++

    return new Promise(resolve => setTimeout(() => resolve(ids.map(id => users.find(u => u.id === id))), 500 + ids.length * 100))

}

async function load(id) {
    const results = await loadMany([id])

    return results[0]
}

function print() {
    console.log(`Id requests: `, requests)
    console.log(`Total requests: `, requestCount)
}

function reset() {
    requestCount = 0
    requests = {}
}

module.exports = {
    load,
    loadMany,
    reset,
    print
}