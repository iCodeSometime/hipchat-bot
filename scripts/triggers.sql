create or replace function update_timestamp()
  returns trigger as $$
begin
  new.updated_date = current_timestamp;

  return new;
end
$$ language plpgsql;

/* todo: dynamic - all that inherit from base_parent

select c.relname                                                                                                       
from pg_inherits
join pg_class as c on (inhrelid=c.oid)
join pg_class as p on (inhparent=p.oid)
where p.relname = 'base_parent';
*/

create trigger update_timestamp_agencies
before update on agencies
for each row execute procedure update_timestamp();

create trigger update_timestamp_products
before update on products
for each row execute procedure update_timestamp();

create trigger update_timestamp_releases
before update on releases
for each row execute procedure update_timestamp();

create trigger update_timestamp_distributions
before update on distributions
for each row execute procedure update_timestamp();

create trigger update_timestamp_contacts
before update on contacts
for each row execute procedure update_timestamp();

create trigger update_timestamp_distribution_releases
before update on distribution_releases
for each row execute procedure update_timestamp();

create trigger update_timestamp_environments
before update on environments
for each row execute procedure update_timestamp();

create trigger update_timestamp_environment_releases
before update on environment_releases
for each row execute procedure update_timestamp();

