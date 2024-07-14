const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const workerModel = require('../models/workerModel');


// To authenticate a user token in the database
const authentication = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.adminId);

        if(!user) {
            return res.status(400).json({
                message: 'Admin to authorize not found'
            })
        }

        const userToken = user.token

        if(!userToken) {
            return res.status(400).json({
                message: 'Token not found'
            })
        }
        if(!user.isAdmin) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action'
            })
        }

        await jwt.verify(userToken, process.env.JWT_SECRET, (err, payLoad) => {

            if (err) {
                return res.json(err.message)
            } else {
                req.user = payLoad
                next()
            }
        })

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
}


// To authenticate if a user is signed in

const authenticate = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.userId)

        if(!user) {
            return res.status(404).json({
                message: 'User to authorize not found'
            })
        }
        const userToken = user.token

        if(!userToken) {
            return res.status(400).json({
                message: 'No Authorization found'
            })
        }

        await jwt.verify(userToken, process.env.JWT_SECRET, (err, payLoad) => {

            if (err) {
                return res.status(401).json({
                   message: "Your session has timed out. Please log in again."
                });
            } else {
                req.user = payLoad
                next()
            }
        })

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(404).json({
                message: "Session timed-out."
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
}


// to check if user is an admin
// const checkUser = (req, res, next) => {
//     authentication(req, res, async () => {
//         const adminId = req.params.id
//         const user = await userModel.findById(adminId)
//         if(user.isAdmin || user.isSuperAdmin) {
//             next()
//         } else {
//             res.status(400).json({
//                 message: 'You are not authorized to perform this action'
//             })
//         }
//     })
// }


// Another method to authorize
const checkUser = (req, res, next) => {
    authentication(req, res, async () => {
        if(req.user.isAdmin || req.user.isSuperAdmin) {
            next()
        } else {
            res.status(400).json({
                message: 'You are not authorized to perform this action'
            })
        }
    })
}



// Super admin authorization
const superAuth = (req, res, next) => {
    authentication(req, res, async () => {
        if(req.user.isSuperAdmin) {
            next()
        } else {
            res.status(400).json({
                message: 'You are not authorized to perform this action'
            })
        }
    })
}

const authenticateLogout = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.userId);

        if (!user) {
            user = await workerModel.findById(req.params.userId);
        }

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const userToken = user.token;

        if (!userToken) {
            return res.status(400).json({
                message: 'User not logged in. Please log in and try again.'
            });
        }

        await jwt.verify(userToken, process.env.JWT_SECRET, (err, payLoad) => {
            if (err) {
                return res.status(401).json({
                    message: "Your session has timed out. Please log in again."
                });
            } else {
                req.user = payLoad;
                next();
            }
        });

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Your session has timed out. Please log in again."
            });
        }
        return res.status(500).json({
            message: error.message
        })
    }
};



module.exports = {
    checkUser,
    superAuth,
    authenticate,
    authentication,
    authenticateLogout
}