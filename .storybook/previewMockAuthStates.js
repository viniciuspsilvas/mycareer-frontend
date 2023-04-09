const defaultMockAuthStates = require('@tomfreudenberg/next-auth-mock').mockAuthStates;

module.exports = {
    ...defaultMockAuthStates,
    admin: {
        title: 'My Admin Authenticated',
        session: {
            data: {
                expires: new Date(Date.now() + 2 * 86400).toISOString(),
                user: {
                    firstname: 'Vinicius',
                    lastname: 'Silva',
                    email: 'viniciuspsilvas@gmail.com',
                    password: '$2a$12$Uh940/y1XVEq4s3r9QCn8.XibUcqgiW3I0pIs1xDNsY23FVgd60/.',
                    createdAt: new Date(),
                    role: 'admin',
                    tokenVersion: 0
                }
            }
        }
    }
}