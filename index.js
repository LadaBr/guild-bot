const {Client, GatewayIntentBits, Partials, EmbedBuilder, DMChannel} = require('discord.js');
const botId = "1002326857909284974";
const botChannelId = "1002328215416737802";
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.MessageContent,],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const defaultChannelId = "1001506782100856964";
const questChannelId = "1002307353170944031";
const logoEmoji = "<:logo:1002265711927889960>";
const questCompleteEmoji = "<:quest_complete:1002313233992007831>";

const introDesc = `
Než se k nám budeš moci připojit, bylo by od tebe pěkné, kdyby ses nám trochu představil/a.
    
__Kdo jsi a co tě k nám přivádí?__
*Jsem* ${logoEmoji} ***Člen***
*Jsem* :globe_with_meridians: ***Návštěvník***`;


const prequestDesc = `
Vybral jsi, že jsi člen, ale někdo z vedení bude stále muset ověřit, že jsi doopravdy členem guildy než se ti vše zpřístupní. A hlav...*(Mrak prázdnoty se zjevil přímo za tvými zády)* .

Lekneš se, otočíš se a vidíš, jak mrak postupně mizí. Uvnitř něj si všimneš zjevujícího se pergamenu, na kterém je něco napsáno. Vezmeš pergamen do ruky a čteš:`;

function questDescFilled(name) {
    return `${prequestDesc}
\`\`\`Jsem připraven/a vstoupit do světa šílenství.
Jméno: ${name || '___________'}\`\`\`
Napíšeš jméno, které máš ve hře a...`
}

function classDescFilled(name) {
    return `Inkoust na pergamenu se najednou dal do pohybu. Přelíval se ze strany na stranu, dokud nezačal opět formovat text.

   \`\`\`Class: ${name || '___________'}\`\`\`
`;
}

function raceDescFilled(name) {
    return `Inkoust zopakoval své obvyklé pohyby a proměnil se v další text.

   \`\`\`Rasa: ${name || '___________'}\`\`\`
Těsně po vyplnění se ti pergamen rozpadne v rukou a zmizí. Konečně ses ho zbavil.
`;
}


function interestDescFilled() {
    return `Otočíš se zpět na chlápka, který tě přivítal a ten povídá: \*"Mám pro tebe poslední úkol. Vyber si, kterým směrem se chceš vydat. Nebo si myslíš, že jsi tak dobrý, že zvládneš obě cesty naráz? HAHAHA"\*, zasmál se pohrdavě a sám utekl jako největší sráč.
    
    💀 \*\*PvE\*\*
    ⚔ \*\*PvP\*\*
`;
}

const introEmbed = new EmbedBuilder()
    .setColor(0x5500c9)
    .setURL('https://discord.js.org/')
    .setAuthor({name: 'Vítej cizinče!', iconURL: 'https://xn--la-mia8p.eu/dom/Quest_Avail_16x16.webp'})
    .setDescription(introDesc)
    .setThumbnail('https://xn--la-mia8p.eu/dom/logo.png');

const questEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Podmínky vstupu', iconURL: 'https://xn--la-mia8p.eu/dom/Quest_Avail_16x16.webp'})
    .setDescription(questDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/dom/inv_inscription_parchmentvar03.jpg');

const classEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Výběr class', iconURL: 'https://xn--la-mia8p.eu/dom/Quest_Avail_16x16.webp'})
    .setDescription(classDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/dom/inv_inscription_parchmentvar03.jpg');

const raceEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Výběr rasy', iconURL: 'https://xn--la-mia8p.eu/dom/Quest_Avail_16x16.webp'})
    .setDescription(raceDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/dom/inv_inscription_parchmentvar03.jpg');
const interestEmbed = new EmbedBuilder()
    .setColor(0xffdf19)
    .setAuthor({name: 'Výběr zájmů', iconURL: 'https://xn--la-mia8p.eu/dom/Quest_Avail_16x16.webp'})
    .setDescription(interestDescFilled())
    .setThumbnail('https://xn--la-mia8p.eu/dom/logo.png');

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

const girlsRatingChannel = "1012288950410432513";
const girlsNSFWRatingChannel = "1012457335756705792";

async function checkMissDiscord() {
    const today = new Date();
    if (today.getDay() === 3) {
        await processMissDiscord(girlsRatingChannel, "1017335739601661993");
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
    '1': -5,
    '2': -4,
    '3': -3,
    '4': -2,
    '5': -1,
    '6': 1,
    '7': 2,
    '8': 3,
    '9': 4,
    '🔟': 5,
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
            for (const emoji of emojis) {
                const res = await message.reactions.resolve(`${emoji}\u20e3`);
                reactions[emoji] = res ? res.me ? res.count - 1 : res.count : undefined;
                points += emojiPoints[emoji] * reactions[emoji];
            }
            const res = await message.reactions.resolve(`🔟`);
            reactions[`🔟`] = res ? res.me ? res.count - 1 : res.count : undefined;
            points += emojiPoints[`🔟`] * reactions[`🔟`];

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
                .setDescription("Vítám vás v tento slavnostní moment, kdy objevíme krásy světa a nové bojovnice za světový mír. Ale dost bylo řečí. Není čas otálet. Pojďme k vyhlášení... " +
                    "\n\nVítězem **Miss Discord** za nejhezčí dívku tohoto týdne se s **" + winner.points + "** body stává...")
                .addFields(
                    { name: 'Autor', value: `<@${winner.message.author.id}>`, inline: true  },
                    { name: 'Odměna', value: '50 🪙', inline: true },
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
    ['deathknight', "<:deathknight:1002265957491810314>"],
    ['druid', "<:druid:1002265938588078161>"],
    ['hunter', "<:hunter:1002265974248050839>"],
    ['mage', "<:mage:1002265982447923341>"],
    ['paladin', "<:paladin:1002266013527707699>"],
    ['priest', "<:priest:1002266000097558688>"],
    ['rogue', "<:rogue:1002265990551326790>"],
    ['shaman', "<:shaman:1002265929914257478>"],
    ['warlock', "<:warlock:1002266007567614072>"],
    ['warrior', "<:warrior:1002265965096079491>"],
]);
const raceEmojis = new Map([
    ['human', "<:human:1002287182125465640>"],
    ['dwarf', "<:dwarf:1002287183337623584>"],
    ['gnome', "<:gnome:1002287192091152415>"],
    ['nightelf', "<:nightelf:1002287179189461053>"],
    ['draenei', "<:draenei:1002287180519047360>"],
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
            await member.roles.add(getGuild().roles.cache.find(role => role.name === "Cizinec"));
        }
        if (reaction.emoji.name === 'logo') {
            const userDm = await user.createDM();
            const [questMessage, embed] = await findEmbedByAuthorName(userDm.id, "Podmínky vstupu");
            if (questMessage) {
                await questMessage.react("✏");
                return;
            }

            const questMessage2 = await user.send({embeds: [questEmbed]});
            await questMessage2.react("✏");
            usersForRename.set(user.id, user);
        }
    } else if (reaction.emoji.name === 'quest_complete' && reaction.message.channel instanceof DMChannel) {
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Podmínky vstupu");
        const member = getMember(user.id);
        const nickName = member.displayName;
        const newEmbed = EmbedBuilder.from(embed).setDescription(questDescFilled(nickName));
        await questMessage.edit({embeds: [newEmbed]});
        usersForRename.delete(user.id);
        await member.roles.add(getGuild().roles.cache.find(role => role.name === "Neověřený člen"));
        const [classMessage2] = await findEmbedByAuthorName(reaction.message.channel.id, "Výběr class");
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
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Výběr class");
        const newEmbed = EmbedBuilder.from(embed).setDescription(classDescFilled(role.name));
        await questMessage.edit({embeds: [newEmbed]});
        const [questMessage2, embed2] = await findEmbedByAuthorName(reaction.message.channel.id, "Výběr rasy");
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
        const [questMessage, embed] = await findEmbedByAuthorName(reaction.message.channel.id, "Výběr rasy");
        const newEmbed = EmbedBuilder.from(embed).setDescription(raceDescFilled(role.name));
        await questMessage.edit({embeds: [newEmbed]});

        const [questMessage2, embed2] = await findEmbedByAuthorName(reaction.message.channel.id, "Výběr zájmů");
        if (!questMessage2) {
            const message = await user.send({embeds: [interestEmbed]});
            await message.react("💀");
            await message.react("⚔");

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
            await member.roles.remove(getGuild().roles.cache.find(role => role.name === "Cizinec"));
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
    return client.guilds.cache.get('1001502960095871047');
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
    if (message.channelId === "1012288950410432513" || message.channelId === "1012457335756705792") {
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
    const isMember = newMember.roles.cache.find(r => r.name === "Člen");
    const isUnverifiedMember = newMember.roles.cache.find(r => r.name === "Neověřený člen");
    if (isMember && isUnverifiedMember) {
        await newMember.roles.remove(isUnverifiedMember);
    }
    console.log();
});

client.login('MTAwMjMyNjg1NzkwOTI4NDk3NA.GADRUC.LNBnRMsifr0q3KsxROQmcYSaFzuW2hNEOouG8c');