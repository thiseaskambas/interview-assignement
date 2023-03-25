export default function convertToleaderBoard(matches) {
  const teams = {};
  const results = [];

  matches.forEach((match) => {
    if (match.matchPlayed) {
      if (!teams[match.homeTeam]) {
        teams[match.homeTeam] = {
          teamName: match.homeTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }
      if (!teams[match.awayTeam]) {
        teams[match.awayTeam] = {
          teamName: match.awayTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }

      teams[match.homeTeam].matchesPlayed += 1;
      teams[match.homeTeam].goalsFor += match.homeTeamScore;
      teams[match.homeTeam].goalsAgainst += match.awayTeamScore;

      teams[match.awayTeam].matchesPlayed += 1;
      teams[match.awayTeam].goalsFor += match.awayTeamScore;
      teams[match.awayTeam].goalsAgainst += match.homeTeamScore;

      if (match.homeTeamScore > match.awayTeamScore) {
        teams[match.homeTeam].points += 3;
      } else if (match.awayTeamScore > match.homeTeamScore) {
        teams[match.awayTeam].points += 3;
      } else {
        teams[match.homeTeam].points += 1;
        teams[match.awayTeam].points += 1;
      }
    }
  });
  Object.values(teams).forEach((team) => results.push(team));
  return results;
}
