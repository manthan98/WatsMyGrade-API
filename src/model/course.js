import mongoose from 'mongoose';
import Grade from './grade';

let Schema = mongoose.Schema;
let CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    grade: Number,
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Course', CourseSchema);