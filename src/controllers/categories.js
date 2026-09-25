// Import any needed model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    addCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.name;

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');

    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;

    const newCategory = await addCategory(name);

    req.flash('success', 'Category created successfully.');

    res.redirect(`/category/${newCategory.category_id}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    const updatedCategory = await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully.');

    res.redirect(`/category/${updatedCategory.category_id}`);
};

const categoryValidation = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim().length < 3 || name.trim().length > 100) {
        req.flash('error', 'Category name must be between 3 and 100 characters.');

        if (req.params.id) {
            return res.redirect(`/edit-category/${req.params.id}`);
        }

        return res.redirect('/new-category');
    }

    next();
};

// Export any controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};
