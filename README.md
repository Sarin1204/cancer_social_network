# cancer_social_network
The Cancer Social Network is a Social Network built for Children's Cancer Network, an NGO in Arizona helping families whose children have cancer. The network facilitates the creation of connections between such families to provide mutual aid and support. Please do check out the screenshots of the Network in the Wiki!
Cancer Social Network was primarily built for the parents of children who have cancer, not the children themselves to ensure the safety of the children involved.
The Network supports the following features:
1. Friendships - Users can send friend requests to other users, who can choose to accept them or not.
2. Status Updates and Comments - Users can post status updates as well as comment on status updates from friends. Status updates from 
friends are aggregated in the home news feeds of users.
3. Search for other Users - Users may search for other users on the network to connect to, based on filters, primarily the
location, cancer type and interests of the child.
4. Privacy - Sensitive user information is only viewable by friends of other Users to ensure privacy
5. PasswordLess Login - Users may create a profile through Facebook or Google Plus.

The Cancer Social Network utilizes the following technologies:
1. NodeJS as the platform, with ExpressJS as the Server Side Web Framework
2. AngularJS as the front end Javascript Framework
3. Bootstrap to ensure a consistent look and responsive web design
4. There is a dual database of Apache Cassandra and MYSQL to ensure scalability and responsiveness

The Cancer Social Network's primary goal was to help an NGO solve an issue they needed help with.
It also allowed me to learn various new technologies in the process. The project is far from finished and
requires additional work in the following fields:
1. Deletion of Status Updates and/or Users from a distributed database environment (Apache Cassandra)
2. Allowing users to 'Like' or 'Star' a status update or comment
3. Test cases need to be developed for various modules
4. A tighter integration between the MYSQL database and the Apache Cassandra database as relates to User information

The following pre-requisite technologies are required to be installed in order to create a development environment for this project:
1. Apache Cassandra Database (Single Node) - please check the Apache Cassandra website as to how to install this
2. MySQL Database - please check the MYSQL website
3. IDE - I personally have used WebStorm, which I find is excellent for Javascript
4. NodeJS and NPM - Please see the NodeJS website as to how to install this

Due to my commitments as a graduate student I am forced to keep this project on hiatus. Hopefully I will be able
to return to it in the future. I welcome all contributions to the project.
