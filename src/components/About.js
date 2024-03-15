import UsersClass from "./UsersClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){
  }
  render() {
    return (
      <div className="about-container">
        <h1>About Me ✨</h1>
        <UsersClass />
      </div>
    );
  }
}

export default About;
