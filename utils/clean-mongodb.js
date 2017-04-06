db = db.getSiblingDB('fip1')

db.refresh.drop();

db.access.drop();

db.getCollection('auth').drop();