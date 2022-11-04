const {Client, GatewayIntentBits, Partials, EmbedBuilder, DMChannel} = require('discord.js');
const botId = "1002326857909284974";
const botChannelId = "1002328215416737802";
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.MessageContent,],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const defaultChannelId = "1035231267060461649";
const questChannelId = "1002307353170944031";
const logoEmoji = "<a:GIGACHAD:1035296239069175878>";
const questCompleteEmoji = "<:quest_complete:1035303976700223580>";
const gigaChadEmoji = "<a:GIGACHAD:1035296239069175878>";

const introDesc = `
Before you join us, it would be nice if you could introduce yourself a bit.
    
__Who are you and what brings you to us?__
*I am a* ${logoEmoji} ***Member***
*I am a* :globe_with_meridians: ***Stranger***`;


const prequestDesc = `
You have chosen to be a member, but someone from the leadership will still have to verify that you are indeed a member of the guild before everything is made available to you. And most impo...*(${gigaChadEmoji} has appeared right behind your back)* .

As a virgin, you're about to shit yourself from all the perfection he's exuding. "Tell me who the fuck you are?", he asked.`;

function questDescFilled(name) {
    return `${prequestDesc}
Scared shitless you'll say your name in your virgin voice.
\`\`\`
Name: ${name || '___________'}\`\`\``
}

function classDescFilled(name) {
    return `He beat you up anyway. You scream and cry and call your mom until she comes. Chad notices her and turns toward her. Tell me what class you're or I'll bang your mom.

   \`\`\`Class: ${name || '___________'}\`\`\`
`;
}

function raceDescFilled(name) {
    return `"What's your race?", he asked while banging your mom.

   \`\`\`Race: ${name || '___________'}\`\`\`
Right after you answer his question you are covered in cum. He laughs at you and goes away with your mum in his arms.
`;
}


function interestDescFilled() {
    return `You lie in the pool of your tears and feel yourself slowly becoming a man. You wipe the last tear from your eye and suddenly you can see clearly the path to your new self.
    
    💀 \*\*PvE\*\*
    ⚔ \*\*PvP\*\*
`;
}

function ending() {
    return `Before you set off on your journey, prepare a few things:
    
    Our Own Guild Addon: https://www.curseforge.com/wow/addons/bohemian
    Read Rules: https://discordapp.com/channels/1035231266330652722/1035231267555393579
    
    Wait until you are verified.
`;
}

const introEmbed = new EmbedBuilder()
    .setColor(0x5500c9)
    .setURL('https://discord.js.org/')
    .setAuthor({name: 'Welcome stranger!', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(introDesc)
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/logo.png');

const questEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Terms of Entry', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(questDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/inv_inscription_parchmentvar03.jpg');

const classEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Class selection', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(classDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/inv_inscription_parchmentvar03.jpg');

const raceEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Race selection', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(raceDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/inv_inscription_parchmentvar03.jpg');
const interestEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Choice of interests', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(interestDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/logo.png');

const endingEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Journey begins', iconURL: 'https://xn--la-mia8p.eu/onlychads/Quest_Avail_16x16.webp'})
    .setDescription(ending())
    .setThumbnail('https://xn--la-mia8p.eu/onlychads/logo.png');

let introMessage;

async function checkIntroMessage() {
    const defaultChannel = await client.channels.fetch(defaultChannelId);
    const messages = await defaultChannel.messages.fetch();

    if (messages.size === 0) {
        introMessage = await defaultChannel.send({embeds: [introEmbed]});
    } else {
        introMessage = messages.find(m => m.author.id === botId);
        introMessage.edit({embeds: [introEmbed]});
    }
    // await introMessage.reactions.removeAll();
    introMessage.react(logoEmoji);
    introMessage.react("🌐");
    try {
        for (const reaction of introMessage.reactions.cache.values()) {
            // await reaction.users.remove(userId);
            if (reaction.emoji.name === "logo" || reaction.emoji.name === "🌐") {
                continue;
            }
            await reaction.remove();
        }
    } catch (error) {
        console.error('Failed to remove reactions.', error);
    }
}

