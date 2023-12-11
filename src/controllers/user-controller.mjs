import 'dotenv/config';
import { updateUser, getUser, updatePassword, removeUser, getAllUsers, adminUser } from '../models/user-model.mjs';

const putUser = async (req, res, next) => {
    console.log('putUser', req.body);
    const updatedUser = await updateUser(req.body);

    if (!updatedUser) {
        const error = new Error('no such user exists');
        error.status = 400;
        return next(error);
    }

    if (updatedUser.error) {
        const error = new Error(updatedUser.error);
        error.status = 400;
        return next(error);
    }

    try {
        const user = await getUser(req.body.user_id);
        console.log('putUser', user);
        res.json({message: 'updated successfully', user: user})
    } catch (e) {
        res.status(400).json({message: 'an error occurred'});
    }

};

const putPassword = async (req, res, next) => {
    console.log('putPassword', req.body);
    const updatedPswd = await updatePassword(req.body);

    if (!updatedPswd) {
        const error = new Error('no such user exists');
        error.status = 400;
        return next(error);
    }

    if (updatedPswd.error) {
        return res.status(400).json({error: updatedPswd.error});
    }

    try {
        res.json({message: 'password updated successfully'})
    } catch (e) {
        res.status(400).json({message: 'an error occurred'});
    }

};

const grantAdminPrivileges = async (req, res) => {
    console.log('grantAdminPrivileges');
    console.log(typeof req.body.user_level_id);
    const admin = await adminUser(req.params.id, req.body.user_level_id);

    if (!admin) {
        const error = new Error('no such user exists');
        error.status = 400;
        return next(error);
    }

    if (admin.error) {
        const error = new Error(admin.error);
        error.status = 400;
        return next(error);
    }

    try {
        const user = await getUser(req.params.id);
        console.log('grantAdminPrivileges', user);
        res.json({message: 'updated successfully', user: user})
    } catch (e) {
        res.status(400).json({message: 'an error occurred'});
    }
};


const deleteUser = async (req, res) => {
    console.log('deleteUser');
    const user = await getUser(req.params.id);
    if (user.user_id === parseInt(req.params.id)) {
        console.log('next: removeUser');
        const result = await removeUser(req.params.id);
        if (!result.error) {
            return res.status(204).json({message: "user deleted successfully"});
        } else {
            return res.status(404).json({message: 'an error occurred'});
        }
    } else {
        res.sendStatus(404).json({message: 'unauthorized'});
    }
};

const listUsers = async (req, res) => {
    console.log('listUsers');
    const users = await getAllUsers();
    if (!users.error) {
        console.log(users);
        return res.status(200).json({users: users});
    } else {
        return res.status(404).json({message: 'an error occurred'});
    }
}


export {putUser, putPassword, grantAdminPrivileges, deleteUser, listUsers};