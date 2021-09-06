const { timeAgo } = require("../../time");

Component({
    properties: {
        avatarImage: String,
        userName: String,
        jobTitle: String,
        company: String,
        timeAgo: String,
        content: String,
        diggCount: String,
        reply: Array,
        isReply: Boolean
    },

    methods: {
        onLoad() {
            
        },
    },
});