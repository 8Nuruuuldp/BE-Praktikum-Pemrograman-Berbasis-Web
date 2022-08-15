import express from "express";
import { PrismaClient } from "@prisma/client";


const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 8888;

app.get("/snack", async (req, res) => {
    try {
        const snack = await database.snack.findMany();
        if (!snack) throw new Error ("Snack Tidak Ada");
        res.send(snack);
    } catch (err) {
        res.send({ status:404, message: err.message });
    }
});

app.get("/snack/:id", async (req, res) => {
    try {
        const snack = await database.snack.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!snack) throw new Error ("Snack not found");

        res.send(snack);
    } catch (err) {
        res.send ({ status: 404, message: err.message });
    }
});

app.delete("/snack/delete", async (req, res) => {
    await database.snack.delete({
        where: {
            id: req.body.id,
        },
    });
    res.send({ message: "Delete Success" });
});

app.post("/snack/create", async (req, res) => {
    try {
        const snack = await database.snack.create({
            data: {
                name: req.body.name,
                company: req.body.company,
                year: req.body.year,
            },
        });
        res.send({ message: "Insert Success", data: snack});
    } catch (err) {}
});

app.put ("/snack/update/", async (req, res) => {
    try {
        const snack = await database.snack.update({
            where: {
                id: req.body.id,
            }, 
            data: {
                name: req.body.name,
                company: req.body.company,
                year: req.body.year,
            },
        });
        res.send ({ message: "Update Succes", data: snack});
    } catch (err) {}
});

app.listen(port, () => {
    console.log(`Server Running ${port}`);
});