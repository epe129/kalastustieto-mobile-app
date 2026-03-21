from flask import Flask, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS
import createdb

createdb.db()

app = Flask(__name__)
CORS(app, origins=["http://192.168.1.241:8081"])

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'
 
mysql = MySQL(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/paino')
def paino():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, paino FROM kala, laji WHERE kala.laji_id=laji.id ORDER BY paino DESC')
    paino_data = cursor.fetchall()
    print(paino_data)
    return {"data": paino_data}


@app.route('/pituus')
def pituus():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, pituus FROM kala, laji WHERE kala.laji_id=laji.id ORDER BY pituus DESC')
    pituus = cursor.fetchall()
    print(pituus)
    return {"data": pituus}

@app.route('/maara')
def maara():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, COUNT(laji) as maara FROM laji GROUP BY laji ORDER BY maara DESC')
    maara = cursor.fetchall()
    print(maara)
    return {"data": maara}

@app.route('/viehella')
def viehella():    
    lajit = ["ahven", "harjus", "hauki", "jokirapu", "kiiski", "kirjolohi", "kolmipiikki", "kuha", "kuore", "lahna", "lohi", "made", "muikku", "pasuri", "rautu", "ruutana", "salakka", "särki", "säyne", "siika", "silakka", "sorva", "suutari", "taimen", "täplärapu"]
    
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT laji, COUNT(laji) as maara FROM laji GROUP BY laji ORDER BY maara DESC")
    l = cursor.fetchall()
    if len(l) > 0: 
        # lisää lajin arrayhyn jos lajia ei ole array:ssa
        for rivi in l:
            laji = rivi[0] 
            if laji in lajit:
                pass
            else:
                lajit.append(laji)

    cursor = mysql.connection.cursor()
    viehella_data = []
    for x in lajit:
        cursor.execute(f"SELECT viehe, COUNT(laji) AS maara, laji FROM viehe, tarppi, kala, laji WHERE viehe.id=tarppi.viehe_id AND tarppi.id=kala.tarppi_id AND kala.laji_id=laji.id AND laji='{x}' GROUP BY viehe;")
        viehella = cursor.fetchall()
        if len(viehella) > 0: 
            viehella_data.append(viehella)
            
    return {"data": viehella_data}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)