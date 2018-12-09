
var fs = require("fs");
var path = require("path");


class UniversityList {
  constructor() {
    this.list = this.get();
  }

  add(item) {
    this.list.push(item);
    fs.appendFileSync(path.join(__dirname, "../data/data.txt"), JSON.stringify(item) + "\n");
  }

  get() {
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

  find(type, value) {
    var list = this.get();

    function finding(item) {
      return item[type].toString().indexOf(value.toString()) > -1;
    }

    var found = list.filter(finding);

    return found;
  }

  update(id, value) {

    var list = this.list;

    function returnid(item) {
      return item.id;
    }

    var no = list.map(returnid).indexOf(Number(id));
    value.id = id;
    this.list.splice(no, 1, value);
    console.log(this.list)
    function savedata(result, item) {
      return result + JSON.stringify(item) + "\n";
    }

    var dataToSave = this.list.reduce(savedata, "");
    fs.writeFileSync(path.join(__dirname, "../data/data.txt"), dataToSave, "utf-8");
  }

  delete(id) {
    var list = this.list;

    function returnid(item) {
      return item.id;
    }

    var no = list.map(returnid).indexOf(id);
    this.list.splice(no, 1);

    function savedata(result, item) {
      return result + JSON.stringify(item) + "\n";
    }

    var dataToSave = this.list.reduce(savedata, "");
    fs.writeFileSync(path.join(__dirname, "../data/data.txt"), dataToSave, "utf-8");
  }

  findbyyear(number) {
    var list = this.list;
    var no = list.filter(function (item) {
      return (2018 - Number(item.year.split("/")[2])) >= number;
    });
    return no;
  }
}

module.exports = UniversityList;
