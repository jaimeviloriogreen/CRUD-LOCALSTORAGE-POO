'use strict';
 import * as app from "/assets/js/app.js";

// Dom Loaded
document.addEventListener('DOMContentLoaded', app.UserInterface.getProduct);

// Dom Events
app.vars.form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let name = app.vars.form.name.value;
    let price = app.vars.form.price.value;
    let quantity = app.vars.form.quantity.value;

// Regular EXP 
    let regExpWord = /^([A-Za-zñÀ-ÿ]*)([A-Za-z])$/m;
    let regExpreNumber = /^[0-9]+[.,]?([0-9]+)?$/m;

    
    name = regExpWord.test(name) ? name : false;
    price = regExpreNumber.test(price) ? price : false;
    quantity = regExpreNumber.test(quantity) ? quantity : false;

    if(name && price && quantity){
        const products = new app.Products(name,price,quantity);

       if(app.vars.form.submit.value === "Add"){
            app.vars.container.push(products);
            app.UserInterface.saveProduct();

            app.UserInterface.getProduct();
        
            app.vars.form.reset();

       }else if(app.vars.form.submit.value === "Update"){
           app.vars.form.submit.classList.remove("update");
           app.vars.form.submit.classList.add("add");

            app.vars.form.submit.value = "Add";
            app.UserInterface.editProduct(name, price, quantity);
            app.vars.form.reset();
       }
    }
// Validate incorrect inputs
    !name ? app.vars.form.name.style.color="red" : app.vars.form.name.style.color = "black";
    !price ? app.vars.form.price.style.color="red" : app.vars.form.price.style.color = "black";
    !quantity ? app.vars.form.quantity.style.color="red" : app.vars.form.quantity.style.color = "black";  
});

// Delete and Edit Actions
app.vars.tableResults.addEventListener('click', (e)=>{
// Delete Boton
    if(e.target.classList.contains("delete")){
        const name = e.target.parentElement.parentElement.children[0].textContent;
        const price = e.target.parentElement.parentElement.children[1].textContent;
        const quantity = e.target.parentElement.parentElement.children[2].textContent;
        
        app.UserInterface.deleteProduct(name, price, quantity);
        e.target.parentElement.parentElement.remove()
    }
// Edit Boton
    if(e.target.classList.contains("edit")){
        const name = e.target.parentElement.parentElement.children[0].textContent;
        const price = e.target.parentElement.parentElement.children[1].textContent;
        const quantity = e.target.parentElement.parentElement.children[2].textContent;

        app.vars.form.name.style.color = "black";
        app.vars.form.price.style.color = "black";
        app.vars.form.quantity.style.color = "black";
        
        app.vars.product = {name:name, price:price, quantity:quantity};
        app.UserInterface.editAction(name, price, quantity);
    }
});













   

