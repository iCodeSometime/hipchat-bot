/**
 * Creates test data to play with.
 */

insert into products(name)
values
  ('Admin'),
  ('CAD'),
  ('RMS'),
  ('Jail'),
  ('Evidence'),
  ('Mobile'),
  ('Mobile Forms');

insert into agencies(name, acronym)
values
  ('Florida Highway Patrol', 'FHP'),
  ('Escambia County Sheriff''s Office', 'ECSO'),
  ('Winter Garden Sheriff''s Office', 'WGPD');

insert into agencies(name, acronym, parent_fkey)
values
  ('Windermere', 'WPD', (select uniquekey from agencies where acronym = 'WGPD')),
  ('Oakland', 'OAK', (select uniquekey from agencies where acronym = 'WGPD')),
  ('Florida Fish and Wildlife', 'FWC', (select uniquekey from agencies where acronym = 'FHP'));

insert into releases(major, minor, patch, build, product_fkey)
values
  (9, 13, 0, 101, 1),
  (9, 13, 0, 101, 2),
  (9, 13, 0, 101, 3),
  (9, 13, 0, 101, 4),
  (9, 13, 0, 101, 5),
  (9, 13, 0, 101, 6),
  (9, 13, 0, 101, 7);

insert into distributions(name)
values
  ('beta'),
  ('general availability');

insert into distribution_releases(distribution_fkey, release_fkey)
select
  distributions.uniquekey,
  releases.uniquekey
from distributions
cross join releases;

insert into contacts(name, phone, email, agency_fkey)
values
  ('Lt. Golloher', '850.361.9189', 'lgolloher@myfwc.com', (select uniquekey from agencies where acronym = 'FWC')),
  ('Joel Slanco', '850.361.9189', 'jslanco@flhsmv.gov', (select uniquekey from agencies where acronym = 'FHP')),
  ('Chris Karp', '850.361.9189', 'ckarp@ecso.gov', (select uniquekey from agencies where acronym = 'ECSO')),
  ('WGPD guy', '850.361.9189', 'wguy@wgpd.net', (select uniquekey from agencies where acronym = 'WGPD')),
  ('WPD guy', '850.361.9189', 'wpguy@windermere.us', (select uniquekey from agencies where acronym = 'WPD')),
  ('OAK guy', '850.361.9189', 'oguy@oakland.us', (select uniquekey from agencies where acronym = 'OAK'));

insert into environments(agency_fkey)
select
  uniquekey
from agencies;

insert into environment_releases(environment_fkey, release_fkey)
select
  environments.uniquekey,
  releases.uniquekey
from environments
cross join releases;

 
