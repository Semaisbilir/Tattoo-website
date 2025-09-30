// import mongoose, { Schema } from 'mongoose'

// const QuizSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     notes: { type: String, required: false },

//     answers: {
//       ageRange: { type: String },
//       hasTattoos: { type: String },
//       bodyArea: { type: String },
//       reference: { type: String },
//       size: { type: String },
//       style: { type: String },
//       allergies: { type: String },
//       medications: { type: String },
//       medicalConditions: { type: String },
//       painTolerance: { type: String },
//       recentSunExposure: { type: String }
//     },

//     status: {
//       type: String,
//       enum: ['pending', 'reviewed'],
//       default: 'pending'
//     }
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)

import mongoose, { Document } from "mongoose";

// Define TypeScript interface for a Quiz document
export interface IQuiz extends Document {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    answers: {
        ageRange?: string;
        hasTattoos?: string;
        bodyArea?: string;
        reference?: string;
        size?: string;
        style?: string;
        allergies?: string;
        medications?: string;
        medicalConditions?: string;
        painTolerance?: string;
        recentSunExposure?: string;
    };
    status: "pending" | "reviewed";
    createdAt: Date;
    updatedAt: Date;
}

const QuizSchema = new mongoose.Schema<IQuiz>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },

        answers: {
            ageRange: { type: String },
            hasTattoos: { type: String },
            bodyArea: { type: String },
            reference: { type: String },
            size: { type: String },
            style: { type: String },
            allergies: { type: String },
            medications: { type: String },
            medicalConditions: { type: String },
            painTolerance: { type: String },
            recentSunExposure: { type: String },
        },

        status: {
            type: String,
            enum: ["pending", "reviewed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);
