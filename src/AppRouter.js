import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import Schedule from './pages/Schedule';

const AppRouter = ({ leaderboard, matches }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Schedule matches={matches} />
      </Route>
      <Route path="/schedule">
        <Schedule matches={matches} />
      </Route>
      <Route path="/leaderboard">
        <Leaderboard leaderboard={leaderboard} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRouter;
