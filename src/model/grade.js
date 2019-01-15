import mongoose from 'mongoose';
import Course from './course';

let Schema = mongoose.Schema;
let GradeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

module.exports = mongoose.model('Grade', GradeSchema);