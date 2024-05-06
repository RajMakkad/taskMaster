const env = import.meta.env;

console.log(env);
export const serverIp = env.VITE_SERVER_IP || "localhost";
export const serverPort = env.VITE_SERVER_PORT || "5000";
export const endpoint = `http://${serverIp}:${serverPort}/api`;
export const api = {
    list: `${endpoint}/getAllTodos`,
    update: `${endpoint}/updateTodo`,
    create: `${endpoint}/createTodo`,
    delete: `${endpoint}/deleteTodo`
}

// Below code does not work to export variables in react.
// module.exports = {
//     serverIp,
//     serverPort,
//     endpoint,
//     api
// }