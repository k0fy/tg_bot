#!/bin/bash

##
info1_2(){
  # by jlgb
  echo "    __   "
  echo " __ )( $1"
  echo " )((__) $2"
  echo "(_')(    "
  echo "  (__)   "
  echo
}

info1_2 "telegram" "Bot"

if [ $# -eq 1 ]
then
  case $1 in
    start)
      if [ ! -e PID ]
      then
        echo "+++START BOT+++" > log
        node main.js >> log 2>error &
        echo $! > PID

        echo "The bot is starting.."

      else
        echo "The bot is already running"
      fi
    ;;
    
    stop)
      if [ ! -e PID ]
      then
        echo "The bot is not running"
      else
        echo "The bot is stoping..."
        kill -9 $(cat PID)
        echo "+++STOP BOT+++" >> log
        rm PID
      fi
    ;;
    info)
      if [ -e PID ]
      then
        echo 'Telegram Bot PID: ' $(cat PID)
        ps -uax | grep [m]ain.js

      else
      echo 'Telegram Bot is not running'
      fi
    ;;
    *)
      echo "bot.sh [start|stop|info]"
  esac

else
  echo "bot.sh [start|stop|info]"
fi
