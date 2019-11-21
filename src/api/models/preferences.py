import mongoengine
import json
mongoengine.connect(
        db='test',
        username='yunjunma',
        password='yunjunma',
        host='mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority'
    )
class preferences(mongoengine.Document):
    _id = mongoengine.ObjectIdField(required=True)
    likes_mexican = mongoengine.BooleanField()
    likes_chinese = mongoengine.BooleanField()
    likes_american = mongoengine.BooleanField()
    likes_vietnamese = mongoengine.BooleanField()
    likes_creperies = mongoengine.BooleanField()
    likes_french = mongoengine.BooleanField()
    likes_thai = mongoengine.BooleanField()
    likes_japanese = mongoengine.BooleanField()
    likes_italian = mongoengine.BooleanField()
    __v = mongoengine.IntField()
    meta = {'strict': False}

    def to_json(self):
        j = {
            "_id": str(self._id),
            "likes_mexican": self.likes_mexican,
            "likes_chinese": self.likes_chinese,
            "likes_american": self.likes_american,
            "likes_vietnamese": self.likes_vietnamese,
            "likes_creperies": self.likes_creperies,
            "likes_french": self.likes_french,
            "likes_thai": self.likes_thai,
            "likes_japanese": self.likes_japanese,
            "likes_italian": self.likes_italian,
            "__v": self.__v
        }
        j_one = json.dumps(j, default=json_util.default)
        return j_one
