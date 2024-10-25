import server from './src';
const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log(`server started on port ${port}`);
});