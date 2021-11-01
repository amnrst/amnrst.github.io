-- https://postgrest.org initialization script

create schema if not exists api;

create table if not exists api.todos (
  id serial primary key,
  done boolean not null default false,
  task text not null,
  due timestamptz
);

insert into api.todos (task) values
  ('finish tutorial 0'), ('pat self on back');


-- The web_anon role has permission to access things in the api schema,
-- and to read rows in the todos table.
create role web_anon nologin;

grant usage on schema api to web_anon;
grant select on api.todos to web_anon;

-- create a dedicated role for connecting to the database,
-- instead of using the highly privileged postgres role.
create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;