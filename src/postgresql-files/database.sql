
CREATE TABLE auth (
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(255) PRIMARY KEY,
  user_bio VARCHAR(255),
  user_profile_pic VARCHAR(255),
  user_name VARCHAR(255),
  user_other_links JSONB,
  user_profession VARCHAR(255),
  user_email VARCHAR(255),
  user_full_name VARCHAR(255),
  is_paid BOOLEAN,
  credits INTEGER,
  follows TEXT[],
  followers INTEGER,
  reports INTEGER,
  is_banned BOOLEAN,
  saved_polls TEXT[]
);


CREATE TABLE IF NOT EXISTS polls (
  poll_id TEXT PRIMARY KEY,
  poll_title TEXT,
  poll_description TEXT,
  poll_owner_username TEXT,
  poll_options_text TEXT[],
  poll_options_image_urls TEXT[],
  poll_labels TEXT[],
  poll_tags TEXT[],
  poll_type INTEGER,
  poll_background_color TEXT,
  poll_background_image TEXT,
  poll_creation_time TIMESTAMPTZ,
  is_open BOOLEAN,
  is_sponsored BOOLEAN,
  ends_on TIMESTAMPTZ,
  total_opened INTEGER,
  total_responded INTEGER,
  total_shared INTEGER,
  total_saved INTEGER,
  total_likes INTEGER,
  reports INTEGER,
  is_banned BOOLEAN
);

