import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota de jogos será possível', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const fakeMatches = [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(fakeMatches as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('buscar todos os jogos em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message.inProgress).to.be.eql(true)
  });

  const fakeMatchesData = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    }
  ]

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(fakeMatchesData as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('buscar todos os jogos já finalizados', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message.inProgress).to.be.eql(false)
  });

});
