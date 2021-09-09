CREATE TABLE entity_info (
  id serial not null,
  entity_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY(id)
);