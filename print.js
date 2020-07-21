
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


module.exports = {
    printUser
}