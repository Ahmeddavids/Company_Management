require('./config/dbConfig');
const cors = require('cors');
const morgan = require("morgan");
const express = require('express');
const PORT = process.env.PORT || 2021;
const userRouter = require('./routers/userRouter');
const workerRouter = require('./routers/workerRouter');
const taskRouter = require('./routers/taskRouter');

const app = express();
app.use(cors({origin: "*"}));

app.use(morgan("dev"))
app.use(express.json());

app.use('/api', userRouter)
app.use('/api/employee', workerRouter)
app.use('/api/task', taskRouter)

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})