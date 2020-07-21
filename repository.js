const users = require('./users.json')

module.exports = {
    load: id => {
        console.log(`Loading one ${id}`)
        return new Promise(resolve => setTimeout(() => resolve(users.find(u => u.id === id)), 500))
    },
    loadMany: ids => {
        console.log(`Loading many ${ids}`)
        return new Promise(resolve => setTimeout(() => resolve(ids.map(id => users.find(u => u.id === id))), 500 + ids.length * 50))
    },
}