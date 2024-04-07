import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite"

export class AuthService{
    Client = new Client();
    account;

    constructor(){
        this.Client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectid);
        this.account = new Account(this.Client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ",error);
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }

}

const authservice = new AuthService();

export  default authservice