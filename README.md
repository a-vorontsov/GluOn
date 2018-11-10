# HackSussex 2018
### Specs:
- Search
- interactive map (optional)
- Search where to find stickers and how to get them
- Two different user types: student/hacker, staff/org


### Users:
- Student:
  - Search for stickers
  - Get location (optional) 
  - Instuctions on how to get them
- Staff:
  - Upload sticker image
  - Add sticker description
  - Add instructions
  - Add location (optional)
  - Org name

### TODO:
- set up DB
- set up API
- design UI
- get domain
- set up server
- set up 

### Sticker table columns:
- id
- name
- desc
- location
- image
- tags
- organiser (FK: user.id)

### Users table:
- id
- name
- email
- password
- type
- image

### Searches:
- stickers
- sticker tags
- what orgs have what stickers


### Delegations:
- Front-end: Eden + Jeanne
- Back-end: Sasha, Victor, Aramdokht
