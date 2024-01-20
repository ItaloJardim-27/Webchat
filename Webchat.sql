CREATE DATABASE webchat

GO
USE webchat

GO
CREATE TABLE tblusers (
id int primary key identity,
name varchar(50),
chat_password varchar(50)
)

INSERT tblusers values 
('Teste', '12345')


SELECT * from tblusers

--DELETE FROM tblusers WHERE name like 'Teste2'