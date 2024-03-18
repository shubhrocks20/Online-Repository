import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['cpp', 'java', 'js', 'python'],
      default: 'cpp'
    },
    stdin: {
      type: String,
      
    },
    sourceCode: {
      type: String,
    },
    codeOutput: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
export default mongoose.model('Submission', submissionSchema);