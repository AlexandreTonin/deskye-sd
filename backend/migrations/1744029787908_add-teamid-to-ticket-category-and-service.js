export const up = (pgm) => {
  pgm.addColumn('ticket_categories', {
    team_id: { type: 'integer', references: 'teams(id)', onDelete: 'SET NULL' },
  });

  pgm.addColumn('ticket_services', {
    team_id: { type: 'integer', references: 'teams(id)', onDelete: 'SET NULL' },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('ticket_categories', 'team_id');
  pgm.dropColumn('ticket_services', 'team_id');
};
