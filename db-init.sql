-- This file need only be imported once, by a high-level user.
-- This operation will create the users necessary for operating and testing the server.

--
-- Create Databases If They Don't Exist
--

CREATE DATABASE IF NOT EXISTS common_workshop;
CREATE DATABASE IF NOT EXISTS common_workshop_testing;

--
-- Create Server User
--

FLUSH PRIVILEGES;

-- Create General Server User
DROP USER IF EXISTS 'common_workshop_server'@'localhost';
CREATE USER 'common_workshop_server'@'localhost' IDENTIFIED WITH mysql_native_password BY '8237OIULB$@(IEOiuef2';
GRANT CREATE, INSERT, SELECT, UPDATE, DELETE ON common_workshop.* TO 'common_workshop_server'@'localhost';

FLUSH PRIVILEGES;