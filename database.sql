CREATE TABLE Users(
    user_id integer auto_increment primary key,
    user_name varchar(200) not null,
    password varchar(200) not null,
    email varchar(200) not null unique
);

CREATE TABLE Categories(
    category_id integer auto_increment primary key,
    name varchar(200) not null unique
);

CREATE TABLE Subscription(
    subscription_id integer auto_increment primary key,
    user_id integer,
    email varchar(200) not null unique,
    foreign key(user_id) references Users (user_id)
);

CREATE TABLE Posts(
    post_id integer auto_increment primary key,
    title varchar(200) not null unique,
    body varchar(200) not null,
    publication_date Date not null,
    author_id integer,
    category_id integer,
    foreign key(author_id) references Users(user_id),
    foreign key(category_id) references Categories(category_id)
);

CREATE TABLE Comments(
    comment_id integer auto_increment primary key,
    comment_body varchar(900) not null,
    comment_date Date,
    post_id integer,
    user_id integer,
    foreign key(post_id) references Posts(post_id),
    foreign key(user_id) references Users(user_id)
);
