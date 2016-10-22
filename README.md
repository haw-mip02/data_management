# data_management
Dies ist das Projekt zum Persistieren und Auslesen von Tweets in bzw aus einer Datenbank. Zum Einfügen und Auslesen wird eine REST-API bereitgestellt, die im Folgenden dokumentiert ist.

## Alle Tweets anzeigen

* **URL**

  /tweets

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   None
   
## Einzelnen Tweet nach ID suchen

* **URL**

  /tweets/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   id=[string]

* **Data Params**

   None
   
## Tweets speichern

* **URL**

  /tweets

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   Content-Type= application/json
   
* **Body**

   Einen oder mehrere Tweets im JSON-Format, z.B.: 
   ```json
    {
      "created_at": "Sat Oct 15 10:48:01 +0000 2016",
      "id": 123456,
      "weitere": "felder",
      "lang": "de",
      "timestamp_ms": "1476528481645"
}
   ```
   oder
      ```json
    [{
      "created_at": "Sat Oct 15 10:48:01 +0000 2016",
      "id": 123456,
      "weitere": "felder",
      "lang": "de",
      "timestamp_ms": "1476528481645"
},
{
      "created_at": "Sat Oct 22 10:39:12 +0000 2016",
      "id": 456789,
      "weitere": "felder",
      "lang": "de",
      "timestamp_ms": "1476528481645"
}]
   
