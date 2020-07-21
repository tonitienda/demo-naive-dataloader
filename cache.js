
module.exports = function (loadManyFn) {

    const cache = {}

    async function loadMany(ids) {
        const notCachedIds = ids.filter(id => !cache[id])

        if (notCachedIds.length > 0) {
            const results = await loadManyFn(notCachedIds)
            notCachedIds.forEach((id, idx) => cache[id] = results[idx])
        }

        return Promise.all(ids.map(id => cache[id]))
    }

    return {
        load: async id => {
            const results = await loadMany([id])
            return results[0]
        },
        loadMany
    }

}