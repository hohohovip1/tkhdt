class University {
  constructor(name, fullName, address, year) {
    this.name = name;
    this.fullName = fullName;
    this.address = address;
    this.year = year;
    var time = new Date();
    this.id = Number(time.getTime().toString().slice(-4));

  }

  get() {
    return {
      name: this.name,
      fullName: this.fullName,
      address: this.address,
      year: this.year,
      id: this.id
    }
  }

  set(name, fullName, address, year) {
    this.name = name;
    this.fullName = fullName;
    this.address = address;
    this.year = year;
  }
}

module.exports = University;
