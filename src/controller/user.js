import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../model/user';
import Course from '../model/course';
import Grade from '../model/grade';

export default({ config, db }) => {
    let api = Router();

    // '/v1/course/add' - CREATE user.
    api.post('/add', (req, res) => {
       let newUser = new User();
       newUser.username = req.body.username;
       newUser.password = req.body.password;
       newUser.save(err => {
           if(err) {
               res.send(err);
           }
           res.json({ message: 'User saved successfully.' });
       });
    });

    // '/v1/user/course/add' - CREATE course.
    api.post('/courses/add/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if(err) {
                res.send(err);
            }
            let newCourse = new Course();
            newCourse.title = req.body.title;
            newCourse.credits = req.body.credits;
            newCourse.instructor = req.body.instructor;
            newCourse.user = user._id;
            newCourse.save((err, course) => {
                if(err) {
                    res.send(err);
                }
                user.courses.push(newCourse);
                user.save(err => {
                    if(err) {
                        res.send(err);
                    }
                    res.json({ message: "Course saved successfully." });
                });
            });
        });
    });

    // '/v1/user/grades/add/:id' - CREATE grade.
    api.post('/grades/add/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if(err) {
                res.send(err);
            }
            let newGrade = new Grade();
            newGrade.name = req.body.name;
            newGrade.mark = req.body.mark;
            newGrade.weight = req.body.weight;
            newGrade.course = course._id;
            newGrade.save((err, grade) => {
                if(err) {
                    res.send(err);
                }
                course.grades.push(newGrade);
                course.save(err => {
                    if(err) {
                        res.send(err);
                    }
                    res.json({ message: "Grade saved successfully." });
                });
            });
        });
    });

    return api;
}