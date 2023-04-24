FROM python:3

WORKDIR /app

RUN pip install flask

RUN pip install flask-cors

RUN pip install pymongo

COPY . .

EXPOSE 5555

CMD [ "python3", "app.py" ]