import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota de times será possível', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const fakeTeamsData = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ]

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(fakeTeamsData as Teams[]);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('buscar todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.eql(fakeTeamsData)
  });

  it('buscar apenas um time', async () => {
    const fakeTeam = {
      "id": 5,
	    "teamName": "Cruzeiro"
    }
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.eql(fakeTeam)
  });

});
