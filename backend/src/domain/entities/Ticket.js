class Ticket {
  constructor({
    id,
    title,
    description,
    status_id,
    priority_id,
    category_id,
    sla_id,
    responsible_id,
    created_by,
    created_at,
    updated_at,
    updated_by,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status_id = status_id;
    this.priority_id = priority_id;
    this.category_id = category_id;
    this.sla_id = sla_id;
    this.responsible_id = responsible_id;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
  }
}

export { Ticket };
