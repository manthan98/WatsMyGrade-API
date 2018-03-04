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

    return api;
}