// let questMessage;
// async function checkQuestMessage() {
//     const questChannel = await client.channels.fetch(questChannelId);
//     let messages = await questChannel.messages.fetch();
//
//     if (messages.size === 0) {
//         console.log("Creating intro message");
//         questMessage = await questChannel.send({ embeds: [questEmbed] });
//     } else {
//         console.log("Intro message exists");
//
//         console.log(messages);
//         questMessage = messages.find(m => m.author.id === botId);
//         questMessage.edit({ embeds: [questEmbed] });
//         try {
//             messages.forEach(m => m !== questMessage && m.delete());
//         } catch (e) {}
//
//     }
//     // await questMessage.reactions.removeAll();
//     questMessage.react(questCompleteEmoji);
// }

async function checkDefaultMessages() {
    checkIntroMessage();
    // checkQuestMessage();
}

const girlsRatingChannel = "1035231269023399991";
const girlsNSFWRatingChannel = "1012457335756705792";

async function checkMissDiscord() {
    const today = new Date();
    if (today.getDay() === 3) {
        await processMissDiscord(girlsRatingChannel, "1035231269023399992");
    }

}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await checkDefaultMessages();
    await checkMissDiscord();
    setInterval(async () => {
        await checkMissDiscord();
    }, 60000);
});

const emojiPoints = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '🔟': 10,
};

async function processMissDiscord(channelId, missChannelId) {
    const channel = await client.channels.fetch(channelId);
    const missChannel = await client.channels.fetch(missChannelId);
    const lastMiss = (await missChannel.messages.fetch({ limit: 1 })).first();
    if (lastMiss) {
        const lastMissDate = new Date(lastMiss.createdTimestamp);
        const diff = new Date() - lastMissDate;
        const interval = 1000 * 60 * 60 * 24 * 7;
        if (diff < interval) {
            return;
        }
    }

    let before = undefined;
    const collection = [];
    const newerThan = new Date();
    newerThan.setDate(newerThan.getDate() - 7);

    while (true) {
        const messages = await channel.messages.fetch({ limit: 100, before });
        for (const [id, message] of messages) {
            const createdAt = new Date(message.createdTimestamp);
            if (createdAt < newerThan && lastMiss) continue;
            const emojis = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let points = 0;
            const reactions = {};
            let total = 0;
            for (const emoji of emojis) {
                const res = await message.reactions.resolve(`${emoji}\u20e3`);
                reactions[emoji] = res ? res.me ? res.count - 1 : res.count : undefined;
                points += emojiPoints[emoji] * reactions[emoji];
                total += reactions[emoji];
            }
            const res = await message.reactions.resolve(`🔟`);
            reactions[`🔟`] = res ? res.me ? res.count - 1 : res.count : undefined;
            total += reactions[`🔟`];
            points += emojiPoints[`🔟`] * reactions[`🔟`];
            points = points / total;
            collection.push({
                message,
                createdAt,
                reactions,
                points: points || 0
            });
        }
        before = messages.last().id;
        if (messages.size !== 100) {
            break;
        }
    }

    collection.sort((a, b) => b.points - a.points);
    const winner = collection[0];
    if (winner) {
        const attachment = winner.message.attachments.first();
        if (attachment) {
            const embed = new EmbedBuilder()
                .setColor(0xffdf19)
                .setDescription("I welcome you to this solemn moment when we will discover the beauty of the world and new warriors for world peace. But enough talk. There is no time to delay. Let's get to the announcement... " +
                    "\n\nThe winner of **Miss Discord** for this week's prettiest girl with **" + winner.points + "** points is...")
                .addFields(
                    { name: 'Author', value: `<@${winner.message.author.id}>`, inline: true  },
                    { name: 'Reward', value: '50 🪙', inline: true },
                )
                .setTimestamp()
                .setImage(attachment.attachment)
                .setTitle('Miss Discord')
                .setURL(winner.message.url)
                .setThumbnail('https://media.discordapp.net/attachments/1002510337171521637/1017337492862664724/miss.png?width=468&height=468');
            await missChannel.send({embeds: [embed]});
        }

    }

}

