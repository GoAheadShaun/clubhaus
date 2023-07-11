CREATE DATABASE SocialClub;
USE SocialClub;

-- Create the User Table
CREATE TABLE User (
  UserID VARCHAR(255) PRIMARY KEY,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Password VARCHAR(255)
);

-- Create the Manager Table
CREATE TABLE Manager (
  ManagerID VARCHAR(255) PRIMARY KEY,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  ClubID INT REFERENCES Club(ClubID),
  Password VARCHAR(255)
);

-- Create the Admin Table
CREATE TABLE Admin (
  AdminID VARCHAR(255) PRIMARY KEY,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Password VARCHAR(255)
);

-- Create the Club Table
CREATE TABLE Club (
  ClubID INT PRIMARY KEY AUTO_INCREMENT,
  ClubName VARCHAR(255),
  ClubDescription TEXT,
  ClubImage VARCHAR(255),
  Category VARCHAR(255)
);

-- Create the Membership Table
CREATE TABLE Membership (
  UserID VARCHAR(255) REFERENCES User(UserID),
  ClubID INT REFERENCES Club(ClubID),
  PRIMARY KEY (UserID, ClubID),
  JoinDate DATETIME
);

CREATE TABLE NotificationPreference (
  UserID VARCHAR(255) REFERENCES User(UserID),
  ClubID INT REFERENCES Club(ClubID),
  ReceiveEmails BOOLEAN,
  PRIMARY KEY (UserID, ClubID)
);
CREATE TABLE RSVP (
  UserID VARCHAR(255) REFERENCES User(UserID),
  EventID INT REFERENCES Event(EventID),
  PRIMARY KEY (UserID, EventID),
  JoinDate DATETIME
);

-- Create the Event Table
CREATE TABLE Event (
  EventID INT PRIMARY KEY AUTO_INCREMENT,
  ClubID INT REFERENCES Club(ClubID),
  EventName VARCHAR(255),
  EventDate DATE,
  EventTime TIME,
  EventLocation VARCHAR(255),
  EventShortDescription TEXT,
  EventLongDescription TEXT,
  EventImageURL VARCHAR(255),
  Tense VARCHAR(255)
);
-- Create the Join Request Table
CREATE TABLE JoinRequest (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  UserID VARCHAR(255) REFERENCES User(UserID),
  ClubID INT REFERENCES Club(ClubID),
  EventID INT REFERENCES Event(EventID),
  Status VARCHAR(255),
  Timestamp DATETIME,
  RequestType VARCHAR(255)
);

-- Create the Notification Table
CREATE TABLE Notification (
  NotificationID INT PRIMARY KEY AUTO_INCREMENT,
  UserID VARCHAR(255) REFERENCES User(UserID),
  Message TEXT,
  Timestamp DATETIME,
  ClubID INT REFERENCES Club(ClubID),
  ManagerID INT REFERENCES Manager(ManagerID)
);
