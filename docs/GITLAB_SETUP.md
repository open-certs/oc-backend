# Gitlab setup

1. In the top-right corner, select your avatar (where your photo/ profile is).

2. Select Edit profile or use link- https://gitlab.com/-/profile.

3. On the left sidebar, select Applications.

4. It'll take you to a page to enter some details.

    - Enter a Name (oc-backend or anything you like :)), 
    - Enter Redirect URI : http://localhost:4000/auth/gitlab/callback
      - The Redirect URI is the URL where users are sent after they authorize with GitLab, 
    - Check Confidential and Expire access token and 
    - For OAuth 2 scopes select the `read_api` checkbox.

5. Select Save application. GitLab provides:

  - The OAuth 2 Client ID in the Application ID field.
  - The OAuth 2 Client Secret, accessible using the Copy button on the Secret field 

## Setup your `.env` file 

- Replace `XX` in `GITLAB_CLIENT_ID=XX` to **Client ID** we got it
- Replace `XX` in `GITLAB_CLIENT_SECRET=XX` to **Client secrets** we generated it
