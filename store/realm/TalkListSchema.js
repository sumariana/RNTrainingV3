const TalkListSchema = {
    name: "Talklist",
    properties: {
        talkId: {type: 'int',default: 0},
        toUserId: "int",
        messageId: "int",
        userId: "int",
        nickname: "string",
        imageId: "int",
        imageSize: "string?",
        imageUrl: "string?",
        message: "string",
        mediaType: "int",
        userStatus: "int",
        time: "string",
        lastUpdateTime: "string"
    },
    primaryKey: "talkId"
}

export default TalkListSchema;