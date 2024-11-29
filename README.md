## Role Based Authentication System

### Key Features
- there are two role of users **user** ad **admin**
- at time of signup user can choose role
- to manage role system store one key rolein database 
- to make login system system use JWT tokens and role based middleware to maage role based access


## Demo (Postman testing)

### Sign-up
- path : /api/user/signup
- Request
- ![Screenshot from 2024-11-29 19-15-51](https://github.com/user-attachments/assets/4d9caf97-fe37-42e0-b89d-a51031312cc1)
- Response
- ![image](https://github.com/user-attachments/assets/d530bf10-0ebd-4e90-bd6d-2a99c4dabd8c)

### login
- path : /api/user/login
- Request
- ![Screenshot from 2024-11-29 19-18-19](https://github.com/user-attachments/assets/e0333a36-727a-4873-abc9-ea3b2fbcb8c0)
- Response
- ![image](https://github.com/user-attachments/assets/357b461f-f04b-48b2-91c4-c5d67e061203)

### admin route access by user
- description : this route is used for admin to change any users role to admin
- path : /api/user/edit/role/{userId}
- Request 
- ![image](https://github.com/user-attachments/assets/14079cc8-16bc-4ba0-8c89-0804ddc5fdd9)
- Response
- ![image](https://github.com/user-attachments/assets/0816962a-7540-40ec-ab5b-9dfd7ea0e32c)

### admin acess admin route
- path: /api/user/edit/role/{userId}
- description : to change any user's role to admin but can not change admin role even if user is admin
- Request
- ![image](https://github.com/user-attachments/assets/2c550fa2-ed60-4ad2-b40d-78931cd3eec7)
- Response
- ![image](https://github.com/user-attachments/assets/fbb45b7c-526b-48cf-8aaf-b344571a10bd)
