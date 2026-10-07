import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';

const processAddVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You are now volunteering for this project.');

    res.redirect(`/project/${projectId}`);
};

const processRemoveVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    await removeVolunteer(userId, projectId);

    req.flash('success', 'You are no longer volunteering for this project.');

    res.redirect(`/project/${projectId}`);
};

export {
    processAddVolunteer,
    processRemoveVolunteer
};