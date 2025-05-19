class FindUserDTO {
  constructor({ name, email, password, role, teamId }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.teamId = teamId;
  }
}

export { FindUserDTO };
