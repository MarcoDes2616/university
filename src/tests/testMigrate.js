const sequelize = require('../utils/connection');
const createData = require('./createData/data');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await createData()
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();