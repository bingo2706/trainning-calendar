# TRAINING CALENDAR
### CÀI ĐẶT
### Cài đặt bằng Docker
Bước 1: Mở terminal tại folder docker trong source code

Bước 2: Build image bằng Docker compose
```
docker compose -p training-calendar up -d

```
Bước 3: Sau khi build xong image sẽ tự động run container

Bước 4: Sau khi start được xong tất cả container thì khởi tạo table cho cơ sở dữ liệu
- Mở terminal trên máy tính và gõ câu lệnh sau
```
docker exec -it <id_container or name_container> npx sequelize-cli db:migrate

```
- Ví dụ container name training-calendar-backend-1
```
docker exec -it training-calendar-backend-1 npx sequelize-cli db:migrate

```
Result như bên dưới là thành công
```
Sequelize CLI [Node: 14.21.3, CLI: 6.6.2, ORM: 6.37.1]

Loaded configuration file "src/config/config.js".
Using environment "development".
== migration-create-excercises: migrating =======
== migration-create-excercises: migrated (0.047s)

== migration-create-trainingSession: migrating =======
== migration-create-trainingSession: migrated (0.027s)
```
Bước 5: Truy cập đường dẫn trang web để chạy

```
http://localhost:3000/

```
