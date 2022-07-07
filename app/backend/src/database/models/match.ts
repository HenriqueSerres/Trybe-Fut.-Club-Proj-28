import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './team';
// import OtherModel from './OtherModel';

class Matches extends Model {
  public id: string;
  public teamName: string;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
    defaultValue: '0',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
    defaultValue: '0',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeam' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
