import { Database } from "bun:sqlite";
import { ActivityType, Client, GatewayIntentBits, TextChannel } from "discord.js";
import { discord_bot_settings } from "../../config.json";

export async function DiscordClient(db: Database) {
    try {
        const client: Client<boolean> = new Client({ 
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.GuildVoiceStates, 
                GatewayIntentBits.DirectMessageReactions, 
                GatewayIntentBits.DirectMessages, 
                GatewayIntentBits.GuildMessageReactions, 
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ] 
        });
    
        client.on("ready", async () => {
            console.log(`📨 ${client.user.username} connected to Discord!`);
    
            client.user.setActivity({name: "www.edu-minerva.hu", type: ActivityType.Competing });
    
            const messageIds = db.query("SELECT messageId FROM discordCache;").all() as {messageId: string}[];
    
            try {
                const discordForumChannel = await client.channels.fetch(discord_bot_settings.forum_channel_id) as TextChannel;
    
                for (const message of messageIds) {
                    discordForumChannel.messages.fetch(message.messageId).catch((e) => { 
                        db.run("DELETE FROM discordCache WHERE messageId = ?;", [message.messageId]);
                        return; 
                    });
                }
            } catch (e) {
                console.log("Discord fetch error:", e);
            }
        });
    
        client.on("messageCreate", (msg) => {
            db.run("INSERT INTO discordCache (messageId) VALUES (?);", [msg.id]);
        });
    
        client.on("messageDelete", async (msg) => {
            const deleteResult = db.run("DELETE FROM forumMessages WHERE message = ?;", [msg.content]);
            const discordLogChannel = await client.channels.fetch(discord_bot_settings.log_channel_id) as TextChannel;
            
            if(deleteResult.changes > 0) {
                discordLogChannel.send({content: `Az összes \`${msg.content}\` tartalmú üzenet törölve!`});
                db.run("DELETE FROM discordCache WHERE messageId = ?;", [msg.id]);
            } else {
                discordLogChannel.send({content: `Az \`${msg.content}\` üzenetet nem sikerült törölni! Valószínűleg nem található az adatbázisban.`});
            }
        }); 

        client.login(discord_bot_settings.token);

    } catch (error) {
        console.log("Discord module error: ", error);
    }
};