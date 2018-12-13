create table base_parent (         
  created_date timestamp default current_timestamp unique not null,
  updated_date timestamp default current_timestamp unique not null,
  deleted      boolean   default false unique not null
);

create table agencies (
  uniquekey serial primary key,
  name      varchar(100) unique not null,
  acronym   varchar(5) not null,

  parent_fkey integer references agencies(uniquekey)
) inherits (base_parent);

create table products (
  uniquekey   serial primary key,
  name        varchar(100) unique not null
) inherits (base_parent);

create table releases (
  uniquekey serial primary key,
  major     integer not null,
  minor     integer not null,
  patch     integer not null,
  build     integer not null,

  product_fkey integer references products(uniquekey) not null
) inherits (base_parent);

create table distributions (
  uniquekey serial primary key,
  name      varchar(50) unique not null
) inherits (base_parent);

create table distribution_releases (
  uniquekey serial primary key,

  distribution_fkey integer references distributions(uniquekey) not null,
  release_fkey integer references releases(uniquekey) not null
) inherits (base_parent);

create table contacts (
  uniquekey serial primary key,
  name      varchar(100) not null,
  phone     varchar(20) not null,
  email     varchar(100) not null,

  agency_fkey integer references agencies(uniquekey) not null
) inherits (base_parent);

create table environments (
  uniquekey serial primary key,
  name varchar(100) default 'live' not null,

  agency_fkey integer references agencies(uniquekey) not null
) inherits (base_parent);

create table environment_releases (
  uniquekey serial primary key,

  environment_fkey integer references environments(uniquekey) not null,
  release_fkey integer references releases(uniquekey) not null
) inherits (base_parent);
