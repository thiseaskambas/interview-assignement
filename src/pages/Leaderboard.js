import style from './Leaderboard.module.css';

const Leaderboard = ({ leaderboard }) => {
  if (!leaderboard.length) {
    return null;
  }
  return (
    <main className={style.main}>
      <h1 className={style.heading}>League Standings</h1>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.theadtr}>
            <th className={style.teamth}>Team Name</th>
            <th>MP</th>
            <th>GF</th>
            <th>GA</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((team) => (
            <tr className={style.bodytr} key={team.teamName}>
              <td>
                <div className={style.teamctn}>
                  <div className={style.flagctn}>
                    <img
                      className={style.flagimg}
                      alt=""
                      src={`https://flagsapi.codeaid.io/${team.teamName}.png`}
                    />
                  </div>
                  <div>{team.teamName}</div>
                </div>
              </td>
              <td>{team.matchesPlayed}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Leaderboard;
