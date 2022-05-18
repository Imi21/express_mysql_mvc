const express = require("express");
const router = express.Router();
const app = express();
const port = 3000
const db = require('./config/database.js')

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  


    

    app.get('/createdb',(req,res)=>{

        let sql ='CREATE DATABASE laMovidaDB';
        db.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send('Database de la movida funciona...')
        })
        });


        app.get('/createtable',(req,res)=>{

            let sql = 'CREATE TABLE categories(id int AUTO_INCREMENT,family VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id))'
            db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('Posts table created...')
            })
            });
            
        app.get('/createtableproducts',(req,res)=>{

            let sql = 'CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255),category_id INT, PRIMARY KEY(id),FOREIGN KEY(category_id) REFERENCES categories(id))'
            db.query(sql,(err,result)=> {
            if(err) throw err;
            res.send('Posts table created...')
            })
            });


        app.get('/newproduct',(req,res)=>{

            let sql = 'INSERT INTO products(name, description) values ( "bombra presion", "sist.direccion",)'
            db.query(sql,(err,result)=> {
             if(err) throw err;
             console.log(result);
             res.send('producto nuevo creadito güey.')
             })
             });


        app.get('/newcategory',(req,res)=>{

            let sql = 'INSERT INTO categories(family, type) values ( "movilidad", "sist.automotriz")'
            db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('creamos una category parsero.')
            })
            });     


            
        app.put('/productchanges/:id',(req,res)=>{

            let newName = req.body.name;
            let newDescription = req.body.description

            let sql = `UPDATE products SET name = '${newName}', description = '${newDescription}' WHERE id = ${req.params.id}`;

            db.query(sql, (err,result)=> {
                if(err) throw err;
                res.send('Post updated...')
            })
            });
            
            

        app.put('/categorychanges/:id',(req,res)=>{

            let newFamily = req.body.family;
            let newType = req.body.type;
                
            let sql = `UPDATE categories SET family = '${newFamily}' WHERE id = ${req.params.id}`;
            let sql2 = `UPDATE categories SET type = '${newType}' WHERE id = ${req.params.id}`;
    
            db.query(sql, (err,result)=> {
                if(err) throw err;
                res.send('Post categor updated...')
            })
            db.query(sql2, (err,result)=> {
                if(err) throw err;
                res.send('Post categor updated 2...')
            })
            });    


    app.get('/showproducts',(req,res)=> {

        let sql = 'SELECT * FROM products';   
        db.query(sql,(err,result)=> {   
        if(err) throw err;   
        res.send(result)   
        })    
        });

    app.get('/showcategories',(req,res)=> {

        let sql = 'SELECT * FROM categories';   
        db.query(sql,(err,result)=> {   
        if(err) throw err;   
        res.send(result)   
        })    
        });   
        
        
    app.get('/showall',(req,res)=> {

        let sql = 'SELECT * FROM products INNER JOIN categories ON products.category_id = categories.id';   
        db.query(sql,(err,result)=> {   
        if(err) throw err;   
        res.send(result)   
        })    
        });     


        app.get('/showbyid/:id',(req,res)=>{

            let sql = `SELECT * FROM products WHERE products.id = ${req.params.id};`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          });



          app.get("/showall/des", (req, res) => {
            let sql = `SELECT * FROM products ORDER BY id DESC;`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          });



          app.get("/showcategory/:id", (req, res) => {
            let sql = `SELECT * FROM category 
          WHERE category.id= ${req.params.id}`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          });


          app.get("/searchproduct/:name", (req, res) => {
            let sql = `SELECT * FROM products 
          WHERE products.name= ${req.params.name}`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          });



          app.get('/deleteproduct/:id',(req,res)=>{

            let sql = `DELETE * FROM products WHERE products.id = ${req.params.id};`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          });
            
          

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          
        })