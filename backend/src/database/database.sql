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

CREATE TABLE favorite_pokemons (
  user_id VARCHAR(255) NOT NULL,
  pokemon_name VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly21@gmail.com', 'kth18822');
INSERT INTO favorite_pokemon (user_id, pokemon_name) VALUES ('9dad5fbb-bbf9-415c-808f-75f8ee39b454', 'pikachu');