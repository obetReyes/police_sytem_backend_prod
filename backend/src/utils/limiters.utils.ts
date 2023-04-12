import rateLimit from "express-rate-limit";


  // if the redit server is down we apply an memory limiter
  export const tokenLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 4, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req, res) => {
      res.status(429).json({
        errors:[
          {
            field:"autorizacion", 
            details:"se ha intentado muchas veces obtener un token de acesso el cual esta limitado a 4 por minuto",
            href:""
          }
        ]
      });
    }
  });

  

  export const createLimiter =  rateLimit({
    windowMs: 60000, // 1 minute
    max: 7, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler:(req, res) => {
      res.status(429).json({
        errors:[
          {
            field:"autorizacion", 
            details:"se ha intentado muchas veces crear un recurso, solo se pueden crear 5 recursos por minuto",
            href:""
          }
        ]
      });
    }
  });

  export const getLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 40, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler:(req, res) => {
      res.status(429).json({
        errors:[
          {
            field:"autorizacion", 
            details:"se ha intentado muchas veces obtener un recurso, solo se llamar a los recusos 35 veces por minuto",
            href:""
          }
        ]
      });
    }
  });
  


  export const updateLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 25, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler:(req, res) => {
      res.status(429).json({
        errors:[
          {
            field:"autorizacion", 
            details:"se ha intentado muchas veces actualizar un recurso, solo se puede actualizar a los recusos 25 veces por minuto",
            href:""
          }
        ]
      });
    }
  });
  

  export const deleteLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 10, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler:(req, res) => {
      res.status(429).json({
        errors:[
          {
            field:"autorizacion", 
            details:"se ha intentado muchas veces eliminar recursos,hay un limite de 15 recursos eliminados por minuto",
            href:""
          }
        ]
      });
    }
  });
  