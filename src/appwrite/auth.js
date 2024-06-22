import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// better code practice
// we do not axactly copy past according to documentation but we made it industrial standard with best practices so that we can use services(or our own backend) other than appwrite in future if we want

export class AuthService {
  // these reducers i.e login, logout etc  are promises, most of the methods in appwrite are promises.
  client = new Client();
  account; //variable
    // if want to use other services rathar than appwrite in future ==> change the constructor
  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAcount({email,password,name}){
    try {
    // if want to use other services rathar than appwrite if future ==> change below
        const userAccount = await this.account.create(ID.unique(),email,password,name)
        if (userAccount) {
            //call another method
            this.login({email,password})
        } else {
            return userAccount
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
        // Logged in
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error",error);
    }
    
    return null // we can also use if-else to chech if account.get()
  }

  async logout() {
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service :: logout :: error",error);
    }
  }

}

const authService = new AuthService(); // authService is object while  AuthService is class


/* if we export AuthService (class) then every time we have to create an object and use it
therefore we have created an object and export it */
export default authService;




