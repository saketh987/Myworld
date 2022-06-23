  
//  create a special route to handle product reqs
    const { request } = require('express');
const { response } = require('express');
const exp = require('express');
    const productApp=exp.Router();
    
    // to find asychronus error
    const expressAsyncHandler=require('express-async-handler')

  // to extract body of request object
    productApp.use(exp.json());
  
  
  // product api routes



    // get all products
    productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
      // get productCollectionObject
      let productCollectionObject=request.app.get("productCollectionObject");
      // read all products
      let products=await productCollectionObject.find().toArray()
      // send response
      response.send({message:"All products",payload:products})
    }));




    // get products by id
    productApp.get("/getproduct/:id",expressAsyncHandler(async(request,response)=>{
       
      // get productCollectionObject
      let productCollectionObject=request.app.get("productCollectionObject");
      // get productId  from url param
      let pid=(+request.params.id);
      // get product by id
      let product=await productCollectionObject.findOne({productId:pid});
      // if product not existed with given id
      if(product==null)
      {
        response.send({message:'Product not existed'})
      }
      else{
        response.send({message:'Product existed',payload:product})
      }

    }));



    // // to create product
    // productApp.post('/create-product',(request,response)=>{

    //   // get productCollectionObject
    //   let productCollectionObject=request.app.get("productCollectionObject")
    //   // get products obj from reqp
    //   let productObj=request.body;
    //   // insert productObj
    //   productCollectionObject.insertOne(productObj,(err,result)=>{

    //     if(err)
    //     {
    //       console.log("err in creating product",err)
    //     }
    //     else{
    //       response.send({message:'Product created seccuessfully'})
    //     }
    //   })


      // console.log(request.body);


    //   //  creating product using promise
    //   productApp.post('/create-product',(request,response)=>{

    //     // get productCollectionObject
    //     let productCollectionObject=request.app.get("productCollectionObject")
    //     // get products obj from reqp
    //     let productObj=request.body;
    //     // insert productObj
    //     productCollectionObject.insertOne(productObj)
    //     .then(result=>response.send({message:'Product created succesfully'}))
    //     .catch(err=>console.log("err in creating product",err))
    // }) 




    //  create product with async n await
     productApp.post('/create-product',expressAsyncHandler(async(request,response,)=>{


      
      // get productCollectionObject
      let productCollectionObject=request.app.get("productCollectionObject")
      // get products obj from reqp
      let productObj=request.body;
      // insert productObj
      let result=await productCollectionObject.insertOne(productObj)
      // send response
      response.send({message:'Product created successfully'});

  }));




  // update product
  productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
    // get productCollectioObject
    let productCollectionObject=request.app.get("productCollectionObject");
    // get modified product obj
    let modifiedProduct=request.body;
    // update
    await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
    // send response
    response.send({message:"Product modified"})
  }));




  // delete product by id
  productApp.get("/remove-product/:id",expressAsyncHandler(async(request,response)=>{

    // get productCollectionObject
    let productCollectionObject = request.app.get("productCollectionObject");
    // write logic to delete product by its id
  }))

    // export productApp
    module.exports =productApp;
