import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota de login será possível', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const fakeUserData = {
    id: 1,
    username: 'Henrique',
    role: 'user',
    email: 'henrique@gmail.com',
    password: '1234567'
  } 

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(fakeUserData as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('não logar usuário sem email válido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        "emai": "henriquegmailcom",
        "password": "1234567"
       })
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body.message).to.be.eql('error')
  });

  it('não logar usuário sem password válido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        "emai": "henrique@gmail.com",
        "password": "123"
       })
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body.message).to.be.eql('error')
  });

  it('logar usuário com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        "emai": "henrique@gmail.com",
        "password": "1234567"
       })
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.eql(fakeUserData)
  });

});
