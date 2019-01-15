import mongoose from 'mongoose';
import { Router } from 'express';
import Course from '../model/course';
import Grade from '../model/grade';

export default({ config, db }) => {
    let api = Router();

    /// '/v1/grade/add/:id'
    /// CREATE operation to create a new grade for
    /// a particular course with an unique id
    api.post('/add/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            let newGrade = new Grade();
            newGrade.name = req.body.name;
            newGrade.grade = req.body.grade;
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

    /// '/v1/grade/:id'
    /// GET operation to read all grades for a 
    /// particular course with an unique id
    api.get('/:id', (req, res) => {
        Grade.find({ course: req.params.id }, (err, grades) => {
            if (err) {
                res.send(err);
            }
            res.json(grades);
        });
    });

    /// '/v1/grade/update/:id'
    /// UPDATE operation to update grade parameters
    /// for a particular course with an unique id
    api.put('/update/:id', (req, res) => {
        Grade.findById(req.params.id, (err, grade) => {
            if (err) {
                res.send(err);
            }
            grade.name = req.body.name;
            grade.grade = req.body.grade;
            grade.weight = req.body.weight;
            grade.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Grade information updated." });
            });
        });
    });

    /// '/v1/grade/delete/:id'
    /// DELETE operation to delete a grade from
    /// a particular course with an unique id
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