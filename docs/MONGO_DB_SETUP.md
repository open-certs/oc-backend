
# Mongo_db setup

1. First thing you need to go to this url [mongo_db login](https://account.mongodb.com/account/login).

  

2. After login (or register in case you don't have account) there will be a page in top of it **Deploy a cloud database** with 3 options (Serverless - Dedicated - Shared) you will choose **Shared** option

  

3. Then you will find at the top of the page **create cluster**

  
4. After finishing you will wait from (1 - 3) minutes for the cluster to be created

  

5. Then he will ask you for **username** and **password** put whatever you want

  

6. In the ip address field put **0.0.0.0/0** to allow access from anywhere

  

7. Second thing he will ask you about **choose connection method** you will choose **connect you application option**

  

8. Then he will ask you about the **driver** choose **nodejs** and the **version**  **4 or late**

  

9. You will find this header **Add your connection string into your application code** you will copy the link in this header and paste it into our **MONGO_DB_URL** variable in your **.env** file

  

10. You should replace ~<password>~ in the url you got with the password you have chosen in the creation when you created the user (**password you choose in step 4**)

  

11. You will also change the **myFirstDatabase** in the same url with name of the app you have set it (in case you don't set name for the app it will be by default **Project 0**)

  

12. You have finished it :clap::clap::clap:

  

## Access collections

- Last thing if you want to see the collections of the database, after opening the mongodb website and choose the project name you are currently working on from the list in the top left corner, you will find the cluster opens, then choose **Browse Collections**