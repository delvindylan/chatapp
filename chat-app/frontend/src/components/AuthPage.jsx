import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { database } from "../firebase";
import { getDatabase, ref, push, set } from 'firebase/database';
const AuthPage = () => {

 const [username, setUsername] = useState();
  const [users, setUsers] = useState([]);
  //const navigate = useNavigate();

  async function onSubmit() {
console.log(username);

    if (!username) return;
    try {
      const res = await fetch("http://localhost:3001/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          console.log(data);  
          const isUsernameExists = data.some((user) => user.username === username);

          if (isUsernameExists) {
            sessionStorage.setItem('username', username);
            console.log('User already exists');
          } else {
            // createUser(username);
            push('/users', {
              username: "username",
            });
            sessionStorage.setItem('username', username);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function createUser(name) {
     
      const usersRef = ref('users', database);
      
      const newUserRef = push(usersRef);
      const userID = newUserRef.key;
      
      const newUser = {
        name,
        userID,
      };
  
      set(newUserRef, newUser);
  
      console.log(`New User: ${name} (ID: ${id})`);
  
  
  } 

  
    return (
      <div className="background">
        <div className="form-card">
          <div className="form-title">Welcome!</div>
  
          <div className="form-subtitle">Choose a username</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button className="auth-button" onClick={onSubmit}>
              Enter
            </button>
            {username}
          </div>
        </div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    );
  };
  
  export default AuthPage;