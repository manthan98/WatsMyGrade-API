import mongoose from 'mongoose';
import { Router } from 'express';
import Course from '../model/course';
import Grade from '../model/grade';

export default({ config, db }) => {
    let api = Router();

    // '/v1/grade/add' - CREATE grade.
    api.post('/add/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            let newGrade = new Grade();
            newGrade.name = req.body.name;
            newGrade.mark = req.body.mark;
            newGrade.weight = req.body.weight;
            newGrade.course = course._id;
            newGrade.save((err, grade) => {
                if (err) {
                    res.send(err);
                }
                course.grades.push(newGrade);
                course.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Grade saved successfully.' });
                });
            });
        });
    });

    // '/v1/grade/:id' - READ grades for a course.
    api.get('/:id', (req, res) => {
        Grade.find({ course: req.params.id }, (err, grades) => {
            if (err) {
                res.send(err);
            }
            res.json(grades);
        });
    });

    // '/v1/grade/update/:id' - UPDATE a course.
    api.put('/update/:id', (req, res) => {
        Grade.findById(req.params.id, (err, grade) => {
            if (err) {
                res.send(err);
            }
            grade.name = req.body.name;
            grade.mark = req.body.mark;
            grade.weight = req.body.weight;
            grade.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Grade information updated." });
            });
        });
    });

    // '/v1/grade/delete/:id' - DELETE a grade.
    api.delete('/delete/:id', (req, res) => {
        Grade.findByIdAndRemove(req.params.id, (err, grade) => {
            let response = {
                message: "Grade successfully removed.",
                id: grade._id
            };
            res.status(200).send(response);
        });
    });

    return api;
}