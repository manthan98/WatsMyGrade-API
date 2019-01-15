import mongoose from 'mongoose';
import { Router } from 'express';
import Course from '../model/course';
import Task from '../model/task';

export default({ config, db }) => {
    let api = Router();

    /// '/v1/task/add/:id'
    /// CREATE operation to create a new task for
    /// a particular course with an unique id
    api.post('/add/:id', (req, res) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.send(err);
            }
            let newTask = new Task();
            newTask.name = req.body.name;
            newTask.priority = req.body.priority;
            newTask.date = req.body.date;
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

    /// '/v1/task/:id'
    /// GET operation to read all tasks for a 
    /// particular course with an unique id
    api.get('/:id', (req, res) => {
        Task.find({ course: req.params.id }, (err, tasks) => {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    });

    /// '/v1/task/update/:id'
    /// UPDATE operation to update task parameters
    /// for a particular course with an unique id
    api.put('/update/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                res.send(err);
            }
            task.name = req.body.name;
            task.priority = req.body.priority;
            task.date = req.body.date;
            task.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Task information updated.' });
            });
        });
    });

    /// '/v1/task/delete/:id'
    /// DELETE operation to delete a grade from
    /// a particular course with an unique id
    api.delete('/delete/:id', (req, res) => {
        Task.findByIdAndRemove(req.params.id, (err, task) => {
            let response = {
                message: "Task successfully removed.",
                id: task._id
            };
            res.status(200).send(response);
        });
    });

    return api;
}