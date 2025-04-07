export const up = (pgm) => {
  pgm.createTable('teams', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true, unique: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('users', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true },
    email: { type: 'text', notNull: true, unique: true },
    hashed_password: { type: 'text', notNull: true },
    role: { type: 'text', notNull: true },
    team_id: { type: 'integer', references: 'teams(id)', onDelete: 'SET NULL' },
    avatar_url: { type: 'text' },
    last_login_at: { type: 'timestamp' },
    email_verified_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    created_by: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'SET NULL',
    },
    updated_at: { type: 'timestamp' },
    updated_by: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'SET NULL',
    },
    deactivated_at: { type: 'timestamp' },
  });

  pgm.createTable('ticket_statuses', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true, unique: true },
    description: { type: 'text' },
  });

  pgm.createTable('ticket_categories', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true, unique: true },
  });

  pgm.createTable('ticket_priorities', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true, unique: true },
  });

  pgm.createTable('ticket_slas', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true },
    duration_minutes: { type: 'integer', notNull: true },
  });

  pgm.createTable('tickets', {
    id: 'serial PRIMARY KEY',
    title: { type: 'text', notNull: true },
    description: { type: 'text' },
    status_id: {
      type: 'integer',
      references: 'ticket_statuses(id)',
      notNull: true,
    },
    priority_id: { type: 'integer', references: 'ticket_priorities(id)' },
    category_id: { type: 'integer', references: 'ticket_categories(id)' },
    sla_id: { type: 'integer', references: 'ticket_slas(id)' },
    responsible_id: { type: 'integer', references: 'users(id)' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    created_by: { type: 'integer', references: 'users(id)' },
    updated_at: { type: 'timestamp' },
    updated_by: { type: 'integer', references: 'users(id)' },
  });

  pgm.createTable(
    'ticket_requesters',
    {
      ticket_id: {
        type: 'integer',
        references: 'tickets(id)',
        onDelete: 'CASCADE',
        notNull: true,
      },
      user_id: {
        type: 'integer',
        references: 'users(id)',
        onDelete: 'CASCADE',
        notNull: true,
      },
    },
    {
      primaryKey: ['ticket_id', 'user_id'],
    },
  );

  pgm.createTable('ticket_services', {
    id: 'serial PRIMARY KEY',
    name: { type: 'text', notNull: true },
  });

  pgm.createTable('ticket_histories', {
    id: 'serial PRIMARY KEY',
    ticket_id: {
      type: 'integer',
      references: 'tickets(id)',
      onDelete: 'CASCADE',
      notNull: true,
    },
    action: { type: 'text', notNull: true },
    performed_by: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'SET NULL',
    },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

export const down = (pgm) => {
  pgm.dropTable('ticket_histories');
  pgm.dropTable('ticket_services');
  pgm.dropTable('ticket_requesters');
  pgm.dropTable('tickets');
  pgm.dropTable('ticket_slas');
  pgm.dropTable('ticket_priorities');
  pgm.dropTable('ticket_categories');
  pgm.dropTable('ticket_statuses');
  pgm.dropTable('users');
  pgm.dropTable('teams');
};
