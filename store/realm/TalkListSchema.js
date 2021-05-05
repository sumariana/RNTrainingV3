const TalkListSchema = {
    name: "Talklist",
    properties: {
        talkId: "int",
        toUserId: "int",
        messageId: "int",
        userId: "int",
        nickname: "string",
        imageId: "int",
        imageSize: "int?",
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