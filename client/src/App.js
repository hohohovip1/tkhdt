import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import {browserHistory} from "./router";
import {AppLayout} from "./app-layout";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      year: 0,
      searchType: 0,
      list: []
    };
    axios.get("/api/list").then((res) => {

      this.setState({list: res.data})
    })
  }

  applySearch = () => {
    let {name, year, searchType} = this.state;
    if(searchType === 0){
      axios.post("/api/by-name", {name}).then(res => {
        console.log(res)
        this.setState({list: res.data})
      })

    }else{
      axios.post("/api/by-year", {year}).then(res => {
        console.log(res)
        this.setState({list: res.data})
      })
    }
  };

  render() {
    let {name, year, searchType, list = []} = this.state;

    return (
      <AppLayout
        title="List"
      >
        <div className="actions">
          <div className="row mb-4">
            <div className="input-group col-4">
              <select className="custom-select" id="inputGroupSelect01"
                      onChange={e => this.setState({searchType: Number(e.target.value)})}
                      value={searchType}
              >
                <option value="0">Name</option>
                <option value="1">Year</option>
              </select>
            </div>
            
             {searchType === 0 ? (
              <div class="col-md-4 mb-3">
            
              <input type="text" class="form-control" id="validationTooltip01" placeholder="First name" value={name} onChange={e => this.setState({name: e.target.value})}/>
              <div class="valid-tooltip">
                Looks good!
              </div>
            </div>
            ) : (
              <div class="col-md-4 mb-3">
              
              <input type="text" class="form-control" id="validationTooltip01" placeholder="Year" value={year} onChange={e => this.setState({year: e.target.value})}/>
              <div class="valid-tooltip">
                Looks good!
              </div>
              </div>
            
            )}
            <button className="btn btn-dark text-white align-self-baseline"
                    onClick={this.applySearch}
            >
              Search School
            </button>
          </div>
          <div className="row justify-content-center">
           
            
            <button className="add-u btn-success btn col-3 btn-block "
                    onClick={() => browserHistory.push("/new")}
            >
              Add University
            </button>
          </div>



        </div>

        <table className="u-list">
          <thead>
          <tr>
            <th>Name</th>
            <th>Full name</th>
            <th>Year</th>
            <th>Address</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {list.map((u) => (
            <tr key={u.id}
                className="each-u"
                onClick={e => browserHistory.push("/edit/"+u.id)}
            >
              <td>{u.name}</td>
              <td>{u.fullName}</td>
              <td>{u.year}</td>
              <td>{u.address}</td>
              <td>
                <button className="btn btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          axios.delete("/api/delete/"+u.id).then(() => {
                            this.setState({list: this.state.list.filter(each => each.id !== u.id)})
                          })
                        }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          </tbody>

        </table>
      </AppLayout>

    );
  }
}

export default App;
