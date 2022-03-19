# Bitbucket setup
1. First thing you need to do is to create a **New Workspace**.
2. Go to the **Settings**(on the left panel of the window) of the above created workspace.
3. Scroll down to see **OAuth Consumers**. Click on **Add Consumer** button. 
4. It will take you to **Add OAuth Consumer**
	- Name : put any name you want or put ours **oc-backend** :wink:
    - Callback URL : http://localhost:4000/auth/bitbucket/callback
	- URL : http://localhost:4000
	- Application description : you do not need to put or put any description if you wish.
    - Privacy policy URL and End user license agreement URL can be left blank.
    - Permisions
        - Account
            - Email
            - Read
        - Projects
            - Read
        - Repositories
            - Read
        - Pull Requests
            - Read
5. Click on **Save** button.
6. After clicking save you will find a row with the Name you specified in the above form. Click on it to view the **Key** and **Secret**.

## Setup your `.env` file 
- Replace `XX` in `BITBUCKET_CLIENT_ID=XX` to **Key** we got.
- Replace `XX` in `BITBUCKET_CLIENT_SECRET=XX` to **Secret** we got.
