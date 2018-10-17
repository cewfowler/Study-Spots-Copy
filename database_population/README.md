If the database should somehow lose the building entries, run the command:

mongoimport -h ds037488.mlab.com:37488 -d study_spots -c spots -u <user> -p <password> --file uf_basicinfo.json --jsonArray

This command will repopulate the db with the json file 'uf_basicinfo.json'
