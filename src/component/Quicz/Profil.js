import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const storedUserName = localStorage.getItem('userName'); // Retrieve user name from local storage
    setUserName(name || storedUserName); // Use the name from the query parameter or local storage
  }, [location.search]);

  return (
    <div className="profile">
      <h1>Welcome, {userName}!</h1>
      <p>This is your profile page.</p>
    </div>
  );
}
