'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _course = require('../model/course');

var _course2 = _interopRequireDefault(_course);

var _grade = require('../model/grade');

var _grade2 = _interopRequireDefault(_grade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // USER operations.

    // '/v1/user/add' - CREATE user.
    api.post('/add', function (req, res) {
        var newUser = new _user2.default();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User saved successfully.' });
        });
    });

    // GET users.
    api.get('/', function (req, res) {
        _user2.default.find({}, function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

    // '/v1/user/:id' - DELETE an user and associated values.
    api.delete('/:id', function (req, res) {
        _user2.default.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (user === null) {
                res.status(404).send("User not found.");
                return;
            }
            _user2.default.remove({
                _id: req.params.id
            }, function (err, user) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                _course2.default.remove({
                    user: req.params.id
                }, function (err, course) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    _grade2.default.remove({
                        course: req.params.id
                    }, function (err, grade) {
                        if (err) {
                            res.send(err);
                        }
                        res.json({ message: "User successfully removed." });
                    });
                });
            });
        });
    });

    // COURSE operations.

    // '/v1/user/courses/:id' - READ courses for user.
    api.get('/courses/:id', function (req, res) {
        _course2.default.find({ user: req.params.id }, function (err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    });

    // '/v1/user/courses/:id' - DELETE a course.
    api.delete('/courses/:id', function (req, res) {
        _course2.default.findByIdAndRemove(req.params.id, function (err, course) {
            var response = {
                message: "Course successfully removed",
                id: course._id
            };
            res.status(200).send(response);
        });
    });

    // '/v1/user/courses/add/:id' - CREATE course.
    api.post('/courses/add/:id', function (req, res) {
        _user2.default.findById(req.params.id, function (err, user) {
            if (err) {
                res.send(err);
            }
            var newCourse = new _course2.default();
            newCourse.title = req.body.title;
            newCourse.credits = req.body.credits;
            newCourse.instructor = req.body.instructor;
            newCourse.user = user._id;
            newCourse.save(function (err, course) {
                if (err) {
                    res.send(err);
                }
                user.courses.push(newCourse);
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Course saved successfully." });
                });
            });
        });
    });

    // '/v1/user/courses/update/:id' - UPDATE course.
    api.put('/courses/update/:id', function (req, res) {
        _course2.default.findById(req.params.id, function (err, course) {
            if (err) {
                res.send(err);
            }
            course.title = req.body.title;
            course.credits = req.body.credits;
            course.instructor = req.body.instructor;
            course.average = req.body.average;
            course.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Course info updated." });
            });
        });
    });

    // GRADES operations.

    // '/v1/user/grades/:id' - READ grades for course.
    api.get('/grades/:id', function (req, res) {
        _grade2.default.find({ course: req.params.id }, function (err, grades) {
            if (err) {
                res.send(err);
            }
            res.json(grades);
        });
    });

    // '/v1/user/grades/add/:id' - CREATE grade.
    api.post('/grades/add/:id', function (req, res) {
        _course2.default.findById(req.params.id, function (err, course) {
            if (err) {
                res.send(err);
            }
            var newGrade = new _grade2.default();
            newGrade.name = req.body.name;
            newGrade.mark = req.body.mark;
            newGrade.weight = req.body.weight;
            newGrade.course = course._id;
            newGrade.save(function (err, grade) {
                if (err) {
                    res.send(err);
                }
                course.grades.push(newGrade);
                course.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Grade saved successfully." });
                });
            });
        });
    });

    // '/v1/user/grades/:id' - DELETE a grade.
    api.delete('/grades/:id', function (req, res) {
        _grade2.default.findByIdAndRemove(req.params.id, function (err, grade) {
            var response = {
                message: "Grade successfully removed",
                id: grade._id
            };
            res.status(200).send(response);
        });
    });

    return api;
};
//# sourceMappingURL=user.js.map