const users = require('./users.json')
const DataLoader = require('./dataloader')


function loadMany(ids) {
    console.log(`Loading many ${ids}`)
    return new Promise(resolve => setTimeout(() => resolve(ids.map(id => users.find(u => u.id === id))), 500 + ids.length * 50))

}

module.exports = DataLoader(loadMany)