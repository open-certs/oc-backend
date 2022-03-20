# Mongo_db setup
1. first thing you need to go to this url [mongo_db login](https://account.mongodb.com/account/login) directly.

2. after login (or register incase you donot have account already) there will be page in top of it  **Deploy a cloud database** with 3 options (Serverless - Dedicated - Shared) you will choose **Shared**

3. then you find at the top of the page **create cluster**

4. after finishing you will wait from (1 - 3) minutes to create cluster  

5. then he will ask you for **username** and **password** put whatever you want 

6. in the ip address field put **0.0.0.0/0** to allow access from anywhere

7. second thing he will ask you about **choose connection method** you will choose **connect you application option**

8. then he will ask you about the **driver** choose **nodejs** and the **version** **4 or late**

9. you will find this header **Add your connection string into your application code** you will copy the link in this header and paste it into our **MONGO_DB_URL** variable in your **.env** file

10. you will change in the url you got  ~<password>~  with the password you have chosen in the creation of the user  (**password you choose in step 4**)

11. you will also change the **myFirstDatabase** in the same url with name of the app you have set it (incase you donot set name of the app it will be by default **Project 0**) 

12. you have finished it :clap::clap::clap:

## Access collections 
- last thing if you want to see the collections of the database, aftering opening the mongodb website and choose the project name you currently working on from the list in the top left corner, you will find the cluster opens, then choose **Browse Collections**