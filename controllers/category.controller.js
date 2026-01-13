import Category from '../models/category.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendError, sendResponse } from '../utils/handleResponse.js';

export const addCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;
  if (!category_name) {
    return sendError(res, 400, 'Category name is required!');
  }

  const isExist = await Category.findOne({ where: { category_name } });
  if (isExist) {
    return sendError(res, 400, 'Category with this name is already exists!');
  }
  const category = await Category.create({ category_name });
  return sendResponse(res, 201, 'Category created successfully', category);
});
export const getCategories = asyncHandler(async(req,res)=>{
    const categories = await Category.findAll();
    console.log(categories,"categories")
    return sendResponse(res,200, "Categories fetched successfully", categories)
})
