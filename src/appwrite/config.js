// in this we do both in same file but remember:
// the best practice industry standard is to keep storage service in seperate file so that it become reuseable 

// many similaries asauth.js

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Services {
    client = new Client()
    databases; // variable
    bucket; // in dorcs they say it stoage. its a veriable so you can give name as you wish

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) { // in featuredImae we pass image_file_id
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //we used slug for document_id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }

    async updatePost(
        slug, // post id 
        { title, content, featuredImage, status }
    ) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)

            return true
        } catch (error) {
            console.log("Appwrite :: deletePost :: error", error);

            return false
        }
    }

    //one post
    async getPost(slug) {
        try {
           return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug) // slug as document_id
        } catch (error) {
            console.log("Appwrite :: getPost :: error", error);
            return false
        }
    }

    // all posts
    async getPosts(queres = [Query.equal("status", "active")]) {
        // here in above parameter: queries are jus variable the main thing is [Query.equal("status","active")]
        // in [Query.equal("status","active")], status is keythat me created in appwrite website -> databases -> blog -> Articles -> indexes
        // we can also add more in quesries -> read docs
        // using enums is more better.

        try { 
            return await this.databases.listDocuments( //returns array
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queres, // we can also define quries here instude of defining in above parameter -> read docs

                // here we can also add paginations --> read docs
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error", error);
            return false
        }
    }


    // upload file sevice  (homeWork: do this in separate file)

    async uploadFile(file) { // pass complete file as parameter not file name
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            ) // here return will be fileId which we pass in getFilePreview, deleteFile etc methods

        } catch (error) {
            console.log("Appwrite :: uploadFile:: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) { // returns image url
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: getFilePreview :: error", error);
            return false
        }
    }

}

const services = new Services()

export default services;