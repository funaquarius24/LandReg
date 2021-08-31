const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''

describe('Create suAdmin endpoint', () => {
    it('should create superAdmin account', async () => {
        const res = await request(app)
        .post('/su')
        .send({
            name: 'suAdmin',
            email: 'suAdmin',
            password: 'suAdmin',
            key: '0xdD3DB20111887bBed8017A51078f216B2Fc3eA6A',
            permissionLevel: 4096
        })
        expect(res.statusCode).toEqual(201)
    } )

})
// process.kill(process.pid, 'SIGTERM')
