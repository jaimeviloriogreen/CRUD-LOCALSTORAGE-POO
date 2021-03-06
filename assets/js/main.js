'use strict';
 import * as app from "/assets/js/app.js";

// Dom Loaded
document.addEventListener('DOMContentLoaded', app.UserInterface.getProduct);

// Dom Events
app.form.mainForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let name = app.form.nameValue;
    let price = app.form.priceValue;
    let quantity = app.form.quantityValue;

// Regular EXP 
    let regExpWord = /^([A-Za-zñÀ-ÿ]*)([A-Za-z])$/m;
    let regExpreNumber = /^[0-9]+[.,]?([0-9]+)?$/m;

    
    name = regExpWord.test(name) ? name : false;
    price = regExpreNumber.test(price) ? price : false;
    quantity = regExpreNumber.test(quantity) ? quantity : false;

    if(name && price && quantity){
        const products = new app.Products(name,price,quantity);

       if(app.form.submitValue === "Add"){
            app.container.push(products);
            
            app.UserInterface.saveProduct();
            app.UserInterface.getProduct();
            app.form.mainForm.reset();

       }else if(app.form.submitValue === "Update"){
           app.form.submit.classList.remove("update");
           app.form.submit.classList.add("add");

            app.form.submitValue = "Add";
            // We get new updated name, price anf quiantitu and send to editProduct Method
            app.UserInterface.editProduct(name, price, quantity);
            // Reset Form
            app.form.mainForm.reset();
       }
    }
// Validate incorrect inputs
    !name ? app.form.name.style.color="red" : app.form.name.style.color = "black";
    !price ? app.form.price.style.color="red" : app.form.price.style.color = "black";
    !quantity ? app.form.quantity.style.color="red" : app.form.quantity.style.color = "black";  
});

// Delete and Edit Actions
app.table.tableResults.addEventListener('click', (e)=>{
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
        
        
        app.form.name.style.color = "black";
        app.form.price.style.color = "black";
        app.form.quantity.style.color = "black";
        // Save product on Objects. Method editProduct use it.
        
        // New instance of products before editing
        const productBeforeEdit = new app.Products(name, price, quantity);

        // Edit inputs values
        app.UserInterface.editAction(name, price, quantity, productBeforeEdit);
    }
});












   

