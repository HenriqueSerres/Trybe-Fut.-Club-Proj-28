import { IBoard } from '../interfaces/leaderboardInterface';
import { IMatch } from '../interfaces/matchInterface';

export function getTotalPoints(matches:IMatch[], place:string) {
  if (place === 'home') {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 3;
      } if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      } return acc;
    }, 0);
  }
  return matches.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) {
      return acc + 3;
    } if (curr.homeTeamGoals === curr.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);
}

export function getTotalGames(matches:IMatch[]) {
  const total = matches.length;
  return total;
}

export function getVictories(matches:IMatch[], place:string) {
  if (place === 'home') {
    return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }
  return matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
}

export function getLosses(matches:IMatch[], place:string) {
  if (place === 'home') {
    return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }
  return matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
}

export function getTotalDraws(matches:IMatch[]) {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

export function getGoalsFavor(matches: IMatch[], place:string) {
  if (place === 'home') {
    return matches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  }
  return matches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
}

export function getGoalsOwn(matches: IMatch[], place:string) {
  if (place === 'home') {
    return matches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  }
  return matches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
}

export function getBalance(matches: IMatch[], place:string) {
  if (place === 'home') {
    return getGoalsFavor(matches, 'home') - getGoalsOwn(matches, 'home');
  }
  return getGoalsFavor(matches, 'away') - getGoalsOwn(matches, 'away');
}

export function getEfficiency(matches: IMatch[], place:string) {
  if (place === 'home') {
    const points = getTotalPoints(matches, 'home');
    const games = getTotalGames(matches);
    return Number(((points / (games * 3)) * 100).toFixed(2));
  }
  const points = getTotalPoints(matches, 'away');
  const games = getTotalGames(matches);
  return Number(((points / (games * 3)) * 100).toFixed(2));
}

export function homeBoardFormat(matches:IMatch[]) {
  return {
    totalPoints: getTotalPoints(matches, 'home'),
    totalGames: getTotalGames(matches),
    totalVictories: getVictories(matches, 'home'),
    totalDraws: getTotalDraws(matches),
    totalLosses: getLosses(matches, 'home'),
    goalsFavor: getGoalsFavor(matches, 'home'),
    goalsOwn: getGoalsOwn(matches, 'home'),
    goalsBalance: getBalance(matches, 'home'),
    efficiency: getEfficiency(matches, 'home'),
  };
}

export function awayBoardFormat(matches:IMatch[]) {
  return {
    totalPoints: getTotalPoints(matches, 'away'),
    totalGames: getTotalGames(matches),
    totalVictories: getVictories(matches, 'away'),
    totalDraws: getTotalDraws(matches),
    totalLosses: getLosses(matches, 'away'),
    goalsFavor: getGoalsFavor(matches, 'away'),
    goalsOwn: getGoalsOwn(matches, 'away'),
    goalsBalance: getBalance(matches, 'away'),
    efficiency: getEfficiency(matches, 'away'),
  };
}

export function teamsFiltered(matches:IMatch[], place:string, id:number) {
  if (place === 'home') {
    return matches.filter((match) => match.homeTeam === id);
  }
  return matches.filter((match) => match.awayTeam === id);
}

export function getOrderSort(matches:IBoard[]) {
  matches.sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints
    || teamB.goalsBalance - teamA.goalsBalance
    || teamB.goalsFavor - teamA.goalsFavor
    || teamB.goalsOwn - teamA.goalsOwn);
  return matches;
}
