import React from "react";
import "./new-u.css"
import axios from "axios";
import {AppLayout} from "../app-layout";
import {browserHistory} from "../router";

export class NewUniversity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fullName: "",
      year: "",
      address: ""
    };
  };

  handleAdd = () => {
    axios.post("/api/add-new", this.state).then(res => {
      browserHistory.push("/")
    });
  };

  render() {
    let {
      name,
      fullName,
      year,
      address
    } = this.state;
    return (
      <AppLayout
        title="Add university"
      >
        <div className="row">
          <div className="input-group col-7 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">Name</span>
            </div>
            <input type="text" className="form-control"
                   value={name}
                   onChange={(e) => this.setState({name: e.target.value})}
            />
          </div>
          <div className="input-group col-7 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">Full name</span>
            </div>
            <input type="text" className="form-control"
                   value={fullName}
                   onChange={(e) => this.setState({fullName: e.target.value})}
            />
          </div>
          <div className="input-group col-7 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">Date</span>
            </div>
            <input type="type" className="form-control"
                   value={year}
                   onChange={(e) => this.setState({year: e.target.value})}
            />
          </div>
          <div className="input-group col-7 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">Address</span>
            </div>
            <input type="text" className="form-control"
                   value={address}
                   onChange={(e) => this.setState({address: e.target.value})}
            />
          </div>


        </div>
        <div className="row pl-3">
          <button className="btn btn-primary btn btn-block col-4 align-self-baseline btn-block"
                  onClick={this.handleAdd}
          >
            Add
          </button>
        </div>
      </AppLayout>
    );
  }
}
