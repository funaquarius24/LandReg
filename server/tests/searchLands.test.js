const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''
var wAddress = ""

describe('This is meant to search on the blockchain.', () => {
    jest.setTimeout(8000);
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


    it('should successfully search a land using id', async () => {
        const res = await request(app)
        .post('/blockchain/searchLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            id: parseInt(2896320266840),
            search_with_id: true
        })

        expect(res.statusCode).toEqual(200)
    } )

    it('should successfully search a land using state', async () => {
        const res = await request(app)
        .post('/blockchain/searchLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            state: "Lagos",
            search_with_id: true
        })

        expect(res.statusCode).toEqual(200)
    } )

    it('should successfully search a land using id compute', async () => {
        const res = await request(app)
        .post('/blockchain/searchLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            state: "Lagos",
            district: "Ikeja",
            cadzone: "A88923",
            plotNumber: parseInt(245534),
            search_with_id: true
        })

        expect(res.statusCode).toEqual(200)
    } )

    it('should successfully search a land using owner\'s key/address', async () => {
        const res = await request(app)
        .post('/blockchain/searchLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            key: "0x39C313DB6c54c05c87D2E4d963CE6ee86e6A04DB",
            search_with_id: false
        })

        expect(res.statusCode).toEqual(200)
    } )

    it('should successfully search a land using owner\'s email', async () => {
        const res = await request(app)
        .post('/blockchain/searchLand')
        .set('Authorization', 'Bearer ' + token)
        .send({
            email: "owner1@owner1",
            search_with_id: false
        })

        expect(res.statusCode).toEqual(200);
        wAddress = res.body['currentOwner'];
        console.log('body: ', res.body);
        console.log("wAddress: ", wAddress);
    } )

    it('should get owner data', async () => {
        const res = await request(app)
        .post('/blockchain/ownerInfo')
        .set('Authorization', 'Bearer ' + token)
        .send({
            "wAddress": '0x3aD007E3F1f1ADf71F94Ca227fEF86C1f3776970'
        })
  
        console.log(res.body);
  
        expect(res.statusCode).toEqual(200)
    } )


})