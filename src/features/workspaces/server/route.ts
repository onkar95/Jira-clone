import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator'


import { ID } from 'node-appwrite';
import { sessionMeddileware } from '@/lib/session-meddileware';
import { createWorkspaceSchema } from '../schema';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';


const app = new Hono()
    .get("/", sessionMeddileware, async (c) => {
        const database = c.get("databases");

        const workspaces = await database.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
        );

        return c.json({ data: workspaces })
    })
    .post(
        '/',
        zValidator("form", createWorkspaceSchema),
        sessionMeddileware,
        async (c) => {
            const databases = c.get("databases")
            const storage = c.get("storage")
            const user = c.get("user")
            const { name, image } = c.req.valid("form")

            let uploadedImageUrl: String | undefined
            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image,
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`
            }

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl
                }
            );
            return c.json({ data: workspace })
        }
    )



export default app;

