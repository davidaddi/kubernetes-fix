const express = require("express");
require("./models/db");
const cors = require("cors"); 
const BaseRouter = require("./routes/routes");

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.use(express.json());

app.get('/a', (req, res) => {
  res.send('Hello, World!');
});


app.use(BaseRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
