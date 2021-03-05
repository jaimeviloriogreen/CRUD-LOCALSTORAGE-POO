'use strict'
// Products
class Products{
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
// Global Variables
class Variables{
    constructor(container, product, form, result, tableResults){
        this.container = [];
        this.product = {};
        this.form = document.mainForm;
        this.result = document.querySelector('.tableBody');
        this.tableResults = document.querySelector(".tableResults");
    }
}  
// Instance of Global Variables
const vars = new Variables();

// User Interface 
class UserInterface{
// Save products
    static saveProduct(){
        localStorage.setItem('data', JSON.stringify(vars.container));
    }
// Get and Show products
    static getProduct(){
        vars.result.innerHTML = '';
        vars.container = JSON.parse(localStorage.getItem('data'));

        if(vars.container === null){
            vars.container = [];
            vars.tableResults.setAttribute("hidden", "hidden")
        }else{
            for(let i of vars.container){
                vars.tableResults.removeAttribute("hidden");
                vars.result.innerHTML+= 
            `
                 <tr>
                        <td>${i.name}</td>
                        <td>${i.price}</td>
                        <td>${i.quantity}</td>
                        <td class="action">
                            <i class="far fa-trash-alt delete"></i>
                            <i class="far fa-edit edit"></i>
                        </td>
                </tr>
            
            `;
            }
        }
    }
// Delete products
    static deleteProduct(name, price, quantity){
        let index = 0;
        vars.container.forEach((elem, indx)=>{
            if(elem.name === name){
                if(elem.price === price){
                    if(elem.quantity === quantity){
                        index = indx;
                    }
                }
            }
        });

        vars.container.splice(index, 1);
        this.saveProduct();
    }
// Edit inputs values
    static editAction(name, price, quantity){
        vars.form.name.value = name;
        vars.form.price.value = price;
        vars.form.quantity.value = quantity;

        vars.form.submit.value = "Update";
        vars.form.submit.classList.remove("add");
        vars.form.submit.classList.add("update");
    }
// Edit and add prodtucts with new name...
    static editProduct(newName, newPrice, newQuantity){
        let index = vars.container.findIndex((container)=>{
            if(container.name === vars.product.name){
                if(container.price === vars.product.price){
                    if(container.quantity === vars.product.quantity){
                        return container.quantity === vars.product.quantity
                    }
                }
            }
        });

        vars.container[index].name = newName;
        vars.container[index].price = newPrice;
        vars.container[index].quantity = newQuantity;

        this.saveProduct();
        this.getProduct();
        
    }
}
// Exports
export{Products, vars, UserInterface}




   




