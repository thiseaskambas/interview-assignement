import convertToleaderBoard from '../utils/convertToLeaderBoard';

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */
const BASE_URL = 'http://localhost:3001/api/v1';

class LeagueService {
  constructor() {
    this.matches = [];
    this.leaderboard = [];
  }
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  setLeaderBoard(matches) {
    const results = convertToleaderBoard(matches);
    const resultsByPoints = {};

    results.forEach((team) => {
      if (resultsByPoints[team.points]) {
        resultsByPoints[team.points].push(team);
      } else {
        resultsByPoints[team.points] = [team];
      }
    });

    if (Object.keys(resultsByPoints).length === results.length) {
      results.sort((a, b) => b.points - a.points);
      return (this.leaderboard = results);
    }

    Object.values(resultsByPoints).forEach((pointGroup) => {
      if (pointGroup.length > 1) {
        const tieTeamNames = pointGroup.map((team) => team.teamName);
        const headToHeadMatches = matches.filter(
          (match) =>
            tieTeamNames.includes(match.homeTeam) &&
            tieTeamNames.includes(match.awayTeam)
        );
        const miniLeaderBoard = convertToleaderBoard(headToHeadMatches);
        miniLeaderBoard.sort((a, b) => {
          //(1) first tiebreaker
          if (a.points !== b.points) {
            return b.points - a.points;
          } else if (
            b.goalsFor - b.goalsAgainst !==
            a.goalsFor - a.goalsAgainst
          ) {
            return b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst); // (2)second tiebreaker - goal difference
          } else if (b.goalsFor !== a.goalsFor) {
            return b.goalsFor - a.goalsFor; // (3)third tiebreaker - goals scored
          } else {
            return a.teamName.localeCompare(b.teamName); // (4)fourth tiebreaker - alphabetic order by team name
          }
        });

        pointGroup.sort((a, b) => {
          const teamAIndex = miniLeaderBoard.findIndex(
            (team) => team.teamName === a.teamName
          );
          const teamBIndex = miniLeaderBoard.findIndex(
            (team) => team.teamName === b.teamName
          );
          return teamBIndex - teamAIndex;
        });

        const sortedResults = Object.keys(resultsByPoints)
          .sort((a, b) => b - a)
          .flatMap((key) => resultsByPoints[key]);
        this.leaderboard = sortedResults;
      }
    });
  }

  getLeaderboard() {
    return this.leaderboard;
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    const token = await this.getAccessToken();
    try {
      const response = await fetch(`${BASE_URL}/getAllMatches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAccessToken() {
    try {
      const response = await fetch(`${BASE_URL}/getAccessToken`);
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw error;
    }
  }
}

export default LeagueService;
