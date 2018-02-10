import mongoose from 'mongoose';
import User from './user';
import Grade from './grade';

let Schema = mongoose.Schema;
let CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    average: Number,
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', CourseSchema);