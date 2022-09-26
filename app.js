/**
 * This all purpose bot will help improve QOL within the app/website making users having an easier time throughout as well as quicker navigation
 * The following script will represent the commands and how the bot will operate throughout the server
 * 
 * @author (Anthony To)
 * @version (16/12/2019)
 */

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
         }
     }
});

public class Reminder { 
  
    private static Logger logger=Logger.getLogger(Reminder.class); 
     
    private final static long MIN_TO_MILLISEC = 1000*60; 
     
    SystemTray tray; 
    static long timeLeft; 
    static long delay = 5 * MIN_TO_MILLISEC; 
    static Task task; 
    static Timer timer; 
    static ActionListener reminderPerformer; 
    static GregorianCalendar now; 
    
    /**
     * constructor 
     * @param tray where the message will be shown 
     */ 
    public Reminder(SystemTray tray) { 
     this.tray = tray; 
     logger.debug("tray is initialized: " + tray!=null); 
     init(); 
     runReminder(); 
    } 
    
    /**initialize what the action will be when there is an action from the timer
     *  
     */ 
    public static void init() { 
     reminderPerformer = new ActionListener() { 
      @Override 
      public void actionPerformed(ActionEvent e) {     
       if(task.getImportant()) { 
        new AlarmFrame(task); 
       } 
       else { 
        UIController.showTrayMsg("Jot It Down!", task.getName() + " is starting at "  
          + task.getStart().formattedToString()); 
       } 
    
       task = null; 
       runReminder(); 
      } 
     }; 
    } 
    
    /**
     * update next hour 
     */ 
    private static void setUpdateNextHour() { 
     // TODO Auto-generated method stub 
     Timer autoRefresh = new Timer( 1000*60*60, new ActionListener(){ 
      @Override 
      public void actionPerformed(ActionEvent arg0) { 
       runReminder(); 
      } 
     }); 
     autoRefresh.setRepeats(false); 
     autoRefresh.start(); 
    } 
    
    /**
     * resetting reminder 
     */ 
    protected static void runReminder() { 
     // TODO Auto-generated method stub 
     now = new GregorianCalendar(); 
     task = findLatestTask(); 
     timeLeft = findTimeLeft(task); 
      
     if(timeLeft >= 0) 
      setTimer((int)timeLeft); 
     else 
      setUpdateNextHour(); 
    } 
    
    /**
     * set the timer delay 
     * @param timeLeft delayed time before the task starts 
     */ 
    private static void setTimer(int timeLeft) { 
     // TODO Auto-generated method stub 
     logger.debug("setTimer: " + timeLeft); 
      
     if(timer != null)  
      timer.stop(); 
    
     timer = new Timer(timeLeft, reminderPerformer); 
     timer.setRepeats(false); 
     timer.start(); 
    } 
    
    /**
     * find time left for the task to start 
     * @param task task that we want to find the time left 
     * @return time left in millisecond 
     */ 
    private static long findTimeLeft(Task task) { 
     if(task == null) 
      return -1; 
      
      
     long nextReminderMilli; 
     long nowMilli; 
     long timeDiff = -1; 
      
     if(task.getStart() != null) 
      nextReminderMilli = task.getStart().getTimeMilli(); 
     else 
      nextReminderMilli = task.getEnd().getTimeMilli(); 
      
     nowMilli = now.getTimeInMillis(); 
      
     /*
     logger.debug(nextReminderMilli); 
     logger.debug(nowMilli); 
     */ 
      
     timeDiff = nextReminderMilli - nowMilli - delay; 
       
     //logger.debug("timediff: " + timeDiff); 
      
     if(timeDiff <0) { 
      return -1; 
     } 
      
     if(timeDiff > Integer.MAX_VALUE) { 
      logger.warn("time difference is too large."); 
      return -1; 
     } 
      
     return timeDiff; 
    } 
    
    /**
     * find the upcoming task 
     * @return the task with earliest starting time and has not started 
     */ 
    private static Task findLatestTask() { 
     JIDLogic.setCommand("find"); 
     Task[] tasks = JIDLogic.executeCommand("find *.*"); 
     if(tasks != null) { 
      for(int i=0; i<tasks.length; i++) { 
       if(!isPassed(tasks[i])) { 
        logger.debug("latestTask: " + tasks[i].toString()); 
        return tasks[i]; 
       } 
      } 
     } 
      
     logger.warn("latestTask: null") ; 
      
     task = null; 
     return null;   
    } 
     
    /**
     * check whether the task has already started or not 
     * @param task that we want to check 
     * @return true if the task has not started 
     */ 
    private static boolean isPassed(Task task) { 
     return findTimeLeft(task) < 0; 
    } 
    
    /**
     * making an update to reminder 
     */ 
    public static void update() { 
     runReminder(); 
    } 
   }