const usersForRename = new Map();
const classEmojis = new Map([
    ['deathknight', "<:deathknight:1035297188827365537>"],
    ['druid', "<:druid:1035297190186340453>"],
    ['hunter', "<:hunter:1035297380205072474>"],
    ['mage', "<:mage:1035297191696277544>"],
    ['paladin', "<:paladin:1035297192979746836>"],
    ['priest', "<:priest:1035297186986082305>"],
    ['rogue', "<:rogue:1035297185404833833>"],
    ['shaman', "<:shaman:1035305268055117944>"],
    ['warlock', "<:warlock:1035297184062652436>"],
    ['warrior', "<:warrior:1035297182858879006>"],
]);
const raceEmojis = new Map([
    ['human', "<:human:1035297894351249428>"],
    ['dwarf', "<:dwarf:1035297893030056026>"],
    ['gnome', "<:gnome:1035297895567601775>"],
    ['nightelf', "<:nightelf:1035297898344218785>"],
    ['draenei', "<:draenei:1035297896888803328>"],
]);
const classEmojiRoles = new Map([['deathknight', "Death Knight"], ['druid', "Druid"], ['hunter', "Hunter"], ['mage', "Mage"], ['paladin', "Paladin"], ['priest', "Priest"], ['rogue', "Rogue"], ['shaman', "Shaman"], ['warlock', "Warlock"], ['warrior', "Warrior"],]);
const raceEmojiRoles = new Map([
    ['human', 'Human'],
    ['dwarf', 'Dwarf'],
    ['gnome', 'Gnome'],
    ['nightelf', 'Night elf'],
    ['draenei', 'Draenei'],
]);

function getRoleFromEmoji(emoji) {
    const roleName = classEmojiRoles.get(emoji);
    return getGuild().roles.cache.find(role => role.name === roleName);
}

function getRoleFromRaceEmoji(emoji) {
    const roleName = raceEmojiRoles.get(emoji);
    return getGuild().roles.cache.find(role => role.name === roleName);
}

async function findEmbedByAuthorName(channelId, name) {
    const channel = await client.channels.fetch(channelId);
    let messages = await channel.messages.fetch();
    const questMessage = messages.filter(m => m.embeds.length).find(m => m.embeds[0].author.name === name);
    const embed = questMessage ? questMessage.embeds[0] : undefined;
    return [questMessage, embed];
}

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.id === botId) return;
    if (reaction.emoji.name === "✏" && reaction.message.channel instanceof DMChannel) {
        usersForRename.set(user.id, user);
    }
    if (reaction.emoji.name === "⚔" && reaction.message.channel instanceof DMChannel) {
        const member = getMember(user.id);
        await member.roles.add(getGuild().roles.cache.find(role => role.name === "PvP"));
    }
    if (reaction.emoji.name === "💀" && reaction.message.channel instanceof DMChannel) {
        const member = getMember(user.id);
        await member.roles.add(getGuild().roles.cache.find(role => role.name === "PvE"));
    }

    if (reaction.message.id === introMessage.id) {
        if (reaction.emoji.name === "🌐") {
            const member = getMember(user.id);
            await member.roles.add(getGuild().roles.cache.find(role => role.name === "Stranger"));
        }
        if (reaction.emoji.name === 'GIGACHAD') {
            const userDm = await user.createDM();
            const [questMessage, embed] = await findEmbedByAuthorName(userDm.id, "Terms of Entry");
            if (questMessage) {
                await questMessage.react("✏");
                return;
            }

            const questMessage2 = await user.send({embeds: [questEmbed]});
            await questMessage2.react("✏");
            usersForRename.set(user.id, user);
        }
    } else if (reaction.emoji.name === 'quest_complete' && reaction.message.channel instanceof DMChannel) {
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Terms of Entry");
        const member = getMember(user.id);
        const nickName = member.displayName;
        const newEmbed = EmbedBuilder.from(embed).setDescription(questDescFilled(nickName));
        await questMessage.edit({embeds: [newEmbed]});
        usersForRename.delete(user.id);
        await member.roles.add(getGuild().roles.cache.find(role => role.name === "Unverified Member"));
        const [classMessage2] = await findEmbedByAuthorName(reaction.message.channel.id, "Class selection");
        if (classMessage2) return;
        const classMessage = await user.send({embeds: [classEmbed]});
        for (const [key, emoji] of classEmojis.entries()) {
            await classMessage.react(emoji);
        }
    } else if (reaction.message.channel instanceof DMChannel && classEmojis.has(reaction.emoji.name)) {
        const member = getMember(user.id);
        const role = getRoleFromEmoji(reaction.emoji.name);
        for (const [key, role2] of classEmojiRoles.entries()) {
            await member.roles.remove(getRoleFromEmoji(key));
        }
        await member.roles.add(role);
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Class selection");
        const newEmbed = EmbedBuilder.from(embed).setDescription(classDescFilled(role.name));
        await questMessage.edit({embeds: [newEmbed]});
        const [questMessage2, embed2] = await findEmbedByAuthorName(reaction.message.channel.id, "Race selection");
        if (!questMessage2) {
            const message = await user.send({embeds: [raceEmbed]});
            for (const [key, emoji] of raceEmojis.entries()) {
                await message.react(emoji);
            }
        }
    } else if (reaction.message.channel instanceof DMChannel && raceEmojis.has(reaction.emoji.name)) {
        const member = getMember(user.id);
        const role = getRoleFromRaceEmoji(reaction.emoji.name);
        for (const [key, role2] of raceEmojiRoles.entries()) {
            await member.roles.remove(getRoleFromRaceEmoji(key));
        }
        await member.roles.add(role);
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Race selection");
        const newEmbed = EmbedBuilder.from(embed).setDescription(raceDescFilled(role.name));
        await questMessage.edit({embeds: [newEmbed]});

        const [questMessage2, embed2] = await findEmbedByAuthorName(reaction.message.channel.id, "Choice of interests");
        if (!questMessage2) {
            const message = await user.send({embeds: [interestEmbed]});
            await message.react("💀");
            await message.react("⚔");
        }
    } else if (reaction.message.channel instanceof DMChannel && (reaction.emoji.name === "💀" || reaction.emoji.name === "⚔")) {
        const [endMessage, embed2] = await findEmbedByAuthorName(reaction.message.channel.id, "Journey begins");
        if (!endMessage) {
            await user.send({embeds: [endingEmbed]});
        }

    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.id === botId) return;
    if (reaction.message.channel instanceof DMChannel && classEmojis.has(reaction.emoji.name)) {
        const member = getMember(user.id);
        const role = getRoleFromEmoji(reaction.emoji.name);
        await member.roles.remove(role);
    }
    if (reaction.message.channel instanceof DMChannel && raceEmojis.has(reaction.emoji.name)) {
        const member = getMember(user.id);
        const role = getRoleFromRaceEmoji(reaction.emoji.name);
        await member.roles.remove(role);
    }
    if (reaction.message.id === introMessage.id) {
        if (reaction.emoji.name === "🌐") {
            const member = getMember(user.id);
            await member.roles.remove(getGuild().roles.cache.find(role => role.name === "Stranger"));
        }
    }
    if (reaction.emoji.name === "⚔" && reaction.message.channel instanceof DMChannel) {
        const member = getMember(user.id);
        await member.roles.remove(getGuild().roles.cache.find(role => role.name === "PvP"));
    }
    if (reaction.emoji.name === "💀" && reaction.message.channel instanceof DMChannel) {
        const member = getMember(user.id);
        await member.roles.remove(getGuild().roles.cache.find(role => role.name === "PvE"));
    }
});

