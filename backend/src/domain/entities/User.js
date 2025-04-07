class User {
  constructor({
    id,
    name,
    email,
    hashedPassword,
    role,
    teamId,
    avatarUrl,
    lastLoginAt,
    emailVerifiedAt,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    deactivatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
    this.teamId = teamId;
    this.avatarUrl = avatarUrl;
    this.lastLoginAt = lastLoginAt;
    this.emailVerifiedAt = emailVerifiedAt;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.deactivatedAt = deactivatedAt;
  }
}

export { User };
