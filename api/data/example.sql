-- Deploy lyre-API:0000-bdd-initialization to pg

BEGIN;
-------------------------------
-- EXTENTION & DOMAIN
-------------------------------

DROP EXTENSION IF EXISTS unaccent;

CREATE EXTENSION unaccent;

CREATE DOMAIN TEXT_ONLY AS TEXT CHECK(unaccent(VALUE) ~ '^[A-Za-z \-]+$');
CREATE DOMAIN ALPHANUM AS TEXT CHECK(unaccent(VALUE) ~ '^[A-Za-z\ \-\#\d]+$');
CREATE DOMAIN TEXT_MAIL AS TEXT CHECK(VALUE ~ '(^[a-z\d\.\-\_]+)@{1}([a-z\d\.\-]{2,})[.]([a-z]{2,5})$');
-- create domain text_pwd

-------------------------------
-- TABLES
-------------------------------

DROP TABLE IF EXISTS "table" CASCADE;

--rôle
CREATE TABLE IF NOT EXISTS "table"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"firstname" TEXT_ONLY NOT NULL,
"lastname" TEXT_ONLY NOT NULL,
"email"TEXT_MAIL NOT NULL UNIQUE,
"password" TEXT NOT NULL,
"desk_id" INT REFERENCES "desk"("id"),
"last_connection" TIMESTAMPTZ DEFAULT NOW(),
"docket_id" INT NOT NULL REFERENCES "docket"("id"),
"hide" BOOLEAN DEFAULT false
);

-------------------------------
-- EXAMPLE CREATE FUNCTION ADD
-------------------------------

CREATE FUNCTION "member_add"(newDatas json) RETURNS SETOF "member" AS
$$
INSERT INTO "member"("firstname", "lastname", "email", "password", "desk_id", "docket_id") VALUES (
newDatas ->> 'firstname',
newDatas ->> 'lastname',
newDatas ->> 'email',
newDatas ->> 'password',
(newDatas ->> 'desk_id')::int,
(newDatas ->> 'docket_id')::int
) RETURNING *;
$$
LANGUAGE sql VOLATILE STRICT;

-------------------------------
-- EXAMPLE CREATE FUNCTION UPDATE
-------------------------------

CREATE FUNCTION "member_update"(updatedDatas json) RETURNS SETOF "member" AS
$$
UPDATE "member" SET
"firstname" = updatedDatas ->> 'firstname',
"lastname" = updatedDatas ->> 'lastname',
"email" = updatedDatas ->> 'email',
"password" = updatedDatas ->> 'password',
"desk_id" = (updatedDatas ->> 'desk_id')::int,
"docket_id" = (updatedDatas ->> 'docket_id')::int,
"hide" = (updatedDatas ->> 'hide')::boolean
WHERE "id" = (updatedDatas ->> 'id')::int
 RETURNING *;
$$
LANGUAGE sql VOLATILE STRICT;

COMMIT;