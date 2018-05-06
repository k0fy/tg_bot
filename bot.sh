if [ $# -eq 1 ]
then
  case $1 in
    start)
      echo "START BOT" > log
      node main.js >> log 2>error &
      echo $! > PID
    ;;
    
    stop)
      kill -9 $(cat PID) && rm PID
      echo "STOOP BOT" >> LOG
    ;;
    *)
      echo "bot.sh [start|stop]"
  esac
else
  echo "bot.sh [start|stop]"
fi
