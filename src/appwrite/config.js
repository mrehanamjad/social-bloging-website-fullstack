import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Services {
    client = new Client()
    databases; // variable
    bucket; // in docs they say it stoage. its a veriable so you can give name as you wish

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, category, featuredImage, status, updatedOn, userId, author }) { // in featuredImae we pass image_file_id
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // document_id
                {
                    title,
                    content,
                    category,
                    featuredImage,
                    status,
                    updatedOn,
                    userId,
                    author,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
            throw error
        }
    }

    async updatePost(
        slug, // post id 
        { title, content, category, featuredImage, status, updatedOn }
    ) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    category,
                    featuredImage,
                    status,
                    updatedOn
                }

            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error
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
    async getPosts(quries) {

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active"),
                    Query.orderDesc('$createdAt'),
                    ...quries
                ],

            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error", error);
            return false
        }
    }



    async getMyPosts(userId, quries) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.orderDesc('$createdAt'),
                    ...quries
                ],
            )
        } catch (error) {
            console.log("Appwrite :: getMyPosts :: error", error);
            return false
        }
    }

    async getPostsByCategory(category, quries) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("category", category),
                    Query.orderDesc('$createdAt'),
                    ...quries
                ],
            )
        } catch (error) {
            console.log("Appwrite :: getPostsByCategory :: error", error);
            return false
        }
    }

    async getSearchedPosts(searchText,quries) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.search("title",searchText),
                    Query.orderDesc('$createdAt'),
                    ...quries
                ],
            )
        } catch (error) {
            console.log("Appwrite :: getSearchedPosts :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

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

    getFilePreview(fileId) {
        try {
            return this.bucket.getFileView(
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