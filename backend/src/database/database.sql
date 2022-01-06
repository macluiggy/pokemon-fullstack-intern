CREATE DATABASE jwttutorial;

--set extention 
CREATE TABLE users (
  user_id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(), 
  user_name VARCHAR(255) NOT NULL,
  -- password VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  -- created_at TIMESTAMP NOT NULL DEFAULT NOW()
  user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly21@gmail.com', 'kth18822');