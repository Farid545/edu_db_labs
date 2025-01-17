# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:

- SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`content` (
  `idContent` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idContent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`contentanalysistask`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contentanalysistask` (
  `idContentAnalysisTask` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `deadline` DATETIME NOT NULL,
  `analyst` VARCHAR(45) NOT NULL,
  `ContentId` INT NOT NULL,
  PRIMARY KEY (`idContentAnalysisTask`),
  INDEX `fk_ContentAnalysisTask_Content1_idx` (`ContentId` ASC) ,
  CONSTRAINT `fk_ContentAnalysisTask_Content1`
    FOREIGN KEY (`ContentId`)
    REFERENCES `mydb`.`content` (`idContent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `picture` MEDIUMBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`member` (
  `idMember` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `ContentId` INT NOT NULL,
  PRIMARY KEY (`idMember`),
  INDEX `fk_Member_User_idx` (`UserId` ASC),
  INDEX `fk_Member_Content1_idx` (`ContentId` ASC),
  CONSTRAINT `fk_Member_Content1`
    FOREIGN KEY (`ContentId`)
    REFERENCES `mydb`.`content` (`idContent`),
  CONSTRAINT `fk_Member_User`
    FOREIGN KEY (`UserId`)
    REFERENCES `mydb`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`paymentdata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`paymentdata` (
  `idPaymentData` INT NOT NULL AUTO_INCREMENT,
  `cardNumber` INT NOT NULL,
  `cardExpireDate` DATETIME NOT NULL,
  `cardCVV` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `ContentId` INT NOT NULL,
  PRIMARY KEY (`idPaymentData`),
  INDEX `fk_PaymentData_Content1_idx` (`ContentId` ASC),
  CONSTRAINT `fk_PaymentData_Content1`
    FOREIGN KEY (`ContentId`)
    REFERENCES `mydb`.`content` (`idContent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `rate` INT NOT NULL,
  `ContentId` INT NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_Review_Content1_idx` (`ContentId` ASC),
  CONSTRAINT `fk_Review_Content1`
    FOREIGN KEY (`ContentId`)
    REFERENCES `mydb`.`content` (`idContent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `user` VALUES (1,'Alex','alexe@gmail.com','admin','142569',NULL),
(2,'Stas','stas@gmail.com','user','123789',NULL),
(3,'Farid','farid@gmail.com','user','741963',NULL),
(4,'Anastasia','Anastasia@gmail.com','user','145236',NULL),
(5,'Danya','danya@gmail.com','user','478569',NULL);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними

```js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to add a new item to the 'content' table
async function addItem(title, description, status) {
  const query = 'INSERT INTO content (title, description, status) VALUES (?, ?, ?)';
  const values = [title, description, status];

  try {
    const [result] = await connection.promise().execute(query, values);
    return result.insertId; // Return the ID of the newly inserted item
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
}

// Function to remove an item from the 'content' table by ID
async function removeItem(idContent) {
  const query = 'DELETE FROM content WHERE idContent = ?';

  try {
    const [result] = await connection.promise().execute(query, [idContent]);
    return result.affectedRows > 0; // Return true if a row was deleted
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
}

// Function to update an item in the 'content' table by ID
async function updateItem(idContent, title, description, status) {
  const query = 'UPDATE content SET title = ?, description = ?, status = ? WHERE idContent = ?';
  const values = [title, description, status, idContent];

  try {
    const [result] = await connection.promise().execute(query, values);
    return result.affectedRows > 0; // Return true if a row was updated
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
}

// Function to get all items from the 'content' table
async function getAllItems() {
  const query = 'SELECT * FROM content';

  try {
    const [rows] = await connection.promise().query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

async function getItemById(idContent) {
    const query = 'SELECT * FROM content WHERE idContent = ?';

    try {
      const [rows] = await connection.promise().query(query, [idContent]);
      return rows[0]; // Return the first (and only) row
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      throw error;
    }
  }

app.post('/getbyid', async (req, res) => {
const { idContent } = req.body;

try {
    const item = await getItemById(idContent);
    res.json(item);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.post('/add', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newItemId = await addItem(title, description, status);
    res.json({ success: true, idContent: newItemId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/remove', async (req, res) => {
  const { idContent } = req.body;

  try {
    const itemRemoved = await removeItem(idContent);
    res.json({ success: itemRemoved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/update', async (req, res) => {
  const { idContent, title, description, status } = req.body;

  try {
    const itemUpdated = await updateItem(idContent, title, description, status);
    res.json({ success: itemUpdated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/show', async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.on('close', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    } else {
      console.log('MySQL connection closed');
    }
  });
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

process.on('SIGINT', () => {
  app.emit('close');
  process.exit(0);
});
```
