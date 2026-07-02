import { useSelector } from 'react-redux';
import './styles/LoadingIndicator.css';

function LoadingIndicator() {
  const isLoading = useSelector((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className='loading-indicator' id='loading-indicator'>
      <div className='loading-bar' />
    </div>
  );
}

export default LoadingIndicator;
