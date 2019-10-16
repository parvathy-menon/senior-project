import mongoengine
import json
mongoengine.connect(
        db='test',
        username='yunjunma',
        password='yunjunma',
        host='mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority'
    )
class users(mongoengine.Document):
    _id = mongoengine.ObjectIdField(required=True)
    name = mongoengine.StringField()
    password = mongoengine.StringField()
    register_date = mongoengine.DateTimeField()
    __v = mongoengine.IntField()
    meta = {'strict': False}

    def to_json(self):
        j = {
            "_id": str(self._id),
            "name": self.name,
            "password": self.password,
            "register_date": self.register_date,
            "__v": self.__v
        }
        j_one = json.dumps(j, default=json_util.default)
        return j_one
