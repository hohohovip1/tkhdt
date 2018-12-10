
var fs = require("fs");
var path = require("path");


class UList {
  constructor() {
    this.list = this.getData();
  }

  addSchool(item) {
    this.list.push(item);
    fs.appendFileSync(path.join(__dirname, "../data/data.txt"), JSON.stringify(item) + "\n");
  }

  getData() {
    var data = fs.readFileSync(path.join(__dirname, "../data/data.txt"), "utf-8");
    if (data.length == 0) {
      return [];
    }
    var endData = data.slice(0, data.length - 1).split("\n");

    function tranform(item) {
      return JSON.parse(item);
    }

    var tranform = endData.map(tranform);
    return tranform;
  }

  findSchool(type, value) {
    var list = this.getData();

    function finding(item) {
      return item[type].toString().indexOf(value.toString()) > -1;
    }

    var found = list.filter(finding);

    return found;
  }
  findByName(value) {
    var list = this.getData();
    var temp =value.toUpperCase();
    function finding(item) {
      return item.name.toString().indexOf(temp) > -1;
    }

    var found = list.filter(finding);

    return found;
  }

  change(id, value) {

    var list = this.list;

    function returnId(item) {
      return item.id;
    }

    var no = list.map(returnid).indexOf(Number(id));
    value.id = id;
    this.list.splice(no, 1, value);
    console.log(this.list)
    function saveData(result, item) {
      return result + JSON.stringify(item) + "\n";
    }

    var dataToSave = this.list.reduce(saveData, "");
    fs.writeFileSync(path.join(__dirname, "../data/data.txt"), dataToSave, "utf-8");
  }

  delete(id) {
    var list = this.list;

    function returnid(item) {
      return item.id;
    }

    var no = list.map(returnid).indexOf(id);
    this.list.splice(no, 1);

    function saveData(result, item) {
      return result + JSON.stringify(item) + "\n";
    }

    var dataToSave = this.list.reduce(saveData, "");
    fs.writeFileSync(path.join(__dirname, "../data/data.txt"), dataToSave, "utf-8");
  }

  schoolAge(number) {
    var list = this.list;
    var no = list.filter(function (item) {
      return (2018 - Number(item.year.split("/")[2])) >= number;
    });
    return no;
  }
}

module.exports = UList;
