import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account; //variable
  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount({email,password,name}){
    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name)
        if (userAccount) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
     throw error   
    }
  }

  async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error",error);
    }
    
    return null 
  }

  async logout() {
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service :: logout :: error",error);
    }
  }

  async updateName(name) {
    try {
        return await this.account.updateName(name);
    } catch (error) {
        console.log("Appwrite service :: updateName :: error",error);
        throw error;
    }
  }

  async updateEmail(email,password) {
    try {
        return await this.account.updateEmail(email,password);
    } catch (error) {
        console.log("Appwrite service :: updateEmail :: error",error);
        throw error;
    }
  }

  async updatePassword(newPassword,oldPassword) {
    try {
        return await this.account.updatePassword(newPassword,oldPassword);
    } catch (error) {
        console.log("Appwrite service :: updatePassword :: error",error);
        throw error;
    }
  }

}

const authService = new AuthService(); 

export default authService;




