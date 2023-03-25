import React from 'react';

import style from './Schedule.module.css';

const Schedule = ({ matches }) => {
  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 to zero-indexed month
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  if (!matches.length) {
    return null;
  }

  return (
    <main className={style.main}>
      <h1 className={style.heading}>League Schedule</h1>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.dateth}>Date/Time</th>
            <th className={style.stadiumth}>Stadium</th>
            <th className={style.hometh}>Home Team</th>
            <th></th>
            <th className={style.awayth}>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr
              className={style.bodytr}
              key={`${match.homeTeam}/${match.awayTeam}`}
            >
              <td className={style.datetd}>
                <div className={style.datetimectn}>
                  <div>{getDate(match.matchDate)}</div>
                  <div className={style.time}>{getTime(match.matchDate)}</div>
                </div>
              </td>
              <td className={style.stadiumtd}>{match.stadium}</td>
              <td>
                <div className={style.homectn}>
                  <div>{match.homeTeam}</div>
                  <div className={style.flagctn}>
                    <img
                      className={style.flagimg}
                      alt=""
                      src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`}
                    />
                  </div>
                </div>
              </td>
              <td className={style.scoretd}>
                {match.matchPlayed
                  ? `${match.homeTeamScore} : ${match.awayTeamScore}`
                  : '- : -'}
              </td>
              <td>
                <div className={style.awayctn}>
                  <div className={style.flagctn}>
                    <img
                      className={style.flagimg}
                      alt=""
                      src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`}
                    />
                  </div>
                  <div>{match.awayTeam}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Schedule;
