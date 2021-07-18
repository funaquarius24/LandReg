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


    it('should successfully register a new land', async () => {
        const res = await request(app)
        .post('/blockchain/addLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            state: "Lagos",
            district: "Ikeja",
            cadzone: "A88923",
            plotNumber: parseInt(245534),
            plotSize: parseInt(33285),
            email: "owner1@owner1"
        })

        expect(res.statusCode).toEqual(201)
    } )

    it('should successfully edit a land\'s documents', async () => {
        const res = await request(app)
        .post('/blockchain/editLandDocuments')
        .set('Authorization', 'Bearer ' + token)
        .send({
            land_id: "",
            state: "Lagos",
            district: "Ikeja",
            cadzone: "A88923",
            plotNumber: parseInt('0245534'),
            cofo: "ddiuf833hd-dsd",
            cofoDate: parseInt(88923),
            rofoHash: "0903245534",
            rofoDate: parseInt(33285),
            stateOfAdmin: "Lagos"
        })


        expect(res.statusCode).toEqual(201)
    } )

})