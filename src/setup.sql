-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT project_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

INSERT INTO project (organization_id, title, description, location, date)
VALUES
(1, 'Community Park Renovation', 'Renovation of a local community park with sustainable materials.', 'Central Community Park', '2026-10-05'),
(1, 'Neighborhood Playground Project', 'Construction of a safe and accessible playground for children.', 'Northside Neighborhood', '2026-10-12'),
(1, 'Community Center Improvements', 'Improving the facilities and accessibility of a local community center.', 'West Community Center', '2026-10-19'),
(1, 'Sustainable Housing Workshop', 'A workshop teaching sustainable construction techniques to volunteers.', 'BrightFuture Training Center', '2026-10-26'),
(1, 'Public Garden Construction', 'Building a community garden using environmentally friendly construction methods.', 'Eastside Neighborhood', '2026-11-02'),

(2, 'Community Vegetable Garden', 'Creating a vegetable garden to provide fresh produce for local families.', 'Downtown Community Garden', '2026-10-07'),
(2, 'Urban Farming Workshop', 'Teaching residents how to grow food in small urban spaces.', 'GreenHarvest Learning Center', '2026-10-14'),
(2, 'School Garden Program', 'Creating a garden where students can learn about food production and sustainability.', 'Lincoln Elementary School', '2026-10-21'),
(2, 'Neighborhood Composting Project', 'Teaching residents how to compost organic household waste.', 'Southside Neighborhood', '2026-10-28'),
(2, 'Food Sustainability Fair', 'A community event focused on sustainable food production and healthy eating.', 'City Community Plaza', '2026-11-04'),

(3, 'Food Drive', 'Collecting food donations for families in need in the local community.', 'UnityServe Community Center', '2026-10-09'),
(3, 'Senior Center Assistance', 'Volunteers will help with activities and services at a local senior center.', 'Sunrise Senior Center', '2026-10-16'),
(3, 'Community Cleanup', 'Organizing volunteers to clean public spaces and neighborhood streets.', 'Riverside Neighborhood', '2026-10-23'),
(3, 'Charity Clothing Drive', 'Collecting and distributing clothing donations to families in need.', 'UnityServe Donation Center', '2026-10-30'),
(3, 'Holiday Volunteer Event', 'A volunteer event supporting local families during the holiday season.', 'Community Outreach Center', '2026-11-06');

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Project Category Junction Table
-- ========================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT project_category_pk
        PRIMARY KEY (project_id, category_id),

    CONSTRAINT project_category_project_fk
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT project_category_category_fk
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service');

-- ========================================
-- Associate Projects with Categories
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(2, 3),
(3, 3),
(4, 2),
(5, 1),
(6, 1),
(7, 2),
(8, 2),
(9, 1),
(10, 1),
(11, 3),
(12, 3),
(13, 1),
(14, 3),
(15, 3);