import mongoengine
import json
mongoengine.connect(
        db='test',
        username='yunjunma',
        password='yunjunma',
        host='mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority'
    )

class newuserbusinessdata(mongoengine.Document):
    _id = mongoengine.ObjectIdField(required=True)
    business_id = mongoengine.ListField(mongoengine.StringField())
    meta = {'strict': False}

    def to_json(self):
        j = {
            "_id": str(self._id),
            "business_id": str(self.business_id)
        }
        j_one = json.dumps(j, default=json_util.default)
        return j_one
