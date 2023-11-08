#! /bin/bash -


if [[ "$1" = "--install-node" ]];then
  ./install_node.bash
  printf "\n____________________________"
else
  printf "\nInstall Node.js?  y/n >>"
  read install
  if [[ "$install" = "y" ]];then
    ./install_node.bash
  else
    printf "Skipping.."
  fi
fi


printf "\nInstalling node dependencies.."
npm install .
printf "\n____________________________"

printf "\nCreating systemd service.."
sudo cp discordipbot.service /etc/systemd/system/
sudo systemctl enable discordipbot.service

str='DISCORD_TAKBOT_TOKEN="<botToken_here>"'
str+=$'\nDISCORD_TAKBOT_IP_CHANNEL_ID="<channelId_here>"'
str+=$'\nDISCORD_TAKBOT_SERVER_NAME="<serverName_here>"\n'

echo "$str" >> .env

printf "Project .env file has been"
printf "\ninitialized. Open the file and insert your values"
printf "\nwhere indicated.\n\n"

cat .env

printf "Exiting.."
