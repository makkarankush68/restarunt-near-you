import React from "react";
import ShimmerUi from "./ShimmerUi";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "dummy",
    };
  }
  async componentDidMount() {
    let response = await fetch("https://api.github.com/users/makkarankush68");
    let data = await response.json();
    console.log(data);
    this.setState({
      userData: data,
    });
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
  }
  render() {
    if (this.state.userData == "dummy") return <ShimmerUi n={1} />;
    const { name, location, html_url, avatar_url, bio } = this.state.userData;
    return (
      <div className="user-card">
        <img src={avatar_url}></img>
        <div className="text-info">
          <h2>{name}</h2>
          <h2>{location}</h2>
          <h2>{bio}</h2>
          <h2>
            <a target="_blank" href={html_url}>
              Github
            </a>
          </h2>
        </div>
      </div>
    );
  }
}

export default UserClass;
