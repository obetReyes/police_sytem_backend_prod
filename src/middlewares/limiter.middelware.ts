/* import {RateLimiterRedis } from "rate-limiter-flexible";
import {Request, Response, NextFunction} from "express";
import { memoryLimiter } from "../utils";

interface customReq  extends Request{
  user?:string
}



//we need the limiter which is the object provided by rate limiter package also we need the endpoint path and the memory limit wich is used if the limiter was not provided or the limiter is down.
export const limiter = (rateLimiter:RateLimiterRedis) => {


  return (req:customReq, res:Response, next:NextFunction) => {
      const key = req.user ? req.user : req.url + req.ip;
      const pointsToConsume = 1;
      //cosume the limiter provided with redis as storeclient if for some reason a limiter was not provided use the memory limiter 

    

      rateLimiter ? 
      rateLimiter.consume(key, pointsToConsume)
      .then(() => {
          next();
      })
      .catch(() => {
          res.set({
            "Retry-After":  Math.round(rateLimiter.msDuration / 1000) || 1,
            "X-RateLimit-Limit":rateLimiter.points,
            "X-RateLimit-Remaining":rateLimiter.points,
          });
        
          return res.status(429).json({errors:[
            {field:"autorizacion", error:`el numero de llamadas al endpoint por minuto han sido sobrepasadas el limite es ${rateLimiter.points}`, href:""
          }]});
      }) :
      memoryLimiter.consume(key, pointsToConsume)
      .then(() => {
        next();
    })
    .catch(() => {
      res.set({
        "Retry-After":  Math.round(memoryLimiter.msDuration / 1000) || 1,
        "X-RateLimit-Limit":memoryLimiter.points,
        "X-RateLimit-Remaining":memoryLimiter.points,
      });
      return res.status(429).json({errors:[
        {field:"autorizacion", error:`el numero de llamadas al endpoint por minuto han sido sobrepasadas el limite es ${memoryLimiter.points}`, href:""
      }]});
    });
  };
};


*/