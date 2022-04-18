const express = require('express');
const UserRouter = require('./routers/users');
const CategoryRouter = require('./routers/categories');
const PostsRouter = require('./routers/blogposts');

const app = express();
app.use(express.json());

app.use('/user', UserRouter);
app.use('/categories', CategoryRouter);
app.use('/post', PostsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
