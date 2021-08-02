DROP TABLE USERS exist CASCADE;
DROP TABLE USER_STATUS CASCADE;
DROP TABLE USER_ROLES CASCADE;
DROP TABLE USER_FEATURES CASCADE;
DROP TABLE COMMENTS CASCADE;
DROP TABLE REVIEWS CASCADE;
DROP TABLE MOVIES CASCADE;
DROP TABLE FILMAKING_MEMBERS CASCADE;
DROP TABLE FILMAKING_MEMBERS_ROLES CASCADE;
DROP TABLE CATEGORY CASCADE;
DROP TABLE MOVIES_CATEGORY_RELATION CASCADE;
DROP TABLE user_features_userrelation CASCADE;

CREATE TABLE postgres.USERS (
  id bigserial,
  user_username VARCHAR(50) UNIQUE,
  user_first_name VARCHAR(50) NOT NULL,
  user_last_name VARCHAR(50) NOT NULL,
  user_phone VARCHAR(50),
  user_email VARCHAR(50) NOT NULL,
  user_password VARCHAR(70) NOT NULL,
  user_avatar VARCHAR(70),
  user_last_login_at DATE,
  user_last_ip_address INET,
  status_id int,
  role_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE USER_ROLES (
  id bigserial,
  user_role_name VARCHAR(50) NOT NULL,
  user_role_description VARCHAR(50),
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE USER_STATUSES (
  id bigserial,
  user_status_name VARCHAR(50),
  user_status_description VARCHAR(50),
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE USER_FEATURES (
  id bigserial,
  user_feature_name VARCHAR(50),
  user_feature_description VARCHAR(500),
  PRIMARY KEY (id)
);

CREATE TABLE USER_FEATURES_USERS_RELATION (
  id bigserial,
  user_id int,
  user_feature_id int,
  PRIMARY KEY (id)
);


CREATE TABLE COMMENTS (
  id bigserial,
  comment_rating INT,
  comment VARCHAR(2000),
  user_id int,
  movie_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE LIKES (
  id bigserial,
  user_id int,
  movie_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE REVIEWS (
  id bigserial,
  review_description VARCHAR(10000),
  user_id int,
  movie_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);


CREATE TABLE MOVIES (
  id bigserial,
  movie_title VARCHAR(100) NOT NULL,
  movie_rating INT,
  movie_description VARCHAR(500),
  movie_release_date DATE,
  movie_url VARCHAR(100),
  movie_thumbnail VARCHAR(100),
  movie_like_count int,
  like_count int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE FILMAKING_MEMBERS (
  id bigserial,
  filmaking_member_first_name VARCHAR(50) NOT NULL,
  filmaking_member_last_name VARCHAR(50) NOT NULL,
  filmaking_member_birth_date DATE,
  filmaking_member_birth_place VARCHAR(50),
  filmaking_member_thumbnail VARCHAR(100) NOT NULL,
  filmaking_member_bio VARCHAR(500),
  filmaking_member_role_id int,
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE FILMAKING_MEMBERS_ROLES (
  id bigserial,
  filmaking_member_role_name VARCHAR(50) NOT NULL,
  filmaking_member_role_description VARCHAR(300),
  filmaking_member_role_thumbnail VARCHAR(100),
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE CATEGORIES (
  id bigserial,
  category_name VARCHAR(50) NOT NULL,
  category_description VARCHAR(500),
  category_thumbnail VARCHAR(50),
  created_at timestamp,
  updated_at timestamp,
  created_by int,
  updated_by int,
  PRIMARY KEY (id)
);

CREATE TABLE MOVIES_CATEGORIES_RELATION (
  id bigserial,
  category_id int,
  movie_id int,
  PRIMARY KEY (id)
);



/* FOREIGN  CONSTRAINTS*/
ALTER TABLE USER_FEATURES_USERS_RELATION
ADD CONSTRAINT FK_USER_FEATURES_USERS
FOREIGN KEY (user_id) references USERS(id);

ALTER TABLE USER_FEATURES_USERS_RELATION
ADD CONSTRAINT FK_USERS_USER_FEATURES
FOREIGN KEY (user_feature_id) references USER_FEATURES(id);

ALTER TABLE LIKES
ADD CONSTRAINT FK_USERS_LIKES
FOREIGN KEY ( like_id ) references USERS(id);

ALTER TABLE LIKES
ADD CONSTRAINT FK_MOVIES_LIKES
FOREIGN KEY ( like_id ) references MOVIES(id);

ALTER TABLE COMMENTS 
ADD CONSTRAINT FK_COMMENTS_MOVIES
FOREIGN KEY( movie_id ) REFERENCES MOVIES(id);

ALTER TABLE COMMENTS 
ADD CONSTRAINT FK_COMMENTS_USERS
FOREIGN KEY( user_id ) REFERENCES USERS(id);

ALTER TABLE REVIEWS
ADD CONSTRAINT FK_REVIEWS_USERS
FOREIGN KEY(user_id) REFERENCES USERS(id);

ALTER TABLE REVIEWS
ADD CONSTRAINT FK_MOVIES_USERS
FOREIGN KEY(movie_id) REFERENCES MOVIES(id);

ALTER TABLE FILMAKING_MEMBERS 
ADD CONSTRAINT FK_FILMAKING_TEAM_TO_FILMAKING_ROLES
FOREIGN KEY (filmaking_members_role_id) references FILMAKING_MEMBERS_ROLES(id);

ALTER TABLE MOVIES_CATEGORIES_RELATION 
ADD CONSTRAINT FK_MOVIES_CATEGORIES
FOREIGN KEY(category_id) REFERENCES CATEGORIES(id);

ALTER TABLE MOVIES_CATEGORIES_RELATION 
ADD CONSTRAINT FK_CATEGORIES_MOVIES
FOREIGN KEY(movie_id) REFERENCES MOVIES(id);


INSERT INTO USER_ROLES ( user_role_name,user_role_description) VALUES ('admin','he who remains');
INSERT INTO USER_ROLES ( user_role_name,user_role_description) VALUES ('user','the one');
INSERT INTO USER_ROLES ( user_role_name,user_role_description) VALUES ('superadmin','ulala');
INSERT INTO USER_STATUSES (user_status_name,user_status_description) VALUES ('active','self explanatory');
INSERT INTO USER_STATUSES (user_status_name,user_status_description) VALUES ('inactive','idk');
INSERT INTO USER_STATUSES (user_status_name,user_status_description) VALUES ('draft','ulala');


INSERT INTO CATEGORIES (category_name,category_description) VALUES ('horror','');
INSERT INTO CATEGORIES (category_name,category_description) VALUES ('action','');

insert into movies_categories_relation ( category_id, movie_id ) values ( 1, 11 );
insert into movies_categories_relation ( category_id, movie_id ) values ( 2, 11 );

insert into comments ( comment, movie_id, user_id ) values ('hello world',11,1);
insert into comments ( comment, movie_id, user_id ) values ('nothing much',11,2);

insert into comments ( comment, movie_id, user_id ) values ('world',10,1);
insert into comments ( comment, movie_id, user_id ) values ('much',13,1);

insert into user_features_users_relation (user_id,user_feature_id) 
values (1,2);
insert into user_features_users_relation (user_id,user_feature_id) 
values (1,1);



INSERT INTO FILMAKING_MEMBERS_ROLES (
  filmaking_members_role_name,
  filmaking_members_role_description,
  filmaking_members_role_thumbnail
) VALUES ('director','','');

INSERT INTO FILMAKING_MEMBERS_ROLES (
  filmaking_member_role_name,
  filmaking_member_role_description,
  filmaking_member_role_thumbnail
) VALUES ('actor','','');

INSERT INTO FILMAKING_MEMBERS_ROLES (
  filmaking_member_role_name,
  filmaking_member_role_description,
  filmaking_member_role_thumbnail
) VALUES ('actor','','');


insert into USERS (user_username, user_first_name, user_last_name, user_phone, user_email, user_password, user_avatar, user_last_login_at, user_last_ip_address, created_at, updated_at) 
values          ('cduckham0', 'Cloris', 'Duckham', '829-345-1234','dunkan@gmail.com', '123456789', 'none', '7/19/2021', null, null, '7/19/2021');
insert into USERS (user_username, user_first_name, user_last_name, user_phone, user_email, user_password, user_avatar, user_last_login_at, user_last_ip_address, created_at, updated_at) 
values ('rhinkensen1', 'Rahal', 'Hinkensen', '304-195-7502', 'rhinkensen1@theatlantic.com', 'FJ4FRqJC', 'https://robohash.org/facilisatmolestiae.png?size=50x50&set=set1', null, null, '7/19/2021', null);


update users 
set role_id=1,status_id=1
where id=1;

insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Warde', 'Glowacki', '3/1/2021', 'Peru', 'https://robohash.org/adsapienteet.png?size=50x50&set=set1', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', null, null, null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Valeda', 'Carrell', '2/16/2021', null, null, null, '7/19/2021', '7/19/2021', null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Dawn', 'Toulson', '5/21/2021', 'Honduras', 'https://robohash.org/velnamtenetur.png?size=50x50&set=set1', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', null, null, null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Hilliard', 'Borless', '7/21/2020', null, null, null, '7/19/2021', '7/19/2021', null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Geordie', 'Landrieu', '3/1/2021', null, null, null, null, null, null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Penn', 'Crebott', '4/13/2021', null, null, null, null, null, null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Piggy', 'Skates', '3/1/2021', 'Sierra Leone', 'https://robohash.org/rationedebitisnumquam.png?size=50x50&set=set1', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '7/19/2021', '7/19/2021', null, null);
insert into FILMAKING_MEMBERS (filmaking_member_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, created_at, updated_at, created_by, updated_by) values ('Addy', 'Mazzeo', '12/30/2020', 'Thailand', 'https://robohash.org/perspiciatisrerumsint.png?size=50x50&set=set1', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '7/19/2021', '7/19/2021', null, null);insert into FILMAKING_MEMBERS (filmaking_members_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, filmaking_member_created_at, filmaking_members_updated_at, filmaking_members_created_by, filmaking_members_updated_by) values ('Casper', 'Tyler', '7/12/2021', 'Portugal', 'https://robohash.org/voluptatemcumautem.png?size=50x50&set=set1', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', null, null, null, null);insert into FILMAKING_MEMBERS (filmaking_members_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, filmaking_member_created_at, filmaking_members_updated_at, filmaking_members_created_by, filmaking_members_updated_by) values ('Yetta', 'Wray', '8/24/2020', 'Russia', 'https://robohash.org/repellatdebitisrerum.png?size=50x50&set=set1', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '7/19/2021', '7/19/2021', null, null);insert into FILMAKING_MEMBERS (filmaking_members_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, filmaking_member_created_at, filmaking_members_updated_at, filmaking_members_created_by, filmaking_members_updated_by) values ('Fair', 'Vitte', '11/7/2020', 'Japan', 'https://robohash.org/veniamearumillum.png?size=50x50&set=set1', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', '7/19/2021', '7/19/2021', null, null);insert into FILMAKING_MEMBERS (filmaking_members_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, filmaking_member_created_at, filmaking_members_updated_at, filmaking_members_created_by, filmaking_members_updated_by) values ('Mehetabel', 'Veldstra', '12/11/2020', 'China', 'https://robohash.org/istequosdolorum.png?size=50x50&set=set1', 'In congue. Etiam justo. Etiam pretium iaculis justo.In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '7/19/2021', '7/19/2021', null, null);insert into FILMAKING_MEMBERS (filmaking_members_first_name, filmaking_member_last_name, filmaking_member_birth_date, filmaking_member_birth_place, filmaking_member_thumbnail, filmaking_member_bio, filmaking_member_created_at, filmaking_members_updated_at, filmaking_members_created_by, filmaking_members_updated_by) values ('Callie', 'Haythorne', '1/29/2021', 'Czech Republic', 'https://robohash.org/corporisautomnis.png?size=50x50&set=set1', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '7/19/2021', '7/19/2021', null, null);

/* FILMAKING MEMBERS*/

insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Last Train from Gun Hill', 3, 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '9/30/2011', 'http://usnews.com/tincidunt/nulla/mollis/molestie/lorem/quisque.html', 'http://dummyimage.com/111x100.png/ff4444/ffffff', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('This Movie Is Broken', 2, 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '10/24/2006', 'http://netvibes.com/consequat/varius/integer.js', 'http://dummyimage.com/180x100.png/dddddd/000000', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Zombie Apocalypse', 5, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', null, null, null, '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('There Was a Father (Chichi ariki)', 5, 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '1/26/1995', 'https://xinhuanet.com/libero/quis.json', 'http://dummyimage.com/240x100.png/ff4444/ffffff', null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Back Street', 4, 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '6/4/2019', 'http://github.com/bibendum/morbi.json', 'http://dummyimage.com/108x100.png/cc0000/ffffff', null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Pariah', 4, 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', null, null, null, null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('High and the Mighty, The', 5, 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', null, null, null, null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Stickup, The', 3, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '6/26/2021', 'https://posterous.com/nulla/nunc/purus/phasellus/in/felis/donec.png', 'http://dummyimage.com/143x100.png/dddddd/000000', null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Triple Cross', 1, 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '6/6/2016', 'http://pinterest.com/et/ultrices/posuere.js', 'http://dummyimage.com/212x100.png/5fa2dd/ffffff', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Oily Maniac, The (You gui zi)', 1, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '2/21/1992', 'http://google.it/cubilia.xml', 'http://dummyimage.com/247x100.png/5fa2dd/ffffff', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Hitch Hike (Autostop rosso sangue) (Naked Prey, The)', 1, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', '11/15/2020', 'http://zdnet.com/ut/erat/curabitur/gravida/nisi.html', 'http://dummyimage.com/157x100.png/dddddd/000000', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Illuminata', 2, 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '12/26/2016', 'http://wired.com/duis/faucibus/accumsan.png', 'http://dummyimage.com/193x100.png/dddddd/000000', '7/19/2021', '7/19/2021', null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Carrington', 3, 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', null, null, null, null, null, null, null);
insert into MOVIES (movie_title, movie_rating, movie_description, movie_release_date, movie_url, movie_thumbnail, created_at, updated_at, created_by, updated_by) values ('Doorway to Hell, The', 2, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '4/9/1996', 'https://tinypic.com/phasellus/id/sapien.aspx', 'http://dummyimage.com/105x100.png/cc0000/ffffff', '7/19/2021', '7/19/2021', null, null);