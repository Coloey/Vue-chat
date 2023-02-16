-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db_01
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` text,
  `class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (3,'Coloey','$2a$10$lwfaedXq3vVlHjsmLC3TUOCJxM5G6gcVqJVj3yyEf2qyDRl3GuCOu','qiqi','123456@qq.com','https://pic3.zhimg.com/80/v2-93091834844364ab73fd617db4685210_720w.jpg?source=1940ef5c','20计算机类1班'),(9,'ZhangSan','$2a$10$B42DfBKcrtoCRXzXmw28DO94FT4p39HN2Ai9Evf5WfDwu7gsmjuHW','sansan','12342qq.com','https://th.bing.com/th/id/OIP.nxZmCO48sYgZ6oYmSNb8mQAAAA?pid=ImgDet&rs=1','19工业设计1班'),(12,'LiSi','$2a$10$50el9vR2Z3eWOP.bWDsng.00ejT3iKCC8zyhxr67Rz/EX.kxBaT8a','sisi','12352qqcom','https://pic.qqtn.com/up/2017-8/2017081811060478140.png','19中文2班'),(14,'XiaoQi','$2a$10$rr4BZQZjrioLbhSblCObL.YUAW9x0T5peHEkU8QNuvyR53VOIayn2','友人A','453134@qq.com','https://tse4-mm.cn.bing.net/th/id/OIP-C.hQiXejEJByTQtKTPP1vHTQAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.25&pid=1.7','19软工3班'),(15,'LiChun','$2a$10$Rn8PbB.zRJqjlUquZClN4O4MA2kJiWjkHoHFj61/75kyBzjktN7R6','chunchun','123456@163.com','https://th.bing.com/th/id/R.abbdb67aba35717ee863e4bdc107f54e?rik=2GcMDYD8MoYfjA&pid=ImgRaw&r=0&sres=1&sresct=1','19大数据1班');
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 23:17:37
