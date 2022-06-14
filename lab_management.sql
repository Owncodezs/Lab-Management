-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2022 at 05:32 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `dbmanagement_login`
--

CREATE TABLE `dbmanagement_login` (
  `user_id` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `type` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dbmanagement_login`
--

INSERT INTO `dbmanagement_login` (`user_id`, `pass`, `type`) VALUES
('daniel@gmail.com', '123', 'labincharge'),
('kalidas@gmail.com', '123', 'labincharge'),
('mani@gmail.com', '123', 'admin'),
('ram@gmail.com', '123', 'labincharge');

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `l_lab_id` varchar(10) NOT NULL,
  `l_type` varchar(25) NOT NULL,
  `l_capacty` int(100) NOT NULL,
  `l_description` text NOT NULL,
  `staff_name` varchar(30) NOT NULL,
  `staff_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`l_lab_id`, `l_type`, `l_capacty`, `l_description`, `staff_name`, `staff_id`) VALUES
('cc1', 'compuer lab', 25, 'i6 processer\r\n8GB RAM\r\n', '', 'daniel@gmail.com'),
('cc2', 'IOT', 30, 'i9 processer\r\n8GB RAM\r\n', '', 'ram');

-- --------------------------------------------------------

--
-- Table structure for table `lab_log`
--

CREATE TABLE `lab_log` (
  `reg_id` varchar(30) NOT NULL,
  `u_id` varchar(30) NOT NULL,
  `u_type` varchar(30) NOT NULL,
  `lab_from_time` datetime NOT NULL,
  `lab_to_time` datetime NOT NULL,
  `status` varchar(10) NOT NULL,
  `lab_id` varchar(30) NOT NULL,
  `r_date` datetime NOT NULL DEFAULT current_timestamp(),
  `no_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lab_log`
--

INSERT INTO `lab_log` (`reg_id`, `u_id`, `u_type`, `lab_from_time`, `lab_to_time`, `status`, `lab_id`, `r_date`, `no_user`) VALUES
('r003', 'karthi@gmail.com', 'student', '2022-06-06 12:30:00', '2022-06-06 15:30:00', '', '003', '2022-06-02 12:58:56', 20),
('r002', 'jack@gmail.com', 'faculty', '2022-06-05 18:07:00', '2022-06-14 03:03:00', '', '002', '2022-06-05 12:05:51', 10),
('', 'karthi@gmail.com', 'student', '2022-06-14 10:30:00', '2022-06-14 12:30:00', '', '004', '2022-06-12 22:20:00', 20);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `reg_mail_id` varchar(30) NOT NULL,
  `reg_lab_id` varchar(10) NOT NULL,
  `f_time` datetime NOT NULL,
  `t_time` datetime NOT NULL,
  `reg_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`reg_mail_id`, `reg_lab_id`, `f_time`, `t_time`, `reg_date`) VALUES
('jack@gmail.com', '001', '2022-05-29 16:12:08', '2022-05-29 16:12:08', '2022-05-02'),
('mani@gmil.com', '001', '2022-05-29 16:12:08', '2022-05-29 16:12:08', '2022-05-04');

-- --------------------------------------------------------

--
-- Table structure for table `staff_information`
--

CREATE TABLE `staff_information` (
  `staff_id` varchar(30) NOT NULL,
  `staff_name` varchar(30) NOT NULL,
  `dep` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff_information`
--

INSERT INTO `staff_information` (`staff_id`, `staff_name`, `dep`) VALUES
('daniel@gmail.com', 'daniel', 'it'),
('kalidas@gmail.com', 'kalidas', 'it'),
('mani@gmail.com', 'mani', 'it'),
('ram@gmail.com', 'ram', 'it');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` varchar(30) NOT NULL,
  `u_type` varchar(30) NOT NULL,
  `u_pass` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `phone` int(20) NOT NULL,
  `u_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_type`, `u_pass`, `phone`, `u_name`) VALUES
('jack@gmail.com', 'faculty', '123', 123456789, 'jack'),
('karthi@gmail.com', 'student', '123', 987654321, 'karthi'),
('mahesh@gmail.com', 'student', '123', 2147483647, 'mahesh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dbmanagement_login`
--
ALTER TABLE `dbmanagement_login`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`l_lab_id`);

--
-- Indexes for table `lab_log`
--
ALTER TABLE `lab_log`
  ADD PRIMARY KEY (`r_date`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD KEY `test` (`reg_lab_id`),
  ADD KEY `test2` (`reg_mail_id`);

--
-- Indexes for table `staff_information`
--
ALTER TABLE `staff_information`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dbmanagement_login`
--
ALTER TABLE `dbmanagement_login`
  ADD CONSTRAINT `dbmanagement` FOREIGN KEY (`user_id`) REFERENCES `staff_information` (`staff_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
