import express from "express";

const app = express();
const port = 1337;

app.get("/", (request_, response_) => {
	response_.send("Hello World!");
});

app.get("/api/todos", (request_, response_) => {
	response_.json([
		{ id: 1, name: "clean room" },
		{ id: 2, name: "clean room" },
	]);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
