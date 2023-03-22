# pinsanity
Pinny Arcade Pin Collecting (school project: CS465P PSU Winter 2023)

Standard setup, nothing special except that frontend should be accessed with port **1138**:

http://localhost:1138


Seeding is currently broken. =( There is an error with posgres and docker and dns that I have not been able to figure out. If between `docker-compose.yaml`, a Dockerfile, a `.env`, etc, there are some settings incorrect, that is from trying a bunch of different combinations of `127.0.0.1`, `localhost`, `postgres`, etc, not because the current settings are the ones I whole-heartedly believe to be correct. Seriously nothing is working.
