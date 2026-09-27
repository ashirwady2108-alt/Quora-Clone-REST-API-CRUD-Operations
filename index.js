const express=require("express");
const app=express();
const port=8080;
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

let posts=[
    {   id:uuidv4(),
        username:"apnacollege",
        content:"I love coding!"

    },
    {   id:uuidv4(),
        username:"Shadow",
        content:"I am the strongest "
    },
    {   id:uuidv4(),
        username:"Lufyy",
        content:"king of pirates"
    }
]
const path=require("path");
app.listen(port,()=>{
    console.log("listening to port : 8080");
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts });
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")

});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs",{post});

});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) => id===p.id);
    post.content=newContent;
    console.log(post);

    
    res.send("patch request working ");
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});

})
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    
    res.redirect("/posts");

    


})


