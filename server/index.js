const express = require("express");
const cors = require("cors");
/* const todoRouter = require('./services/todo') */
const todoRouter = require("./routes/todo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use('/', router) */
app.use("/", todoRouter);

const port = 3001;

app.use((err, req, res, next) => {
  const statusCode = err.StatusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ error: err.message });
  return;
});

app.get("/", async function (req, res) {
  try {
    /* const connection = await mysql.createConnection(config.db)
        const [result,] = await connection.execute('select * from task') */
    /* const result = await db.query('select  * from task') */
    const result = await todo.getAllTasks();
    if (!result) result = []; //If there is no data, return empty array
    res.status(200).json(result);
  } catch (err) {
    // Return status code 500 and error message to the client
    res.status(500).json({ error: err.message });
  }
});

app.post("/new", async function (req, res) {
  try {
    /* const connection = await mysql.createConnection(config.db) */
    /* const [result,] = await connection.execute('insert into task (description) values (?)', [req.body.description]) */
    const result = await todo.addTask(req.body);
    res.status(200).json({ id: result.id });
  } catch (err) {
    // Return status code 500 and error message to the client
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delete/:id", async function (req, res) {
  try {
    /* const connection = await mysql.createConnection(config.db) */
    // Excute prepared statement
    /* await connection.execute('delete from task where id = ? ', [req.params.id]) */
    await todo.removeTask(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port);
