import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        RETURNING user_id, project_id;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rowCount > 0;
};

const getProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date,
            organization.name AS organization_name
        FROM project_volunteer
        INNER JOIN project
            ON project_volunteer.project_id = project.project_id
        INNER JOIN organization
            ON project.organization_id = organization.organization_id
        WHERE project_volunteer.user_id = $1
        ORDER BY project.date;
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
    const query = `
        SELECT user_id, project_id
        FROM project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getProjectsByUserId,
    isUserVolunteer
};