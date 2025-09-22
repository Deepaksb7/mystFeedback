import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

interface Credentials {
    identifier: string;
    password: string;
  }

  interface AuthUser {
    id: string;
    email: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessage: boolean;
  }
  
  
export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"Credentials",
            name:"Credentials",
            credentials:{
                identifier:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials?:Credentials):Promise<AuthUser | null>{
                if (!credentials) {
                    throw new Error("No credentials provided")
                  }
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or : [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })
                    console.log("authorize() called with:", credentials);

                    if (!user){
                        throw new Error("No user found with this email")
                    }

                    if (!user.isVerified){
                        throw new Error("Please verify your account befor login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect){
                        return user as AuthUser
                    }else{
                        throw new Error("Incorrect password")
                    }

                } catch (err) {
                    throw new Error(err as string)
                }
            }
            
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if (user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        },
    },
    pages:{
        signIn:'/signin'
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
