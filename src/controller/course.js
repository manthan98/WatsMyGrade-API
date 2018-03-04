import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../model/user';
import Course from '../model/course';
import Grade from '../model/grade';

export default({ config, db }) => {
    let api = Router();

    // '/v1/course/add' - CREATE course.
    api.post('/add', (req, res) => {
        let newCourse = new Course();
        newCourse.title = req.body.title;
        newCourse.credits = req.body.credits;
        newCourse.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Course saved successfully.' });
        });
    });

    // '/v1/course' - READ courses.
    api.get('/', (req, res) => {
        // Get everything.
        Course.find({}, (err, courses) => {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    });

    // '/v1/course/:id' - READ 1.
    api.get('/:id', (req, res) => {
        Course.find(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            res.json(course);
        });
    });

    return api;
}