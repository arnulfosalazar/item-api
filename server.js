async function main() {
    const express = require("express");
    const app = express();

    app.use(express.json());
    
    const PORT = 3000;
    
    const items = [
        {
            id: 1,
            name: "Iron Sword",
            damage: 25
        },
        {
            id: 2,
            name: "Wooden Bow",
            damage: 10
        }
    ];
    
    
    app.get("/items", function (req, res) {
        res.send(items);
    });
    
    app.get("/items/:id", function (req, res) {
        const id = Number(req.params.id);
        const item = items.find(item => item.id === id);
        if(item === undefined){
            return res.status(404).send("Item not found");
        }

        res.send(item);
    });

    app.get("/items/:id/damage", function (req, res) {
        const id = Number(req.params.id);
        const item = items.find(item => item.id === id);
        if(item === undefined){
            return res.status(404).send("Item not found");
        }

        res.send({
            damage: item.damage
        });
    });

    app.post("/items", function (req, res) {
        const newItem = {
            id: items.length + 1,
            name: req.body.name,
            damage: req.body.damage
        };

        items.push(newItem);

        console.log(req.body);
        res.status(201).send(newItem);

    });

    app.put("/items/:id", function (req, res) { //function for updating items
        const id = Number(req.params.id);        //change data types from url
        const item = items.find(item => item.id === id); //looks through array to find same id
        if(item === undefined){             //checks if the item id exists
            return res.status(404).send("Item not found");
        }

        item.name = req.body.name; //updates item name with name from request
        item.damage = req.body.damage; //updates item damage with damage from request

        res.send(item);
    });

    app.delete("/items/:id", function(req, res) {
        const id = Number(req.params.id);
        const index = items.findIndex(item => item.id === id);
        if(index === -1){
            return res.status(404).send("Item not found");
        }

        items.splice(index, 1);

        res.status(200).send("Item deleted");
    });

    app.listen(PORT);
}

main();