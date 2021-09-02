const request = require('supertest')
// const app = require('../app')
const app =  'http://localhost:4200'
var token = ''
jest.setTimeout(8000);
describe('Users function endpoint', () => {
    jest.setTimeout(30000);
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

    // Decided o include this in land test so that I can use the values to register land
    // Although I later didn't use it...
    it('should successfully register new owners', async () => {
        for(var i = 0; i < 10; i++){
          var ninInt = 9439843843 + i * 512;
          var nin = ninInt + "";
          var email = "owner"+ (1 + i) + "@owner" + ( 1+ i);
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
              NIN: nin,
              email: email,
              password: "owner1Password",
              stateOfAdmin: "lagos"
          })
          expect(res.statusCode).toEqual(201)
        }
        

      
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

    it('should successfully register new lands', async () => {
        for(var i = 0; i < 10; i++){
            var email;
            if(i > 5){
                email = "owner"+ (1 + i) + "@owner" + ( 1+ i);
            }
            else{
                email = "owner1@owner1";
            }
            var plotNumber = 245534 + (i * 33 + 1);
            const res = await request(app)
            .post('/blockchain/addLand')
            .set('Authorization', 'Bearer ' + token)
            .send({
                state: "Lagos",
                district: "Ikeja",
                cadzone: "A88923",
                plotNumber: parseInt(plotNumber),
                plotSize: parseInt(33285),
                email: email
            })

            expect(res.statusCode).toEqual(201)
        }
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
            stateOfAdmin: "Lagos",
            certNumber: "AG748437438"

        })


        expect(res.statusCode).toEqual(201)
    } )

})