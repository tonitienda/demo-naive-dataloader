
module.exports = function (loadManyFn) {

    const cache = {}
    let pending = []
    let scheduled = false
    function scheduleSearch() {
        if (pending.length > 0 && !scheduled) {
            scheduled = true
            Promise.resolve().then(() => process.nextTick(async () => {
                await runSearch()
                scheduled = false
            }))
        }
    }

    async function runSearch() {
        const pendingCopy = pending.splice(0, pending.length)
        pending = []

        if (pendingCopy.length > 0) {
            const results = await loadManyFn(pendingCopy.map(p => p.id))
            pendingCopy.forEach(({ resolve }, idx) => resolve((results[idx])))
        }

    }


    async function loadMany(ids) {
        const notCachedIds = ids.filter(id => !cache[id])

        if (notCachedIds.length > 0) {
            notCachedIds.map(id => {
                cache[id] = new Promise(resolve => {
                    pending.push({ id, resolve })
                })
            })

            scheduleSearch()
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