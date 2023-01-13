import mongoose from 'mongoose';

import { IUser } from '@utilities/types';

const userSchema = new mongoose.Schema<IUser>(
    {
        profile: {
            username: {
                type: String,
                required: true
            },
            preferredName: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: null
            },
            email: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                default: ''
            },
            occupation: {
                type: String,
                default: ''
            },
            gender: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            avatar: {
                type: String,
                default: ''
            },
            background: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: "Pending",
                required: true,
            },
            expiredIn: {
                type: Date,
                default: Date.now,
                expires: 600
            },
            biography: {
                summary: {
                    type: String,
                    default: ''
                },
                about: {
                    type: String,
                    default: ''
                },
                hashtag: {
                    type: Array<String>,
                    default: []
                },
                topics: {
                    type: Array<String>,
                    default: []
                },
                skills: {
                    type: Array<String>,
                    default: []
                },
                languages: {
                    type: Array<String>,
                    default: []
                },
            },
            socialMedia: {
                twitter: {
                    type: String,
                    default: ''
                },
                linkedin: {
                    type: String,
                    default: ''
                },
                facebook: {
                    type: String,
                    default: ''
                },
                youtube: {
                    type: String,
                    default: ''
                },
                instagram: {
                    type: String,
                    default: ''
                }
            }
        },
        discussions: {
            type: Array<mongoose.Schema.Types.ObjectId>,
            default: []
        },
        connections: {
            type: Array<mongoose.Schema.Types.ObjectId>,
            default: []
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', userSchema);