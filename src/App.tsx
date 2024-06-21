import { useEffect, useState } from 'react';
import './App.css'

export function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
      .catch((error) => console.error("Error fetching the user data:", error));
  }, []);

  if (users.length == 0) {
    return <div>Loading...</div>
  }

  const filteredUsers = users.filter((user) => 
    user.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>User List</h1>
      <input type="text" 
        placeholder='Pesquisar'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}       
      />
      <div className='wrapper_users'>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <img src={user.image} alt={user.firstName} />
              <p>
              {user.firstName}{user.lastName}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
