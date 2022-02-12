const pool = require("../Database/posgressConnector");

exports.getNumberById = async (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.addNumber = (request, response) => {
  const { number, countryCallingCode, gender, city } = request.body;

  pool.query(
    "INSERT INTO users (number , countryCallingCode , gender , city) VALUES ($1, $2, $3, $4)",
    [number, countryCallingCode, gender, city],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

exports.updateNumber = (request, response) => {
  const id = parseInt(request.params.id);
  const { number, countryCallingCode, gender, city } = request.body;

  pool.query(
    "UPDATE users SET number = $1, countryCallingCode = $2, gender = $3, city = $4 WHERE id = $5",
    [number, countryCallingCode, gender, city, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

exports.deleteNumber = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
