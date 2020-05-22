/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 8.0.17 : Database - beer2go
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`beer2go` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `beer2go`;

/*Table structure for table `friends` */

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=big5;

/*Data for the table `friends` */

insert  into `friends`(`id`,`user_id`,`friend_id`) values 
(1,6,7),
(2,6,8),
(3,7,6),
(4,7,8),
(5,8,6),
(6,8,7);

/*Table structure for table `inventory` */

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `is_empty` tinyint(1) DEFAULT '0',
  `date_stored` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=big5;

/*Data for the table `inventory` */

insert  into `inventory`(`id`,`user_id`,`item_id`,`store_id`,`is_empty`,`date_stored`) values 
(1,6,3,1,0,'2017-01-10 15:20:59'),
(2,6,4,1,0,'2017-01-10 15:21:48'),
(3,7,16,2,0,'2017-01-10 15:22:25'),
(4,7,17,2,0,'2017-01-10 15:22:31'),
(5,8,5,1,0,'2017-01-10 15:22:49'),
(6,8,6,1,0,'2017-01-10 15:22:52'),
(7,8,3,1,0,'2017-01-10 15:22:59'),
(8,8,16,2,0,'2017-01-10 15:23:04');

/*Table structure for table `items` */

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `brand` varchar(250) DEFAULT NULL,
  `qty` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=big5;

/*Data for the table `items` */

insert  into `items`(`id`,`store_id`,`name`,`brand`,`qty`) values 
(1,1,'Quarter Cask','LAPHROAIG',100),
(2,1,'Triple Wood','LAPHROAIG',100),
(3,1,'18 years old','LAPHROAIG',100),
(4,1,'Chivas 12','Chivas Regal',100),
(5,1,'Chivas 18 Gold Signature','Chivas Regal',100),
(6,1,'Chivas Aged 25 years','Chivas Regal',100),
(7,1,'Sherry Oak','Macallan',100),
(8,1,'Double Cask','Macallan',100),
(9,1,'The 1824 Collection','Macallan',100),
(10,2,'Quarter Cask','LAPHROAIG',100),
(11,2,'Triple Wood','LAPHROAIG',100),
(12,2,'18 years old','LAPHROAIG',100),
(13,2,'Chivas 12','Chivas Regal',100),
(14,2,'Chivas 18 Gold Signature','Chivas Regal',100),
(15,2,'Chivas Aged 25 years','Chivas Regal',100),
(16,2,'Sherry Oak','Macallan',100),
(17,2,'Double Cask','Macallan',100),
(18,2,'The 1824 Collection','Macallan',100),
(19,3,'Quarter Cask','LAPHROAIG',100),
(20,3,'Triple Wood','LAPHROAIG',100),
(21,3,'18 years old','LAPHROAIG',100),
(22,3,'Chivas 12','Chivas Regal',100),
(23,3,'Chivas 18 Gold Signature','Chivas Regal',100),
(24,3,'Chivas Aged 25 years','Chivas Regal',100),
(25,3,'Sherry Oak','Macallan',100),
(26,3,'Double Cask','Macallan',100),
(27,3,'The 1824 Collection','Macallan',100),
(28,4,'Quarter Cask','LAPHROAIG',100),
(29,4,'Triple Wood','LAPHROAIG',100),
(30,4,'18 years old','LAPHROAIG',100),
(31,4,'Chivas 12','Chivas Regal',100),
(32,4,'Chivas 18 Gold Signature','Chivas Regal',100),
(33,4,'Chivas Aged 25 years','Chivas Regal',100),
(34,4,'Sherry Oak','Macallan',100),
(35,4,'Double Cask','Macallan',100),
(36,4,'The 1824 Collection','Macallan',100);

/*Table structure for table `stores` */

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT '',
  `address` varchar(250) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_USERID` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=big5;

/*Data for the table `stores` */

insert  into `stores`(`id`,`user_id`,`name`,`address`,`contact`,`logo`) values 
(1,2,'Hard Rock Cafe',' Level 3 and 4, Glorietta 3, Ayala Center, Makati City','+63 2 893 4661-4',NULL),
(2,3,'Blue Onion Bar','28 Jupiter Street, Bel-air Village, Makati City','+63 2 899 1658',NULL),
(3,4,'Cafe Havana','1903 M Adriatico, Malate, Manila','+63 2 521 8097',NULL),
(4,5,'70s Bistro','46 Anonas Street, Project 2, Quezon City','+63 917 825 6078',NULL);

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL,
  `inventory_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `user_confirm_flag` tinyint(1) DEFAULT '0',
  `user_confirm_Date` datetime DEFAULT NULL,
  `store_confirm_flag` tinyint(1) DEFAULT '0',
  `store_confirm_date` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=big5;

/*Data for the table `transactions` */

insert  into `transactions`(`id`,`user_id`,`friend_id`,`inventory_id`,`store_id`,`user_confirm_flag`,`user_confirm_Date`,`store_confirm_flag`,`store_confirm_date`,`date_created`) values 
(1,6,7,2,2,1,'2017-01-11 02:02:56',0,NULL,'2017-01-10 22:53:53'),
(2,6,7,1,2,0,NULL,1,'2017-01-11 02:03:33','2017-01-11 00:18:53'),
(3,6,8,2,2,1,'2017-01-11 02:03:05',0,NULL,'2017-01-11 01:44:47'),
(4,6,8,1,2,0,NULL,0,NULL,'2017-01-11 01:46:47');

/*Table structure for table `user_msg` */

DROP TABLE IF EXISTS `user_msg`;

CREATE TABLE `user_msg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(11) DEFAULT NULL,
  `to_id` int(11) DEFAULT NULL,
  `message` text,
  `seen_flag` tinyint(1) DEFAULT '0',
  `date_read` datetime DEFAULT NULL,
  `date_received` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=big5;

/*Data for the table `user_msg` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(16) NOT NULL,
  `full_name` varchar(250) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1 = ADMIN\n2 = USER\n3 = STORE',
  `photo` varchar(250) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=big5;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`full_name`,`type`,`photo`,`date_created`) values 
(1,'admin@gmail.com','password','Administrator',1,'ken.jpg','2017-01-09 12:45:41'),
(2,'hardrock@gmail.com','password','Hard Rock Cafe',2,'hardrock.jpg','2017-01-10 14:47:33'),
(3,'blueonion@gmail.com','password','Blue Onion Bar',2,'blueonion.jpg','2017-01-10 14:48:02'),
(4,'cafehavana@gmail.com','password','Cafe Havana',2,'cafehavana.jpg','2017-01-10 14:48:29'),
(5,'bistro70@gmail.com','password','70s Bistro',2,'bistro70.jpg','2017-01-10 14:48:59'),
(6,'ken@gmail.com','password','Kenster',2,'kenster.jpg','2017-01-10 15:17:40'),
(7,'mike@gmail.com','password','Mike Dionisio',2,'mike.jpg','2017-01-10 15:18:05'),
(8,'henry@gmail.com','password','Henry Aguda',2,'henry.jpg','2017-01-10 15:18:19'),
(9,'juan@gmail.com','password','Juan',2,'juan.jpg','2017-01-11 01:51:57');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
