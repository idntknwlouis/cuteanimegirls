import { ApplicationCommandOptionType } from "../../api/Commands";
import definePlugin from "../../utils/types";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchReddit(sub: string) {
    const res = await fetch(`https://www.reddit.com/r/${sub}/top.json?limit=100&t=all`);
    const resp = await res.json();
    try {
        const { children } = resp.data;
        let r = rand(0, children.length-1);
        return children[r].data.url;
    } catch (err) {
        console.error(resp);
        console.error(err);
    }
    return "";
}

export default definePlugin({
    name: "Cute-Anime-Girls",
    authors: [{
        name: "Shady Goat (Original Ver.)",
        id: 376079696489742338n,
    },{ 
        name: "louis (This Modified Ver.)",
        id: 795182271380193280n
    }],
    description: "Add a command to send cute anime girls in the chat",
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "anime-girls",
        description: "Send cute anime girls",
        options: [
            {
                name: "cat",
                description: "If set, this will send exclusively cute anime cat girls",
                type: ApplicationCommandOptionType.BOOLEAN,
                required: false,
            },
        ],

        async execute(args) {
            let sub = "awwnime";
            if (args.length > 0) {
                const v = args[0].value as any as boolean;
                if (v) {
                    sub = "CuteAnimeGirls";
                }
            }

            return {
                content: await fetchReddit(sub),
            };
        },
    }]
});
