
CREATE KEYSPACE cancer_social_network WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TYPE cancer_social_network.status_comment (
    id timeuuid,
    author_email text,
    comment_body text,
    author_firstname text,
    author_lastname text,
    author_profile_photo text
);

CREATE TABLE cancer_social_network.parent_inbound_follows (
    followed_email text,
    follower_email text,
    PRIMARY KEY (followed_email, follower_email)
) WITH CLUSTERING ORDER BY (follower_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.child_cancer_type (
    cancer_type text,
    parent_email text,
    age int,
    firstname text,
    gender text,
    hospital text,
    id uuid,
    interests set<text>,
    lastname text,
    parent_firstname text,
    parent_lastname text,
    parent_profile_photo text,
    zipcode int,
    PRIMARY KEY (cancer_type, parent_email)
) WITH CLUSTERING ORDER BY (parent_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.parent_friends (
    followed_email text,
    follower_email text,
    PRIMARY KEY (followed_email, follower_email)
) WITH CLUSTERING ORDER BY (follower_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';
CREATE INDEX parent_friends_follower_email_idx ON cancer_social_network.parent_friends (follower_email);

CREATE TABLE cancer_social_network.home_status_updates (
    timeline_email text,
    status_update_id timeuuid,
    body text,
    comments list<frozen<status_comment>>,
    profile_photo text,
    status_update_email text,
    status_update_firstname text,
    status_update_lastname text,
    PRIMARY KEY (timeline_email, status_update_id)
) WITH CLUSTERING ORDER BY (status_update_id DESC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';
CREATE INDEX home_status_updates_status_update_email_idx ON cancer_social_network.home_status_updates (status_update_email);

CREATE TABLE cancer_social_network.parent_outbound_follows (
    follower_email text,
    followed_email text,
    PRIMARY KEY (follower_email, followed_email)
) WITH CLUSTERING ORDER BY (followed_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.pending_friend_requests (
    parent_received_email text,
    parent_sent_email text,
    sender_firstname text,
    sender_lastname text,
    sender_profile_photo text,
    PRIMARY KEY (parent_received_email, parent_sent_email)
) WITH CLUSTERING ORDER BY (parent_sent_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';
CREATE INDEX pending_friend_requests_parent_sent_email_idx ON cancer_social_network.pending_friend_requests (parent_sent_email);

CREATE TABLE cancer_social_network.parents (
    email text PRIMARY KEY,
    address text,
    child_id uuid,
    facebook_id text,
    firstname text,
    gender text,
    google_id text,
    id uuid,
    lastname text,
    password text,
    phone varint,
    profile_photo text,
    twitter_id text,
    zipcode int
) WITH bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.child (
    parent_email text,
    id uuid,
    age int,
    cancer_type text,
    firstname text,
    gender text,
    hospital text,
    interests set<text>,
    lastname text,
    zipcode int,
    PRIMARY KEY (parent_email, id)
) WITH CLUSTERING ORDER BY (id ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.parent_hash_tags (
    prefix text,
    remaining text,
    firstname text,
    lastname text,
    profile_photo text,
    tag text,
    PRIMARY KEY (prefix, remaining)
) WITH CLUSTERING ORDER BY (remaining ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.child_id (
    parent_email text,
    id text,
    age int,
    cancer_type text,
    firstname text,
    gender text,
    hospital text,
    interests set<text>,
    lastname text,
    zipcode text,
    PRIMARY KEY (parent_email, id)
) WITH CLUSTERING ORDER BY (id ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.parent_status_updates1 (
    email text,
    id uuid,
    body text,
    PRIMARY KEY (email, id)
) WITH CLUSTERING ORDER BY (id ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

CREATE TABLE cancer_social_network.child_cancer_type_zipcode (
    cancer_type text,
    zipcode int,
    parent_email text,
    age text,
    firstname text,
    gender text,
    hospital text,
    id uuid,
    interests set<text>,
    lastname text,
    parent_firstname text,
    parent_lastname text,
    parent_profile_photo text,
    PRIMARY KEY (cancer_type, zipcode, parent_email)
) WITH CLUSTERING ORDER BY (zipcode ASC, parent_email ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';
CREATE INDEX child_cancer_type_zipcode_age_idx ON cancer_social_network.child_cancer_type_zipcode (age);
CREATE INDEX child_cancer_type_zipcode_interests_idx ON cancer_social_network.child_cancer_type_zipcode (interests);

CREATE TABLE cancer_social_network.parent_status_updates (
    email text,
    id timeuuid,
    body text,
    comments list<frozen<status_comment>>,
    PRIMARY KEY (email, id)
) WITH CLUSTERING ORDER BY (id DESC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = '{"keys":"ALL", "rows_per_partition":"NONE"}'
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy'}
    AND compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99.0PERCENTILE';

