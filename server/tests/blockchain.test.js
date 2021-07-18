const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''

describe('Blockchain function endpoint', () => {
    it('should login to server', async () => {
        const res = await request(app)
        .post('/auth')
        .send({
            email: 'suAdmin',
            password: 'suAdmin'
        })
        expect(res.statusCode).toEqual(201)
        token = res.body['accessToken'];
    } )

    it('should add admin to blockchain', async () => {
        const res = await request(app)
        .post('/blockchain')
        .set('Authorization', 'Bearer ' + token)
        .send({
            // adminAddress: "0x5497Ef0DE3Da6B6d9720402Af1f22328F85719F6",
            // name: "Admin1",
            state: "Lagos",
            district: "Lag"
        })

        // console.log(res.body);

        expect(res.statusCode).toEqual(200)
    } )

})
// process.kill(process.pid, 'SIGTERM')
