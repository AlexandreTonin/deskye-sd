export const up = (pgm) => {
  pgm.addColumn('ticket_requesters', {
    team_id: { type: 'integer', references: 'teams(id)', onDelete: 'SET NULL' },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('ticket_requesters', 'team_id');
};
