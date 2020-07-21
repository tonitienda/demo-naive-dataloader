
module.exports = function (loadManyFn) {

    const cache = {}

    async function loadMany(ids) {
        const notCached = ids.filter(id => !cache[id])
        if (notCached.length > 0) {
            const results = await loadManyFn(notCached)
            ids.forEach((id, idx) => cache[id] = Promise.resolve((results[idx])))
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