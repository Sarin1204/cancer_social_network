/**
 * Created by sarin on 10/21/15.
 */
var models = require('express-cassandra');

///home/sarin/MEAN_BOOK/app

models.setDirectory("/home/sarin/Cancer_Network/app/models").bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            keyspace: 'cancer_network',
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            dropTableOnSchemaChange: false
        }
    },
    function(err) {
        if(err) console.log('Cassandra.js == ' +err.message);
        else console.log('connected = '+models.timeuuid());
    }
);