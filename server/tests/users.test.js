const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''

describe('Users function endpoint', () => {
    it('should login with superAdmin', async () => {
        const res = await request(app)
        .post('/auth')
        .send({
            email: 'suAdmin',
            password: 'suAdmin'
        })
        expect(res.statusCode).toEqual(201)
        token = res.body['accessToken'];
    } )

    it('should get list of users', async () => {
        const res = await request(app)
        .get('/users')
        .set('Authorization', 'Bearer ' + token)

        // console.log(res.body);

        expect(res.statusCode).toEqual(200)
    } )

    it('should create a new user', async () => {
        const res = await request(app)
          .post('/users')
          .set('Authorization', 'Bearer ' + token)
          .send({
            userId: 1,
            email: 'test is cooleer',
            password: 'ssjrjjt'
          }).then()
        expect(res.statusCode).toEqual(201)
      })

})
// process.kill(process.pid, 'SIGTERM')
