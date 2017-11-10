CREATE TABLE IF NOT EXISTS `docs` (
  `id` int(6) unsigned NOT NULL,
  `rev` int(3) unsigned NOT NULL,
  `content` varchar(200) NOT NULL,
  PRIMARY KEY (`id`,`rev`)
) DEFAULT CHARSET=utf8;

INSERT INTO `docs` (`id`, `rev`, `content`) VALUES
  ('1', '1', 'The earth is flat'),
  ('2', '1', 'One hundred angels can dance on the head of a pin'),
  ('1', '2', 'The earth is flat and rests on a bull\'s horn'),
  ('1', '3', 'The earth is like a ball.');
