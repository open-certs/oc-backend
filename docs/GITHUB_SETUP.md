# Github setup
1. First thing you need to go to [developer settings](https://github.com/settings/apps) directly or you can do it manually by :
	- In the upper-right corner of your github page, click your profile photo, then click **Settings**.
	- Scroll down until you find in the left bar **Developer Settings**
2. You will find in the left bar three options choose **OAuth apps**
3. Create new auth app by click on **New OAuth app**
4. It will take you to **Register a new OAuth application**
	- Application name : put any name you want or put ours **oc-backend** :wink:
	- Homepage URL : http://localhost:4000
	- Application description : you do not need to put or put any description if you wish
	- Authorization callback URL : http://localhost:4000/auth/github/callback
	- Click on **Register application**
	- It will take you to page where you find **Client ID** and you will click on **Generate a new client secret**
## Setup your `.env` file 
- Replace `XX` in `GITHUB_CLIENT_ID=XX` to **Client ID** we got it
- Replace `XX` in `GITHUB_CLIENT_SECRET=XX` to **Client secrets** we generated it
