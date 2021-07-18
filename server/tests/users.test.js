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
        expect(res.statusCode).toEqual(200)
        token = res.body['accessToken'];
    } )

    it('should successfully create a new admin', async () => {
        const res = await request(app)
        .post('/users/addAdmin')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: "Admin1",
          email: "admin1@admin2",
          password: "admin1Password",
          state: "lagos",
          district: "ikeja"
        })

        expect(res.statusCode).toEqual(201)
    } )

    it('should successfully register a new owner', async () => {
        const res = await request(app)
        .post('/users/addOwner')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "Owner1",
            gender: "male",
            dob: 88923289238,
            ownerAddress: "15 asb str",
            phone1: "0903245534",
            phone2: "0903245534",
            NIN: "6787387283",
            email: "owner1@owner1",
            password: "owner1Password",
            stateOfAdmin: "lagos"
        })

      expect(res.statusCode).toEqual(201)
    } )

    it('should get list of users', async () => {
        const res = await request(app)
        .get('/users/list')
        .set('Authorization', 'Bearer ' + token)

        console.log(res.body);

        expect(res.statusCode).toEqual(200)
    } )

    it('should fail to create a new user', async () => {
        const res = await request(app)
          .post('/users')
          .set('Authorization', 'Bearer ' + token)
          .send({
            userId: 1,
            email: 'test is cooleer',
            password: 'ssjrjjt'
          }).then()
        expect(res.statusCode).toEqual(409)
      })

})
// process.kill(process.pid, 'SIGTERM')
