import { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import Layout from './components/Layout';
import LeagueService from './services/LeagueService';

function App() {
  const [leaderboard, setLeaderBoard] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const leagueService = new LeagueService();
    const fetchData = async () => {
      const { matches } = await leagueService.fetchData();
      leagueService.setMatches(matches);
      leagueService.setLeaderBoard(matches);
      setLeaderBoard(leagueService.getLeaderboard());
      setMatches(leagueService.getMatches());
    };
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <AppRouter leaderboard={leaderboard} matches={matches} />
    </Layout>
  );
}

export default App;
