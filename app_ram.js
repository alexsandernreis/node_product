const express = require("express");
const { randomUUID } = require("crypto");

const app= express();
app.use(express.json());

const products = [];

//POST
app.post("/products", (reqs,resp) => {
    const {name, price } = reqs.body;

    const product = {
        id: randomUUID(),
        name,
        price
    }

    products.push(product);
    console.log(products);
    return resp.json({message: "Product sucessfully insert!",
                        products
    });
});

//GET ALL
app.get("/products", (reqs,resp) => {

    if(products.length > 0){
        return resp.json({message: "Products find!",
                          products
                        });
    }
    else {
        return resp.json({message: "Nothing data product!"});
    }

});

//GET ID
app.get("/products/:id", (reqs,resp) => {
    const { id } = reqs.params;
    const product = products.find((product) => product.id === id);

    if(product){
        return resp.json({message: "Product find for id!",
                            product
                        });
    }
    else {
        return resp.json({message: "Product not find for id!"});
    }
    
});

//POST FIND NAME
app.post("/products/name", (reqs,resp) => {
    const {name, price } = reqs.body;

    const product = {
        name,
        price
    }

    const productfind = products.filter((product) => product.name == name);
    if(productfind.length > 0){
        return resp.json({message: "Product sucessfully changed for Name!",
                            productfind
                        });
    }
    else {
        return resp.json({message: "Product not find for Name!",
                            name
                        });
    }
    
});

//PUT
app.put("/products/:id", (reqs,resp) => {
    const { id } = reqs.params;
    const {name, price } = reqs.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        id: id,
        name,
        price
    };

    const product = products.find((product) => product.id === id);
    if(productIndex > -1){
        return resp.json({message: "Product sucessfully changed!",
                            product
                        });
    }
    else {
        return resp.json({message: "Product not find!",
                            id
                        });
    }

});

//DELETE
app.delete("/products/:id", (reqs,resp) => {
    const { id } = reqs.params;
    const productIndex = products.findIndex((product) => product.id === id);

    const product = products.find((product) => product.id === id);

    products.splice(productIndex, 1);

    return resp.json({  message: "Product sucessfully deleted!",
                        product
                    });

});

app.listen(4002, () => console.log(`Loading port 4002`));