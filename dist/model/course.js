'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _grade = require('./grade');

var _grade2 = _interopRequireDefault(_grade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var CourseSchema = new Schema({
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

module.exports = _mongoose2.default.model('Course', CourseSchema);
//# sourceMappingURL=course.js.map