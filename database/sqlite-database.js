var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Person = sequelize.define('people', {
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    middlename: {
        type: Sequelize.STRING,
         validate: {
            len: [1,5]
        }
    },
    aliasname:{
        type: Sequelize.STRING,
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1],
            isAlpha: true
        }
    },
    dateofbirth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    }

});

sequelize.sync({force:true}).then( function (){
    console.log('Everything is synced.');

    Person.create({
        lastname: "Lee",
        firstname: "Patrick",
        middlename: "Keng",
        aliasname: "pLee",
        sex: "M",
        dateofbirth: 11-30-1969
    }).then( function (person) {
        return Person.create({
            lastname: "Lee",
            firstname: "Christine",
            middlename: "Mei",
            aliasname: "cYu",
            sex: "F",
            dateofbirth: 1970-7-27
        });
    }).then( function(){
        //return Person.findById(1)
        return Person.findAll({
            where: {
                //sex: "M",
                firstname: {
                    $like: "%rick%"
                }
            }
        });
    }).then( function( people ){
        if(people){
            people.forEach( function (person){
                console.log(person.toJSON());
            });            
        }else{
            console.log('No person found!');
        }
    }).catch( function (e) {
        console.log(e);
    });
});