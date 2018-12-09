import React from "react";

export class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    document.title = props.title;
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>School Management</h1>
        </div>
        <div className="body container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
