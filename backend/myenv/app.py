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
    k = []
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, paino FROM kala, laji WHERE kala.laji_id=laji.id ORDER BY paino DESC')
    paino_data = cursor.fetchall()    
    for laji, paino in paino_data:
        k.append((f"{laji}", f"{paino} kg"))
    return {"data": k}


@app.route('/pituus')
def pituus():
    k = []
    
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, pituus FROM kala, laji WHERE kala.laji_id=laji.id ORDER BY pituus DESC')
    pituus = cursor.fetchall()

    for laji, pituus in pituus:
        k.append((f"{laji}", f"{pituus} cm"))

    return {"data": k}

@app.route('/maara')
def maara():
    k = []
    
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT laji, COUNT(laji) as maara FROM laji GROUP BY laji ORDER BY maara DESC')
    maara = cursor.fetchall()
    
    for laji, maara in maara:
        k.append((f"{laji}", f"{maara} kpl"))

    return {"data": k}

@app.route('/viehella')
def viehella():    
    lajit = ["ahven", "harjus", "hauki", "jokirapu", "kiiski", "kirjolohi", "kolmipiikki", "kuha", "kuore", "lahna", "lohi", "made", "muikku", "pasuri", "rautu", "ruutana", "salakka", "särki", "säyne", "siika", "silakka", "sorva", "suutari", "taimen", "täplärapu"]
    k = []
    
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
        cursor.execute(f"SELECT  laji, viehe, COUNT(laji) AS maara FROM viehe, tarppi, kala, laji WHERE viehe.id=tarppi.viehe_id AND tarppi.id=kala.tarppi_id AND kala.laji_id=laji.id AND laji='{x}' GROUP BY viehe;")
        viehella = cursor.fetchall()
        if len(viehella) > 0: 
            for laji, viehe, maara in viehella:
                k.append((f"{laji}", f"{viehe}", f"{maara} kpl"))
            viehella_data.append(viehella)
    print(viehella_data)

    return {"data": k}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)