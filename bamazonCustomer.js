// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Powerwisdom16!",
  database: "bamazon_customersdb"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err);
  }
  loadListedProducts();
});

// Function to load the products table from the database and print results to the console
function loadListedProducts() {
    // Selects all of the data from the MySQL products table
    connection.query("SELECT * FROM available_item", function(err, res) {
      if (err) throw err;
  
      // Draw the table in the terminal using the response
      console.table(res);
  
      // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
      promptUserForId();
    });
  }

  // promptUserForId will prompt the user for the item/quantity they would like to purchase
function promptUserForId() {
	// console.log('___ENTER promptUserForId___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the Item ID which you would like to purchase. [Quit with Q]',
			validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need? [Quit with Q]',
			validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
		}
	]).then(function(input) {
		// console.log('Customer has selected: \n    id = '  + input.id + '\n    quantity = ' + input.quantity);
        checkIfShouldExit(input.quantity);
        checkIfShouldExit(input.id);
		var item = input.id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM available_item WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				loadListedProducts();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Your order is now being processed!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE available_item SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('You have successfully completed your oder transaction, and your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						loadListedProducts();
					})
				} else {
					console.log('Unfortunately, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					loadListedProducts();
				}
			}
		})
	})
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(input) {
    if (input.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Thanks for visiting, and think of us again for your next shopping experience!");
      process.exit(0);
    }
  }
  