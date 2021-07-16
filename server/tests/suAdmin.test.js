const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''

describe('Create suAdmin endpoint', () => {
    it('should create superAdmin account', async () => {
        const res = await request(app)
        .post('/users')
        .send({
            name: 'suAdmin',
            email: 'suAdmin',
            password: 'suAdmin',
            key: '0x2D3216c96Fb34f528F1B04b34a2A9eC54E17a5d3',
            permissionLevel: 4096
        })
        expect(res.statusCode).toEqual(201)
    } )

})
// process.kill(process.pid, 'SIGTERM')
