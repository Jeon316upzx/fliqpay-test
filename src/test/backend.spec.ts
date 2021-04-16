import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import {seedDB} from '../seeder/seeder'

chai.use(chaiHttp);
const expect = chai.expect;


describe("Fliqpay backend testCase", async () => {

  //Initialize variables
  let customertoken:any = null;
  let agenttoken:any = null;
  let admintoken:any = null;
  let support_request_id:any = null;
  let user_id:any = null;


  before("Setup token" , async () => {
    
    //seed the database with data
    await seedDB()


    //get customer token
    let customerres:any = await chai
                    .request(app)
                    .post("/fliqpay/api/v1/auth/login")
                    .send({ email: "danibenz@gmail.com" , password: "didi12345"})
   customertoken = customerres.body.data.token

   //get agent token
   let agentres:any = await chai
                    .request(app)
                    .post("/fliqpay/api/v1/auth/login")
                    .send({ email: "test2@gmail.com" , password: "didi12345"})

   agenttoken = agentres.body.data.token

   //get admin token
   let adminres:any = await chai
                    .request(app)
                    .post("/fliqpay/api/v1/auth/login")
                    .send({ email: "Admin@gmail.com" , password: "didi12345"})
   admintoken = adminres.body.data.token

   //get support requests / tickets
   let res = await chai
                        .request(app)
                        .get("/fliqpay/api/v1/agent/support-requests")
                        .set({ "Authorization": `Bearer ${agenttoken}` })

    support_request_id = res.body.data

    //get users
    let users = await chai
                      .request(app)
                      .get(`/fliqpay/api/v1/admin/users`)
                      .set({ "Authorization": `Bearer ${admintoken}` })

    user_id = users.body.data
    // console.log("----HERE----")
    // console.log(user_id.user[0])



    
  });


    //register
    describe("Register", async () => {
      it("Should return an account with email already exist", async () => {
        let res = await chai
                    .request(app)
                    .post("/fliqpay/api/v1/auth/register")
                    .send({ firstname: "Dan", lastname: "Brown", email: "danibenz@gmail.com" , password: "didi12345"})

          expect(res.status).to.equal(409)
      });
    })


    //login
    describe("Login", async () => {
      it("Should return incorrect password", async () => {
        let res = await chai
                    .request(app)
                    .post("/fliqpay/api/v1/auth/login")
                    .send({ email: "danibenz@gmail.com" , password: "didi905"})

          expect(res.status).to.equal(400)
      });
    })


   // Suport Request | Tickets
    describe("Tickets", async () => {
      it("Customers should be able to create tickets", async () => {
            let res = await chai
                        .request(app)
                        .post("/fliqpay/api/v1/support-requests/create")
                        .set({ "Authorization": `Bearer ${customertoken}` })
                        .send({ issue: "A simple ticket created for testing purposes" })

          expect(res.status).to.equal(201)
      });
    })



    // Suport Request | Tickets
    describe("Tickets", async () => {
      it("Customers should be able get all tickets they created", async () => {
            let res = await chai
                        .request(app)
                        .get("/fliqpay/api/v1/support-requests/requests")
                        .set({ "Authorization": `Bearer ${customertoken}` })

          expect(res.status).to.equal(200)
      });
    })



    // User agents
    describe("User Agents", async () => {
      it("A user agent should be able to see all support requests created by customers", async () => {
            let res = await chai
                        .request(app)
                        .get("/fliqpay/api/v1/agent/support-requests")
                        .set({ "Authorization": `Bearer ${agenttoken}` })

          expect(res.status).to.equal(200)
      });
    })



    //User agents
    describe("User Agents", async () => {
      it("A user agent should be able to close a support request created by a customer", async () => {
            let res = await chai
                        .request(app)
                        .post(`/fliqpay/api/v1/agent/support-request/${support_request_id.supportRequest[0]._id}/close`)
                        .set({ "Authorization": `Bearer ${agenttoken}` })

          expect(res.status).to.equal(200)
      });
    })


    //User agents
    describe("User Agents", async () => {
      it("A user agent should be able to generate reports in the last month in PDF format", async () => {
            let res = await chai
                        .request(app)
                        .post(`/fliqpay/api/v1/agent/generate-report`)
                        .set({ "Authorization": `Bearer ${agenttoken}` })

          expect(res.status).to.equal(200)
      });
    })



    //User agents
    describe("User Agents", async () => {
      it("A user agent should be able to comment/create comment on a support request posted by a customer", async () => {
            let res = await chai
                        .request(app)
                        .post(`/fliqpay/api/v1/agent/support-request/${support_request_id.supportRequest[0]._id}/comment`)
                        .set({ "Authorization": `Bearer ${agenttoken}` })
                        .send({ comment: "A simple comment for testing purposes"})

          expect(res.status).to.equal(201)
      });
    })


    //User agents
    describe("User Agents", async () => {
      it("A user agent should be able to get all comment made on a ticket / support request", async () => {
            let res = await chai
                        .request(app)
                        .get(`/fliqpay/api/v1/agent/support-request/${support_request_id.supportRequest[0]._id}/comments`)
                        .set({ "Authorization": `Bearer ${agenttoken}` })

          expect(res.status).to.equal(200)
      });
    })



    //Admins
    describe("Admins", async () => {
      it("Should be able to get list of users", async () => {
            let res = await chai
                        .request(app)
                        .get(`/fliqpay/api/v1/admin/users`)
                        .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })

    //Admins
    describe("Admins", async () => {
      it("Should be able to get a user", async () => {
            let res = await chai
                        .request(app)
                        .get(`/fliqpay/api/v1/admin/users/${user_id.users[0]._id}`)
                        .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })



    



    
    
  
    
  });