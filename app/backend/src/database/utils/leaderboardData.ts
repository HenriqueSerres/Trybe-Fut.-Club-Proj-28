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
    return ((points / (games * 3)) * 100).toFixed(2);
  }
  const points = getTotalPoints(matches, 'away');
  const games = getTotalGames(matches);
  return ((points / (games * 3)) * 100).toFixed(2);
}
