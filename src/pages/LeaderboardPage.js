import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import './styles/LeaderboardPage.css';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className='leaderboard-page' id='leaderboard-page'>
      <div className='leaderboard-page__header'>
        <span className='leaderboard-page__icon'>🏆</span>
        <h1 className='leaderboard-page__title'>Leaderboard</h1>
        <p className='leaderboard-page__subtitle'>
          Pengguna paling aktif di ForumKita
        </p>
      </div>
      <div className='leaderboard-page__list'>
        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            rank={index + 1}
            user={item.user}
            score={item.score}
          />
        ))}
        {leaderboards.length === 0 && (
          <div className='leaderboard-page__empty'>
            <p>Memuat leaderboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
