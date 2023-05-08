const sequelize = require('../utils/connection');
const {createData, createDataCourse} = require('./createData/data');


const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await createData()
        await createDataCourse()
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();