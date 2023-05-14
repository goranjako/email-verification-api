import http from 'http';
import app from './app';
import dotenv from "dotenv";
dotenv.config();
/**
 * Get port from environment and store in Express.
 */
const port = process.env.port||3000;
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const start = () => {
	try {
	  server.listen(port, () => {
		console.log(`Api up and running at: http://localhost:`+ port);
	  });
	} catch (error) {
	  console.error(error);
	  process.exit();
	}
  };
  start();