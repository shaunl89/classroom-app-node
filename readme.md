
# Setup
### Create database
```
mysql -u root -p

CREATE DATABASE classroomapp

npm install sequelize-cli -g
```

### sequelize-cli commands used
```
sequelize init
sequelize model:generate --name Teacher --attributes email:string
sequelize model:generate --name Student --attributes email:string,suspended:boolean
sequelize model:generate --name TeachersStudents --attributes teacherId:integer,studentId:integer

sequelize seed:generate --name demo-teacher
sequelize seed:generate --name demo-student
sequelize seed:generate --name demo-teachers-students

sequelize db:seed:all

sequelize db:migrate
```

### Postman collections
https://www.getpostman.com/collections/c97a0169d3cff451ded6