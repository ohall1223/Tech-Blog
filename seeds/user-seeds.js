const { User } = require('../models');

const userData = [{
        username: 'Kelly',
        password: 'password1'

    },
    {
        username: 'Kody',
        password: 'password2'
    },
    {
        username: 'Winnie',
        password: 'password3'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;