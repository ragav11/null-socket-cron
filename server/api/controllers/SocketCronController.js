/**
 * SocketCronController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var schedule = require('node-schedule');

module.exports = {
    connectSocket:(req,res) => {
        sails.sockets.join(req,'socket-cron')
        return res.json({message:'connected'})
    },

    startcron:(req,res)=>{
        console.log(req.body.date);
        
        schedule.scheduleJob(req.body.date, (val)=>{
            console.log(val);
            sails.sockets.broadcast('socket-cron','socket-cron',{message:'cron-gob executed'})
        });
    }
};

