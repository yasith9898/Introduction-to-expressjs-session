import Category from "../models/category.js"
import {isAdminValid} from "./userControllers.js"
export function createCategory(req,res){

  if(req.user == null){
    res.status(401).json({
      message : "Unauthorized"
    })
    return
  }
  if(req.user.type != "admin"){
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }
  const newCategory = new Category(req.body)
  newCategory.save().then(
    (result)=>{

      res.json(
        {
          message : "Category created successfully",
          result : result
        }
      )
    }
  ).catch(
    (err)=>{

      res.json(
        {
          message : "Category creation failed",
          error : err
        }
      )
    }
  )

}

//delete category
export function deleteCategory(req,res){
  if(req.user == null){
    res.status(401).json({
      message : "Unauthorized"
    })
    return
  }
  if(req.user.type != "admin"){
    res.status(403).json({
      message : "Forbidden"
    })
    return
  }
  const name = req.params.name
  Category.findOneAndDelete({name:name}).then(
    ()=>{
      res.json(
        {
          message : "Category deleted successfully"
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Category deletion failed"
        }
      )
    }
  )
  
}
export function getCategory(req,res){
  Category.find().then(
    (result)=>{
      res.json(
        {
          categories : result 
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Failed to get categories"
        }
      )
    }
  )
}

export function getCategoryByName(req,res){
  const name = req.params.name;
  Category.findOne({name:name}).then(

    (result)=>{

      if(result == null){
        res.json(
          {
            message : "Category not found"
          }
        )
      }else{
        res.json(
          {
            category : result
          }
        )
      }
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Failed to get category"
        })
    }
  )
}
export function updateCategory(req,res){  

  if(!isAdminValid(req)){
    res.status(403).json({
      message : "Unauthorized"
    })
    return
  }

  const name = req.params.name;

  Category.updateOne({name : name},req.body).then(
    ()=>{
    res.json({
      message : "Category updated successfully"
    })
  }).catch(
    ()=>{
      res.json({
        message : "Failed to update category"
      })
    }
  )
}


