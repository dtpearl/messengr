# messengr

## A web based Slack-like app built using React, Redux and Firebase.

## Link to messengr

The page is hosted [here](https://dtpearl.github.io/messengr) on GitHub.

This web version of a Slack-like messenger app. It uses a React Client and Firebase Server to recreate the extremely popular group messaging service. It integrates with Giphy's API to give it the GIF centered heart that is essential to any group chat service.

Users are authenticated through Firebase and messages can be text, personal uploaded images or GIFs from Giphy.

Other notable features:
- Automatically generated avatars for each user.
- Users can change their avatars by uploading their own image.
- Create new channels and specify the topic of each channel.
- Change the background colors for their own app page.

### Interesting learning experiences  

My main goal for this project was to gain a deeper understanding of React. I think I was successful in this and I am very happy with the end result.

I was very happy when I was successful in getting GIFs to be shared to Firebase without having to upload the individual GIFs. Since they are already online, storing them on Firebase would have been unnecessary. To achieve this I sent the GIF URL as a text message, then when a message is rendered I check if it is a GIF and display it as an image, using the GIF URL as the img src.



### Noteable Dependencies:

These were some of the dependencies required for this build.

- firebase
- mime-types
- react-avatar-editor
- react-giphy-component 
- semantic-ui-css
- semantic-ui-react


## Future goal/plans

- Add the last essential piece to any messaging app, emojis.


## Link to the game

The page is hosted [here](https://dtpearl.github.io/messengr) on github.
