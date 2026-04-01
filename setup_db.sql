-- Create the database
CREATE DATABASE gestionecole;

-- Create the user (role)
CREATE USER gestionecole WITH PASSWORD 'gestionecole';

-- Grant privileges to the user
ALTER ROLE gestionecole CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE gestionecole TO gestionecole;

-- Connect to the database and grant schema privileges
\c gestionecole;

GRANT USAGE ON SCHEMA public TO gestionecole;
GRANT CREATE ON SCHEMA public TO gestionecole;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gestionecole;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gestionecole;
