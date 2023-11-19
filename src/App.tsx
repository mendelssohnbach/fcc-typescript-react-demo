import axios from 'axios';
import { FC, useState } from 'react';
import { AppProps, Users } from './App.types';
import User from './components/User';

const App: FC<AppProps> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://randomuser.me/api/?results=10');
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>

      <button
        type="button"
        onClick={handleClick}
      >
        Show Users
      </button>

      <input
        type="text"
        onChange={handleChange}
      />
      <div>{userName}</div>

      {isLoading && <p>Loading...</p>}

      <ul>
        {users.map(({ login, name, email }) => {
          return (
            <User
              key={login.uuid}
              name={name}
              email={email}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
