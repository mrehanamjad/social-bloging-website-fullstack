import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

class CommentServices {
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createComment({ postId, userId, commentText, parentCommentId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                {
                    postId,
                    userId,
                    commentText,
                    parentCommentId
                }
            )
        } catch (error) {
            console.log('Appwrite :: createComment :: Error:', error)
        }
    }

    async updateComment(
        commentId,
        { postId, userId, commentText, parentCommentId },
    ) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId,
                {
                    postId,
                    userId,
                    commentText,
                    parentCommentId
                }
            )

        } catch (error) {
            console.log('Appwrite :: updateComment :: Error:', error)
        }
    }

    
    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId
            )
            return true;
        } catch (error) {
            console.log('Appwrite :: deleteComment :: Error:', error)
        }
    }

    async getComment(commentId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId
            )
        } catch (error) {
            console.log("Appwrite :: getComment :: Error:", error)
        }
    }

    async getComments(postId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                [Query.equal('postId', postId)]
            )
        } catch (error) {
            console.log('Apwrite :: getComments :: error:', error)
        }
    }

}


const commentServices = new CommentServices();

export default commentServices;