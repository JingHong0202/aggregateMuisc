module.exports = option => {
    return async function verifyisAdmin(ctx, next) {
        let {app} = ctx
        let ClientUsername = ctx.cookies.get('d2admin-1.14.0-uuid', {
            signed: false
        })

        let user = (
            await app.mysql.select('users', {
                where: { username: ClientUsername }
            })
        )[0]

        if (!option.roles.length || (!user && user.role)) return ctx.helper.ReturnErrorCode(404)
        let check = false
        option.roles.forEach((current) => {
            if (user.role  === current) {
                check = true
            }
        })
        if (ctx.request.originalUrl.indexOf('admin.user?a=list') !== -1) check = true
        check ? await next() : ctx.helper.ReturnErrorCode(404)
    }
}