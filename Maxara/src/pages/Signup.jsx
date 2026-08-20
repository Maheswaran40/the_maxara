import maxara_logo from "../assets/images/maxara_logo.png";

function Singup() {
  return (
    <>
      <div id="form-div">
        <div
          style={{
            height: "100%",
            width: "50%",
          }}
          className="form-sub-div1"
        >
          <img src={maxara_logo} alt="" />
        </div>
        {/* form div */}
        <div className="signup-page">
          <div className="signup-card">
            <h2 className="text-center font-bold text-2xl">Let's go!</h2>
            <form className="form mt-4">
              <label>Username</label>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required
                // value={username}
              />
              <br />
              <label>Email</label>
              <br />
              <input
                type="email"
                className="form-control"
                placeholder="E-mail"
                required
                // value={email}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                // value={password}
              />
              <br />
              <button type="submit" className="btn-submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Singup;
