import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota de tabelas será possível', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const fakeBoard = [
    {
      name: 'Santos',
      totalPoints: '9',
      totalGames: '3',
      totalVictories: '3',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '9',
      goalsOwn: '3',
      goalsBalance: '6',
      efficiency: '100'
    },
    {
      name: 'Palmeiras',
      totalPoints: '7',
      totalGames: '3',
      totalVictories: '2',
      totalDraws: '1',
      totalLosses: '0',
      goalsFavor: '10',
      goalsOwn: '5',
      goalsBalance: '5',
      efficiency: '77.78'
    },
]

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(fakeBoard as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('buscar as tabelas de todos os jogos em casa', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.eql(fakeBoard)
  });

  const fakeBoardAway = [
    {
      name: 'Palmeiras',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '7',
      goalsOwn: '0',
      goalsBalance: '7',
      efficiency: '100'
    },
    {
      name: 'Corinthians',
      totalPoints: '6',
      totalGames: '3',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '1',
      goalsFavor: '6',
      goalsOwn: '2',
      goalsBalance: '4',
      efficiency: '66.67'
    },
  ]

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(fakeBoardAway as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('buscar todos os jogos já finalizados', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.eql(fakeBoardAway)
  });

});
