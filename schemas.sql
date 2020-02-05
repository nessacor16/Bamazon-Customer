-- DROP DATABASE IF EXISTS bamazon_customersdb;
CREATE DATABASE bamazon_customersdb;

USE bamazon_customersdb;

CREATE TABLE available_item (
  id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(27) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Samsung", "Computers", "900.00", "749");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Apple 27 inc. iMac Pro", "Computers", "12498.00", "1500");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Microsoft Surface Studio", "Computers", "7498.00", "100");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Planewave L500 Direct Drive Mount", "Telescopes", "12499.99", "300");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Made 16 LX600 ACF", "Telescopes", "18999.99", "6");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Celestron NexStar", "Telescopes", "1199.37", "612");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Javascript Joke Programmer", "Electronics", "14.58", "471");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Computer Development Board", "Electronics", "68.95", "88");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Autism Speech Therapy", "Electronics", "21.82", "93");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Elliptical Machine Trainer", "Sports & Fitness", "439.93", "896");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Premium XL Yoga Mat", "Sports & Fitness", "199.95", "2000");

INSERT INTO available_item (product_name, department_name, price, stock_quantity)
VALUES ("Kinesis PERSONAL VISION", "Sports & Fitness", "22345.00", "54");

USE bamazon_customersdb;
SELECT * FROM available_item;

USE bamazon_customersdb;
SELECT id FROM available_item;







