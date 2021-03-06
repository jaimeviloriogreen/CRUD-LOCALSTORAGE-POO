'use strict';
// Global Variables
let container = [];

// Products
class Products{
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
// Form
class MainForm{
    constructor(){
        this.mainForm = document.mainForm;
        this.name = this.mainForm.name;
        this.price = this.mainForm.price;
        this.quantity = this.mainForm.quantity;
        this.submit = this.mainForm.submit;
    }
    // Name
    get nameValue(){
        return this.name.value;
    }
    set nameValue(value){
        this.name.value = value;
    }
    // Price
    get priceValue(){
        return this.price.value;
    }
    set priceValue(value){
        this.price.value = value;
    }
    // Quantity
    get quantityValue(){
        return this.quantity.value;
    }
    set quantityValue(value){
        this.quantity.value = value;
    }
    // Submit Input
    get submitValue(){
        return this.submit.value;
    }
    set submitValue(value){
        this.submit.value = value;
    }
}

// Instance Form
const form = new MainForm();

// Table
class Table{
    constructor(){
        this.tableBody = document.querySelector('.tableBody');
        this.tableResults = document.querySelector(".tableResults");
    }
}
// Instance of Table
const table = new Table();

// User Interface 
class UserInterface{
    // Get and Set Product before edit 
    static get productBeforeEdit(){
        return this.product;
    }
    static set productBeforeEdit(value){
        this.product = value;
    }
    // Save products
    static saveProduct(){
        localStorage.setItem('data', JSON.stringify(container));
    }
    // Get and Show products
    static getProduct(){
        table.tableBody.innerHTML = '';
        container = JSON.parse(localStorage.getItem('data'));

        if(container === null){
            container = [];
            table.tableResults.setAttribute("hidden", "hidden")
        }else{
            for(let i of container){
                table.tableResults.removeAttribute("hidden");
                table.tableBody.innerHTML+= 
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
        container.forEach((elem, indx)=>{
            if(elem.name === name){
                if(elem.price === price){
                    if(elem.quantity === quantity){
                        index = indx;
                    }
                }
            }
        });

        container.splice(index, 1);
        this.saveProduct();
    }
// Edit inputs values
    static editAction(name, price, quantity, productBeforeEdit){
        form.nameValue = name;
        form.priceValue = price;
        form.quantityValue = quantity;

        // Recieve Object with the product before editing
        this.productBeforeEdit = productBeforeEdit;
        
        form.submitValue = "Update";
        form.submit.classList.remove("add");
        form.submit.classList.add("update");
    }
    // Edit and add prodtucts with new name...
    static editProduct(newName, newPrice, newQuantity){
        //  get index of edit product    
        let index = container.findIndex((container)=>{
            if(container.name === this.productBeforeEdit.name){
                if(container.price === this.productBeforeEdit.price){
                    if(container.quantity === this.productBeforeEdit.quantity){
                        return container.quantity === this.productBeforeEdit.quantity
                    }
                }
            }
        });

        // Update container with new product
        container[index].name = newName;
        container[index].price = newPrice;
        container[index].quantity = newQuantity;

        this.saveProduct();
        this.getProduct();
        
    }
}
// Exports
export{Products, container, UserInterface, form, table}




   




