var mongoose = require('mongoose');
var Expert = require('../model/expert');
var Work = require('../model/work');
var Comment = require('../model/comment');
var User = require('../model/user');

mongoose.connect('mongodb://localhost/crafts');

var _comment = {
    save: function() {
        var user = new User();
        user.name = 'fdb';
        user.roles.push('admin');

        user.save(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log('user');
                console.log(user);

                var comment = new Comment();
                comment.title = '这是我发的评论';
                comment.content = '这是其中的内容，其实也没有什么。';
                comment.poster = user;

                comment.save(function(err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(comment);
                    }
                })
            }
        })
    }
}

// _comment.save();

Comment.findById('5537a4f5343c10979165e2ac').populate('poster').exec(function(err, comments) {
    if (err) {
        console.log(err);
    } else {
        console.log(comments);
    }
})
return;

var save = function() {
    var expert = new Expert();
    expert.name = '';

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

save();
return;

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
