Includes assumptions considered while creating application.

**Assumptions**
  1. Considered Movies List from "Popular Movies API" available in https://developer.themoviedb.org/reference/intro/getting-started
  2. Listed only 8 images per Page, for better user experience.
  3. Considered ony thre fields to display - id as key, Movie Name and Poster
  4. Search fucntionality is implemented using search API from https://developer.themoviedb.org/reference/intro/getting-started
      The reason to consider is, The API was readily available so utilized it to implement the same.
  5. Once the data is fetched, send the complete data using POST method to backend service to store the data in MongoDB.
      This also shows communication between front end and backend. Considered complete data of Movie received from API, to store in DB

