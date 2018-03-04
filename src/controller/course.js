import mongoose from 'mongoose';
import { Router } from 'express';
import Course from '../model/course';
import Grade from '../model/grade';

export default({ config, db }) => {
    let api = Router();

    // '/v1/course/add' - CREATE course.
    api.post('/add', (req, res) => {
        let newCourse = new Course();
        newCourse.title = req.body.title;
        newCourse.credits = req.body.credits;
        newCourse.code = req.body.code;
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

    // '/v1/course/update/:id' - UPDATE course.
    api.put('/update/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            course.title = req.body.title;
            course.credits = req.body.credits;
            course.code = req.body.code;
            course.average = req.body.average;
            course.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Course information updated.' });
            });
        });
    });

    // '/v1/course/:id' - DELETE a course.
    api.delete('/delete/:id', (req, res) => {
        Course.findByIdAndRemove(req.params.id, (err, course) => {
            let response = {
                message: "Course successfully removed",
                id: course._id
            };
            res.status(200).send(response);
        });
    });

    return api;
}