
import conf from '../conf/conf.js'
import { Client, ID,Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectid);

        this.databases= new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite serive :: createPost ::error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite  service :: updatePost ::error ",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite serive :: deletePost :: error",error);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive ::  getPost :: error",error );
            return false;
        }
    }

    async getPosts(queries =[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                queries
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error",error);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error",error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileId
            )
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error",error);
        }
    }

    //it is so faster , so we don't need any async or await fnc

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketid,
            fileId
        )
    }
}

const service = new Service()
export default service;


