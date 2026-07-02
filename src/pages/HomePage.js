import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';
import ThreadCard from '../components/ThreadCard';
import CategoryFilter from '../components/CategoryFilter';
import './styles/HomePage.css';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [
    ...new Set(threads.map((thread) => thread.category).filter(Boolean)),
  ];

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadListWithOwner = filteredThreads.map((thread) => {
    const owner = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      ownerName: owner ? owner.name : 'Unknown',
      ownerAvatar: owner ? owner.avatar : '',
    };
  });

  function onUpVote(threadId) {
    dispatch(asyncToggleUpVoteThread(threadId));
  }

  function onDownVote(threadId) {
    dispatch(asyncToggleDownVoteThread(threadId));
  }

  function onNeutralizeVote(threadId) {
    dispatch(asyncNeutralizeVoteThread(threadId));
  }

  return (
    <div className='home-page' id='home-page'>
      <div className='home-page__header'>
        <div className='home-page__title-section'>
          <h1 className='home-page__title'>Diskusi Terkini</h1>
          <p className='home-page__subtitle'>
            Temukan dan ikuti diskusi menarik dari komunitas
          </p>
        </div>
        {authUser && (
          <Link
            to='/new'
            className='home-page__create-btn'
            id='btn-create-thread'
          >
            + Buat Thread Baru
          </Link>
        )}
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className='home-page__thread-list'>
        {threadListWithOwner.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            authUserId={authUser ? authUser.id : ''}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralizeVote={onNeutralizeVote}
          />
        ))}
        {threadListWithOwner.length === 0 && (
          <div className='home-page__empty'>
            <span className='home-page__empty-icon'>📭</span>
            <p>Belum ada thread yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
