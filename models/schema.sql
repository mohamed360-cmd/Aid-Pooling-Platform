CREATE DATABASE myAid;
USE myAid;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Organization_Email VARCHAR(255) UNIQUE NOT NULL,
    Organization_Name  VARCHAR(255) NOT NULL,
    Organization_PhoneNumber VARCHAR(20) NOT NULL,
    Password VARCHAR(1000) NOT NULL,
    Account_Type VARCHAR(254)
);

CREATE TABLE sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    User_id INT,
    FOREIGN KEY (User_id) REFERENCES users(id)
);
CREATE TABLE Donations(
    id INT PRIMARY KEY AUTO_INCREMENT,
    Doner_Id Int,
    Doner_Email VARCHAR(254) ,
    Doner_Phonenumber INT,
    Donation_Type VARCHAR(254),
    Donation_Description VARCHAR(5000),
    Donation_Amount VARCHAR (255),
    Expiration_Date DATE,
    Dontaion_Pickup_Location VARCHAR(500),
    FOREIGN KEY (Doner_Id) REFERENCES users(id),
    Donation_Availability VARCHAR(10)
);
