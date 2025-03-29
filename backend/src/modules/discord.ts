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
    
            const messageIds = db.query("SELECT messageIdDiscord FROM forumMessages;").all() as {messageIdDiscord: string}[];
    
            try {
                const discordForumChannel = await client.channels.fetch(discord_bot_settings.forum_channel_id) as TextChannel;
    
                for (const message of messageIds) {
                    // ez azért szükséges mert a discord bot indítása előtti üzenetek nincsenek alapból betöltve
                    discordForumChannel.messages.fetch(message.messageIdDiscord).catch((e) => { return; });
                }
            } catch (e) {
                console.log("Discord fetch error:", e);
            }
        });
    
        client.on("messageDelete", async (msg) => {
            const deleteResult = db.run("DELETE FROM forumMessages WHERE messageIdDiscord = ?;", [msg.id]);
            const discordLogChannel = await client.channels.fetch(discord_bot_settings.log_channel_id) as TextChannel;
            
            if(deleteResult.changes > 0) {
                discordLogChannel.send({content: `A(z) \`${msg.content}\` tartalmú üzenet törölve!`});
            } else {
                discordLogChannel.send({content: `A(z) \`${msg.content}\` tartalmú üzenetet nem sikerült törölni! Valószínűleg nem található az adatbázisban.`});
            }
        }); 

        client.login(discord_bot_settings.token);

    } catch (error) {
        console.log("Discord module error: ", error);
    }
};