import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";

const checkAuth = (req: Request,res: Response,next: NextFunction) => {
 try {
  const secret: any = process.env.SECRET || null;
  
  if(!secret)
    res.status(500).json({"message": "Server error"});
  
  const token: any = req.headers["authorization"]?.split(" ")[1] || null;

  if(!token)
    res.status(401).json({"message": "Unauthenticated!"});

  req.body.auth = jwt.verify(token, secret);
  next();
  } catch (e) {
      return res.status(401).json({"message": "Unauthenticated!"});
  }
}

export default checkAuth;