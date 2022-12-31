select 'This is a comment' AS '';
CREATE TABLE IF NOT EXISTS `userInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `picName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- GRANT ALL PRIVILEGES ON *.* TO root@127.0.0.1 IDENTIFIED BY 'root' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO root@localhost IDENTIFIED BY 'root' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO root@host.docker.internal IDENTIFIED BY 'root' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

select 'This is a finnnnnnnnish' AS '';