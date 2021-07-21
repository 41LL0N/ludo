const App = require("./apps/web-app");
const mongoose = require("mongoose");

(async () => {
await mongoose.connect("mongodb+srv://admin:eschooladmin@cluster0.poe1m.mongodb.net/main-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
})

    await new App().listen(process.env.PORT || 8080);
    console.log("Connected to the server. Website is operational!")
})();
