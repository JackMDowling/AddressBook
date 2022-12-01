# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /backend


RUN pip3 install python-dotenv
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
ENV FLASK_APP=server.py
ENV USPS_ID=472NA0000197



CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]