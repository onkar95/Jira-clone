import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator'
import { deleteCookie, setCookie } from 'hono/cookie'


import { loginSchema, registerSchema } from '../schemas';
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
import { sessionMeddileware } from '@/lib/session-meddileware';


const auth = new Hono()
    .get(
        "/current",
        sessionMeddileware,
         (c) => {
            const user = c.get("user")

            return c.json({ data: user })
        })
    .post(
        "/login",
        zValidator("json", loginSchema),
        async (c) => {
            const { email, password } = c.req.valid("json")
            const { account } = await createAdminClient()

            const session = await account.createEmailPasswordSession(
                email,
                password,
            )
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 60 * 60 * 24 * 30
            })

            return c.json({ success: true })
        })
    .post(
        "/register",
        zValidator("json", registerSchema),
        async (c) => {
            const { name, email, password } = c.req.valid("json")
            const { account } = await createAdminClient()

            await account.create(
                ID.unique(),
                email,
                password,
                name,
            );

            const session = await account.createEmailPasswordSession(
                email,
                password,
            )

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 60 * 60 * 24 * 30
            })

            return c.json({ success: true })
        })
    .post(
        "/logout",
        sessionMeddileware,
        (c) => {
            const account = c.get("account")

            deleteCookie(c, AUTH_COOKIE)

            return c.json({ success: true })
        })



export default auth;

