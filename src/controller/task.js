import mongoose from 'mongoose';
import { Router } from 'express';
import Course from '../model/course';
import Task from '../model/task';

export default({ config, db }) => {
    let api = Router();

    // '/v1/task/add/:id' - CREATE task.
    api.post('/add/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            let newTask = new Task();
            newTask.name = req.body.name;
            newTask.priority = req.body.priority;
            newTask.course = course._id;
            newTask.save((err, task) => {
                if (err) {
                    res.send(err);
                }
                course.tasks.push(newTask);
                course.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Task saved successfully.' });
                });
            });
        });
    });

    // '/v1/task/:id' - GET tasks.
    api.get('/:id', (req, res) => {
        Task.find({ course: req.params.id }, (err, tasks) => {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    });

    return api;
}