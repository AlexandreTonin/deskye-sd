const columns = [
  'id',
  'name',
  'role',
  'team_id AS teamId',
  'avatar_url AS avatarURL',
  'last_login_at AS lastLoginAt',
  'email_verified_at AS emailVerifiedAt',
  'created_at AS createdAt',
  'updated_at AS updatedAt',
];

export { columns as selectUserDTO };
