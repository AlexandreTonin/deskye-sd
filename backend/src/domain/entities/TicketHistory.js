class TicketHistory {
  constructor({ id, ticket_id, action, performed_by, created_at }) {
    this.id = id;
    this.ticket_id = ticket_id;
    this.action = action;
    this.performed_by = performed_by;
    this.created_at = created_at;
  }
}

export { TicketHistory };