function getGuild() {
    return client.guilds.cache.get('1035231266330652722');
}

function getMember(id) {
    return getGuild().members.cache.get(id);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

client.on('messageCreate', async message => {


    if (message.channel instanceof DMChannel) {
        const user = usersForRename.get(message.author.id);
        if (user) {
            const member = getMember(user.id);
            const nickName = capitalizeFirstLetter(message.content);
            try {
                await member.setNickname(nickName);
            } catch (e) {
            }
            await message.react(questCompleteEmoji);
        }

    }
    if (message.channelId === "1035231269023399991") {
        if (message.attachments.size > 0) {
            const emojis = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (const emoji of emojis) {
                await message.react(`${emoji}\u20e3`);
            }
            await message.react(`🔟`);
        } else {
            await message.delete();
        }
    }
});


client.on('messageDelete', async message => {
    if (message.author && message.author.id === botId) {
        if (message.channelId === defaultChannelId) {
            await checkIntroMessage();
        } else if (message.channelId === questChannelId) {
            // await checkQuestMessage();
        }
    }
});
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    console.log(oldMember, newMember);
    const isMember = newMember.roles.cache.find(r => r.name === "Member");
    const isUnverifiedMember = newMember.roles.cache.find(r => r.name === "Unverified Member");
    if (isMember && isUnverifiedMember) {
        await newMember.roles.remove(isUnverifiedMember);
    }
    console.log();
});

client.login('MTAwMjMyNjg1NzkwOTI4NDk3NA.GADRUC.LNBnRMsifr0q3KsxROQmcYSaFzuW2hNEOouG8c');