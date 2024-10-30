import app from './src/app.js';
import constant from './src/config/constant.js';
import process from 'node:process';
import connection from './src/config/database.js';

//Setup Timezone 
process.env.TZ = "America/Tijuana";

connection()

//Start Server
app.listen(constant.PORT, () => {
    console.log(`Server On, Port: ${constant.PORT}`);
});

//Out Server 
process.on('exit', () => {
    console.log(`Server Off`);
});

