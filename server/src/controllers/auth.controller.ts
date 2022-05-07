import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Invite from "../models/invite.model";

const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      // See if entered invite is found 
      const invite: any = await Invite.findOne({
        code: req.body.invite
      }).exec()
      // If not, just error out
      if(!invite)
        return res.status(500).json({"message": "Invalid invite.."})
  
      // If valid invite, make account
      bcrypt.hash(req.body.password, 16, async (err, hash)=>{
        if(err)
          res.status(500).json({"message": "Could not create new user :("})
  
        req.body.password = hash;
        
      const result: any = await User.create(req.body);

      // Check if user was created and delete invite
      if(result){
        res.status(200).json({result});
        await Invite.findOneAndDelete({
          code: req.body.invite
        }).exec();
      }

      })
    } catch(error) {
      res.status(500).json({"message": "Could not create new user :("});
    }
  },
  authenticate: async (req: Request, res: Response) => {
    try{
      const secret: any = process.env.SECRET!;
      const user: any = await User.findOne({
        username: req.body.username
      }).exec();

      bcrypt.compare(req.body.password,user.password, (err, result) => {
        if(result){
          const body = {sub: user.id, username: user.username};
          const opts = {"expiresIn": "1h"};
          const token = jwt.sign(body, secret, opts);
  
          res.status(200).json({"token": token});
        }else{
          res.status(401).json({"message": "Wrong Credentials!"})
        }
      })
    }catch(error) {
      res.status(500).json({"message": "Could not create new user :("});
    }
  }
}

export default AuthController;