import mongoose from 'mongoose';
import Course from './course';

let Schema = mongoose.Schema;
let TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);