var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Expert = require('../model/expert');
var Work = require('../model/work');

// expert.name = 'fdb';
// expert.works = new Array();

// console.log(expert);

var save = function() {
    var expert = new Expert();
    for (var i = 0; i < 5; i++) {
        var work = new Work();
        work.name = 'T' + i;
        work.description = '名字是：' + work.name;
        // work.author = expert;
        expert.works.push(work);
    }
    expert.save(function(err, expert) {
        if (err) {
            console.log(err);
        } else {
            console.log(expert);
        }
    });
}

// Expert.find().select('name works.name').exec(function(err, experts) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(experts);
//
//     }
// });

Expert.distinct('works').exec(function(err, works) {
    if (err) {
        console.log(err);
    } else {
        console.log(works);
        for(var i in works) {
            console.log(works[i].name);
        }
    }
});
