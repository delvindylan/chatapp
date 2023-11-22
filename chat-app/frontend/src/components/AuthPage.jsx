import axios from "axios";

const AuthPage = (props) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      axios.post("http://localhost:3001/authenticate", 
      { username: value }
      )
      .then(res => props.onAuth({ ... res.data, secret: value }))
      .catch(error => console.log("error", error))
    };
  
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome!</div>
  
          <div className="form-subtitle">Choose a username</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage;