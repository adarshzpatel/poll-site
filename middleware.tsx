
import { NextResponse, NextRequest } from "next/server";
import {nanoid} from 'nanoid';

export function middleware(req: NextRequest) {
  const response = new NextResponse();

  if(req.cookies.get("poll-token")) return;
  
  const random = nanoid();

  // set a cookie 
  response.cookies.set("poll-token",random,{sameSite:"strict"});
  
  return response
  
}