from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from psycopg2.extensions import register_adapter, AsIs
from models import FoodUser, FoodEntry, FoodItems, IngrEntry, AttrEntry, NutEntry
import io
import os
import json
import numpy as np
import cv2
from datetime import datetime
import keras.models
from keras.models import model_from_json
import tensorflow as tf
from tensorflow.python.keras.backend import set_session
from tensorflow.python.keras.models import load_model
from gensim.models import Word2Vec

def addapt_numpy_float64(numpy_float32):
  return AsIs(numpy_float32)
register_adapter(np.float32, addapt_numpy_float64)


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://chetana:chetana@localhost/eatiza_app'
db = SQLAlchemy(app)
print('db connected!!')
USERID = "" #global variable
FOOD_ITEM_ID = ""
# #
sess = tf.Session()
graph = tf.get_default_graph()

# Load model
set_session(sess)
json_file = open('ml/model.json','r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)

#load weights into new model
model.load_weights("ml/model.h5")
print("loaded CNN model successfully.")


ingr_attr_model = Word2Vec.load('ml/ingr_attr_model.model')
print("ingr model loaded.")

attr_model = Word2Vec.load('ml/attr.model')
print("attr model loaded.")

nut_model = Word2Vec.load('ml/nut_model.model')
print("nutrient model loaded.")


@app.route('/signup', methods=['POST']) # http://127.0.0.1/time
def signup():
    global USERID
    global FOOD_ITEM_ID
    USERID = ""
    FOOD_ITEM_ID = ""
    userid = request.json.get('userid', None)
    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    age = request.json.get('age', None)
    gender = request.json.get('gender', None)
    height = request.json.get('height', None)
    weight = request.json.get('weight', None)
    activity = request.json.get('activity', None)

    user_obj = FoodUser.query.filter_by(user_id=userid, email=email).first()
    if user_obj:
        return jsonify({'status': 0})
    else:
        user = FoodUser(user_id=userid,name=name,password=password,email=email,age=age,weight=weight,gender=gender,height=height, activity=activity)
        db.session.add(user)
        db.session.commit()
        print('inserted!!')
        USERID = userid
        print('USERID: ', USERID)
        return jsonify({'status': 1})



@app.route('/login', methods=['POST'])
def login():
    global USERID
    global FOOD_ITEM_ID
    USERID = ""
    FOOD_ITEM_ID = ""
    userid = request.json.get('userid', None)
    password = request.json.get('password', None)

    user_obj = FoodUser.query.filter_by(user_id = userid, password = password).first()
    if user_obj:
        USERID = userid
        print('USERID: ', USERID)
        return jsonify({'status': 1})
    else:
        return jsonify({'status': 0})


@app.route('/uploadphoto', methods=['POST', 'GET'])
def uploadphoto():
    global USERID
    global FOOD_ITEM_ID

    temp = np.fromstring(request.files['image'].read(), np.uint8)
    img = cv2.imdecode(temp, cv2.IMREAD_UNCHANGED)

    now = datetime.now()
    filename = now.strftime("%m_%d_%Y_%H_%M_%S") +".jpg"
    # print(os.path.join('images/', filename))

    cv2.imwrite(os.path.join('images/',filename), img)
    img = cv2.resize(img, (200, 200))

    data=[]
    data.append(img)
    data=np.array(data)
    data = data.astype('float32')/255

    global sess
    global graph
    with graph.as_default():
        set_session(sess)
        out = model.predict_classes(data)
    print(out)

    food_labels = ['Pizza','Ice-cream','Fried rice','Chicken wings','Samosa']



    userid = USERID
    food_item_id = food_labels[out[0]]
    image = os.path.join('images/', filename)
    dt = datetime.now()
    food_entry_id = food_item_id + str(dt)

    FOOD_ITEM_ID = food_entry_id
    food_entry = FoodEntry(food_entry_id = food_entry_id, user_id = userid, food_item_id = food_item_id, image = image, date_time = dt)
    db.session.add(food_entry)
    db.session.commit()
    print("food entry inserted!!")



    return jsonify({'status': 'OK'})


@app.route('/showattributes', methods = ['GET'])
def showattributes():
    global USERID
    global FOOD_ITEM_ID

    print(FOOD_ITEM_ID)

    #search for actual label for nlp model
    food_entry_obj = FoodEntry.query.filter_by(food_entry_id = FOOD_ITEM_ID).first()
    print(food_entry_obj.food_item_id)
    food_item_obj = FoodItems.query.filter_by(food_item_id = food_entry_obj.food_item_id).first()
    # food_entry_obj = FoodEntry.query.filter_by(food_item_id = food_entry_obj.food_item_id).filter_by(user_id = USERID).all()
    food_ingredients = {}
    food_attributes = {}
    food_nutrients = {}


    if food_item_obj:
        actual_label = food_item_obj.actual_label
        filename=open('ml/list.txt','r')
        ingr=filename.read().split()

        filename=open('ml/attr.txt','r')
        attr=filename.read().split()

        filename=open('ml/nutrients.txt','r')
        nut=filename.read().split()

        for l in ingr:
            # print(l,ingr_attr_model.wv.similarity(actual_label, l))
            food_ingredients.update({l : ingr_attr_model.wv.similarity(actual_label,l)})

            sorted_ingredients= sorted(food_ingredients.items() ,  key=lambda x: x[1], reverse =True)[:8]

        ingr_highest = sorted_ingredients[0][1]
        ingr_data = []
        now = datetime.now()
        for e in sorted_ingredients :
            ingr_entry_id = now.strftime("%m_%d_%Y_%H_%M_%S") + '_' + e[0]
            ingr_entry = IngrEntry(ingr_entry_id = ingr_entry_id,food_entry_id = FOOD_ITEM_ID, ingr_id = e[0], ingr_value = e[1]/ingr_highest)
            db.session.add(ingr_entry)
            db.session.commit()
            ingr_data.append(e[0])

        print("Ingredients stored!!")


        for l in attr:
            # print(l,ingr_attr_model.wv.similarity(actual_label, l))
            food_attributes.update({l : attr_model.wv.similarity(actual_label,l)})

            sorted_attributes= sorted(food_attributes.items() ,  key=lambda x: x[1], reverse =True)[:7]

        attr_highest = sorted_attributes[0][1]
        attr_data = []
        now = datetime.now()
        for e in sorted_attributes :
            attr_entry_id = now.strftime("%m_%d_%Y_%H_%M_%S") + '_' + e[0]
            attr_entry = AttrEntry(attr_entry_id = attr_entry_id,food_entry_id = FOOD_ITEM_ID, attr_id = e[0], attr_value = e[1]/attr_highest)
            db.session.add(attr_entry)
            db.session.commit()
            attr_data.append(e[0])

        print("Attributes stored!!")


        for l in nut:
            # print(l,ingr_attr_model.wv.similarity(actual_label, l))
            food_nutrients.update({l : nut_model.wv.similarity(actual_label,l)})

            sorted_nutrients = sorted(food_nutrients.items() ,  key=lambda x: x[1], reverse =True)[:4]

        nut_highest = sorted_nutrients[0][1]
        nut_data = []
        nut_value = []
        now = datetime.now()
        for e in sorted_nutrients :
            nut_entry_id = now.strftime("%m_%d_%Y_%H_%M_%S") + '_' + e[0]
            nut_entry = NutEntry(nut_entry_id = nut_entry_id,food_entry_id = FOOD_ITEM_ID, nut_id = e[0], nut_value = e[1]/nut_highest)
            db.session.add(nut_entry)
            db.session.commit()
            t = (e[1]/nut_highest)*100
            nut_data.append(e[0])
            nut_value.append(int(t))


        print("Nutrients stored!!")

        calories = food_item_obj.calorie

    return jsonify({'userid': USERID, 'food_entry_id': FOOD_ITEM_ID, 'Ingredients': ingr_data, 'Attributes': attr_data, 'Nutrients': nut_data, 'calories': calories, 'Name': food_item_obj.food_item_id, 'nut_value': nut_value, })


@app.route('/caloriecounter', methods = ['POST', 'GET'])
def caloriecounter():
    global USERID
    print(USERID)

    current_user = FoodUser.query.filter_by(user_id = USERID).first()
    cur_weight = current_user.weight
    cur_gender = current_user.gender
    cur_activity = current_user.activity
    cur_age = current_user.age
    cur_height = current_user.height

    if cur_gender == 'Male':
        BMR = 88.32 + (13.397 * cur_weight) + (4.799 * cur_height) - (5.677 * cur_age)
    else:
        BMR = 447.593 + (9.247 * cur_weight) + (3.098 * cur_height) - (4.330 * cur_age)

    print(BMR)
    if cur_activity == 'Moderate':
        calorie_intake = int(BMR * 1.65)
    elif cur_activity == 'Active':
        calorie_intake = int(BMR * 2.0)
    else:
        calorie_intake = int(BMR * 1.3)
    print("calorie Intake :",calorie_intake)

    cur_food_id = []
    calorie = 0
    cur_food_id = FoodEntry.query.filter_by(user_id = current_user.user_id).all()
    for i in cur_food_id:
        food_item_obj = FoodItems.query.filter_by(food_item_id = i.food_item_id).first()
        d1 = i.date_time
        d2 = datetime.now()
        days_diff = (d2-d1).days
        if days_diff < 1:
            calorie =  int(calorie + food_item_obj.calorie)

    # today_food = []
    # yesterday_food = []
    # two_daysago_food = []
    # for i in cur_food_id:
    #     d1 = i.date_time
    #     d2 = datetime.now()
    #     days_diff = (d2-d1).days
    #     print(days_diff)
    #     if days_diff < 1:
    #         cur_nut_obj=NutEntry.query.filter_by(food_entry_id = i.food_entry_id).first()
    #         today_food.append((i.food_item_id,cur_nut_obj.nut_id))
    #     elif days_diff >=1 and days_diff < 2:
    #         cur_nut_obj=NutEntry.query.filter_by(food_entry_id = i.food_entry_id).first()
    #         yesterday_food.append((i.food_item_id,cur_nut_obj.nut_id))
    #     elif days_diff >=2 and days_diff < 3:
    #         cur_nut_obj=NutEntry.query.filter_by(food_entry_id = i.food_entry_id).first()
    #         two_daysago_food.append((i.food_item_id,cur_nut_obj.nut_id))

    # labels = [
    # 'Today', 'Yesterday', '2 Days', '3 Days',
    # '4 Days', '5 Days', '6 Days'
    # ]

    values = [0,0,0,0,0,0,0]


    for i in cur_food_id:
        food_item_obj = FoodItems.query.filter_by(food_item_id = i.food_item_id).first()
        d1 = i.date_time
        d2 = datetime.now()
        days_diff = (d2-d1).days
        # print(days_diff)
        if days_diff < 1:
            values[6] = values[6] + food_item_obj.calorie
        elif days_diff >= 1 and days_diff < 2:
            values[5] = values[5] + food_item_obj.calorie
        elif days_diff >=2 and days_diff < 3:
            values[4]  = values[4] + food_item_obj.calorie
        elif days_diff >=3 and days_diff <4:
            values[3] = values[3] + food_item_obj.calorie
        elif days_diff >=4 and days_diff < 5:
            values[2] = values[2] + food_item_obj.calorie
        elif days_diff >=5 and days_diff < 6:
            values[1] = values[1] + food_item_obj.calorie
        elif days_diff >=6 and days_diff < 7:
            values[0] = values[0] + food_item_obj.calorie

    # line_labels=labels
    line_values=values
    # print('line labels: ', line_labels)
    print('line_values: ', line_values)

    return jsonify({'line_values': line_values, 'calorie_intake': calorie_intake, 'food_intake': calorie, 'user_weight': cur_weight})

@app.route('/fooddiary', methods = ['GET', 'POST'])
def fooddiary():
    global USERID
    print(USERID)

    current_user = FoodUser.query.filter_by(user_id = USERID).first()
    cur_food_id = FoodEntry.query.filter_by(user_id = current_user.user_id).order_by(FoodEntry.date_time.desc())

    k=0
    names = []
    calories = []
    time = []
    for i in cur_food_id:
        if k>10:
            break
        names.append(i.food_item_id)
        food_item_obj = FoodItems.query.filter_by(food_item_id = i.food_item_id).first()
        calories.append(food_item_obj.calorie)
        d1 = i.date_time
        d2 = datetime.now()
        days_diff = (d2-d1).days
        # print(days_diff)
        if days_diff < 1:
            time.append('Posted Today')
        elif days_diff >= 1 and days_diff < 2:
            time.append('Posted Yesterday')
        elif days_diff >=2 and days_diff < 3:
            time.append('Posted 2 days ago')
        elif days_diff >=3 and days_diff <4:
            time.append('Posted 3 days ago')
        elif days_diff >=4 and days_diff < 5:
            time.append('Posted 4 days ago')
        elif days_diff >=5 and days_diff < 6:
            time.append('Posted 5 days ago')
        elif days_diff >=6 and days_diff < 7:
            time.append('Posted 6 days ago')

        k=k+1

    return jsonify({'names': names, 'calories': calories, 'time': time, 'records': k})




@app.route('/check', methods=['GET', 'POST']) # http://127.0.0.1/time
def check():
    # users=[]
    # username = request.json.get('user', None)
    # if username is None:
    #     abort(403)
    #     print(users)
    # else:
    #     users.append(username)
    #     print(users)
    #     return jsonify({
    #         'status': 'OK',
    #         'message': 'Successfully Logged In',
    #     })
    # print(users)
    user = "chetana"
    return jsonify({'user': user})

app.run(host="192.168.0.7", port = 5000)
